/**
 * Explanation service for the Quran.com API MCP Server
 *
 * This service provides the most efficient way to get comprehensive Quran explanations
 * by combining verses, translations, and tafsirs in optimized API calls.
 */

import { z } from 'zod';
import { ApiError } from '../types/error';
import { verboseLog } from '../utils/logger';
import { makeApiRequest } from './base-service';
import { API_BASE_URL } from '../config';
import { explanationSchema } from '../schemas/explanation';
import { Cache } from '../utils/cache';

// Response type
export interface ExplanationResponse {
  success: boolean;
  message: string;
  data: {
    verses: any[];
    metadata: {
      verse_reference: string;
      chapter_name?: string;
      total_verses?: number;
      translations_included: string[];
      tafsirs_included: string[];
      context_included: boolean;
      api_calls_made: number;
    };
    explanation_summary?: string;
  };
}

/**
 * Service for comprehensive Quran explanation
 *
 * This service optimizes API calls by:
 * 1. Using a single API request to fetch verses + translations + tafsirs
 * 2. Implementing smart caching for frequently accessed explanations
 * 3. Efficiently handling context verses
 * 4. Providing structured, easy-to-understand responses
 */
export class ExplanationService {
  // Cache for explanation responses (max 100 entries, 1 hour TTL)
  private cache: Cache<ExplanationResponse>;

  constructor() {
    this.cache = new Cache<ExplanationResponse>(100);
  }

  /**
   * Get comprehensive Quran explanation
   *
   * This is the most efficient way to understand Quranic verses because it:
   * - Fetches everything in a single optimized API call
   * - Includes the original Arabic text
   * - Provides multiple translations for better understanding
   * - Includes scholarly explanations (tafsirs)
   * - Optionally adds surrounding verses for context
   *
   * @param params - The parameters for the explanation request
   * @returns Comprehensive explanation response
   * @throws ApiError if the request fails
   */
  async getExplanation(params: z.infer<typeof explanationSchema>): Promise<ExplanationResponse> {
    try {
      // Validate parameters
      const validatedParams = explanationSchema.parse(params);

      // Ensure at least one reference type is provided
      if (
        !validatedParams.verse_key &&
        !validatedParams.chapter_number &&
        !validatedParams.page_number &&
        !validatedParams.juz_number &&
        !validatedParams.hizb_number &&
        !validatedParams.rub_el_hizb_number
      ) {
        throw new ApiError(
          'At least one verse reference must be provided (verse_key, chapter_number, page_number, juz_number, hizb_number, or rub_el_hizb_number)',
          400
        );
      }

      // Create cache key
      const cacheKey = JSON.stringify(validatedParams);

      // Check cache first
      const cachedResponse = this.cache.get(cacheKey);
      if (cachedResponse) {
        verboseLog('response', {
          method: 'getExplanation',
          source: 'cache',
          cacheKey,
        });

        return {
          ...cachedResponse,
          message: cachedResponse.message + ' (from cache)',
        };
      }

      // Determine the appropriate endpoint and build the request
      const { url, queryParams, referenceType, referenceValue } = this.buildRequest(validatedParams);

      // Track number of API calls
      let apiCallsMade = 1;

      // Make the optimized API request (single call for verses + translations + tafsirs)
      verboseLog('request', {
        method: 'getExplanation',
        url,
        params: queryParams,
        referenceType,
      });

      const response = await makeApiRequest(url, queryParams);

      // Extract verses from the response
      let verses = response.verses || [];

      // Handle context verses if requested
      if (validatedParams.include_context && validatedParams.verse_key) {
        const contextData = await this.addContextVerses(
          validatedParams.verse_key,
          validatedParams.context_verses || 2,
          validatedParams
        );
        verses = contextData.verses;
        apiCallsMade += contextData.apiCallsMade;
      }

      // Build metadata
      const metadata = {
        verse_reference: this.buildReferenceString(referenceType, referenceValue),
        chapter_name: response.meta?.chapter?.name_simple || undefined,
        total_verses: verses.length,
        translations_included: this.extractTranslationIds(validatedParams.translations),
        tafsirs_included: this.extractTafsirIds(validatedParams.tafsirs),
        context_included: validatedParams.include_context || false,
        api_calls_made: apiCallsMade,
      };

      // Generate explanation summary
      const explanation_summary = this.generateExplanationSummary(verses, metadata);

      // Build the response
      const result: ExplanationResponse = {
        success: true,
        message: 'Explanation retrieved successfully',
        data: {
          verses,
          metadata,
          explanation_summary,
        },
      };

      // Cache the response
      this.cache.set(cacheKey, result);

      verboseLog('response', {
        method: 'getExplanation',
        versesCount: verses.length,
        translationsCount: metadata.translations_included.length,
        tafsirsCount: metadata.tafsirs_included.length,
        apiCallsMade,
      });

      return result;
    } catch (error) {
      verboseLog('error', {
        method: 'getExplanation',
        error: error instanceof Error ? error.message : String(error),
      });

      if (error instanceof z.ZodError) {
        throw new ApiError(
          `Validation error: ${error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`,
          400
        );
      }

      throw error;
    }
  }

  /**
   * Build the API request URL and parameters based on the reference type
   * This is optimized to use a single API call
   */
  private buildRequest(params: z.infer<typeof explanationSchema>): {
    url: string;
    queryParams: any;
    referenceType: string;
    referenceValue: string;
  } {
    let url: string;
    let referenceType: string;
    let referenceValue: string;

    // Determine the endpoint based on the reference type
    if (params.verse_key) {
      url = `${API_BASE_URL}/verses/by_key/${params.verse_key}`;
      referenceType = 'verse_key';
      referenceValue = params.verse_key;
    } else if (params.chapter_number) {
      url = `${API_BASE_URL}/verses/by_chapter/${params.chapter_number}`;
      referenceType = 'chapter';
      referenceValue = params.chapter_number;
    } else if (params.page_number) {
      url = `${API_BASE_URL}/verses/by_page/${params.page_number}`;
      referenceType = 'page';
      referenceValue = params.page_number;
    } else if (params.juz_number) {
      url = `${API_BASE_URL}/verses/by_juz/${params.juz_number}`;
      referenceType = 'juz';
      referenceValue = params.juz_number;
    } else if (params.hizb_number) {
      url = `${API_BASE_URL}/verses/by_hizb/${params.hizb_number}`;
      referenceType = 'hizb';
      referenceValue = params.hizb_number;
    } else if (params.rub_el_hizb_number) {
      url = `${API_BASE_URL}/verses/by_rub/${params.rub_el_hizb_number}`;
      referenceType = 'rub_el_hizb';
      referenceValue = params.rub_el_hizb_number;
    } else {
      throw new ApiError('No valid verse reference provided', 400);
    }

    // Build query parameters - this is where the magic happens!
    // The Quran.com API allows us to include translations and tafsirs in a SINGLE request
    const queryParams: any = {};

    // Add translations (this is KEY for efficiency!)
    if (params.translations) {
      queryParams.translations = params.translations;
    }

    // Add tafsirs (also included in the same request!)
    if (params.tafsirs) {
      queryParams.tafsirs = params.tafsirs;
    }

    // Add other parameters
    if (params.language) queryParams.language = params.language;
    if (params.words) queryParams.words = params.words;
    if (params.word_fields) queryParams.word_fields = params.word_fields;
    if (params.translation_fields) queryParams.translation_fields = params.translation_fields;
    if (params.page) queryParams.page = params.page;
    if (params.per_page) queryParams.per_page = params.per_page;

    return { url, queryParams, referenceType, referenceValue };
  }

  /**
   * Add context verses (verses before and after) for better understanding
   * This uses an additional API call but is essential for context
   */
  private async addContextVerses(
    verseKey: string,
    contextCount: number,
    params: z.infer<typeof explanationSchema>
  ): Promise<{ verses: any[]; apiCallsMade: number }> {
    try {
      // Limit context verses to max 5
      const count = Math.min(contextCount, 5);

      // Parse the verse key (e.g., "2:255" -> chapter 2, verse 255)
      const [chapterStr, verseStr] = verseKey.split(':');
      const chapterNum = parseInt(chapterStr);
      const verseNum = parseInt(verseStr);

      if (isNaN(chapterNum) || isNaN(verseNum)) {
        throw new ApiError(`Invalid verse_key format: ${verseKey}. Expected format: 'chapter:verse'`, 400);
      }

      // Calculate the range (verse - context to verse + context)
      const startVerse = Math.max(1, verseNum - count);
      const endVerse = verseNum + count; // API will handle chapter boundary

      // Build the request for the chapter with verse range
      const url = `${API_BASE_URL}/verses/by_chapter/${chapterNum}`;
      const queryParams: any = {
        verse_start: startVerse.toString(),
        verse_end: endVerse.toString(),
      };

      // Include the same translations and tafsirs for consistency
      if (params.translations) queryParams.translations = params.translations;
      if (params.tafsirs) queryParams.tafsirs = params.tafsirs;
      if (params.language) queryParams.language = params.language;
      if (params.words) queryParams.words = params.words;
      if (params.word_fields) queryParams.word_fields = params.word_fields;
      if (params.translation_fields) queryParams.translation_fields = params.translation_fields;

      const response = await makeApiRequest(url, queryParams);

      return {
        verses: response.verses || [],
        apiCallsMade: 1,
      };
    } catch (error) {
      verboseLog('error', {
        method: 'addContextVerses',
        error: error instanceof Error ? error.message : String(error),
      });

      // If context fetch fails, just return empty - don't fail the whole request
      return { verses: [], apiCallsMade: 0 };
    }
  }

  /**
   * Build a human-readable reference string
   */
  private buildReferenceString(type: string, value: string): string {
    switch (type) {
      case 'verse_key':
        return `Verse ${value}`;
      case 'chapter':
        return `Chapter ${value}`;
      case 'page':
        return `Page ${value}`;
      case 'juz':
        return `Juz ${value}`;
      case 'hizb':
        return `Hizb ${value}`;
      case 'rub_el_hizb':
        return `Rub el Hizb ${value}`;
      default:
        return value;
    }
  }

  /**
   * Extract translation IDs from the comma-separated string
   */
  private extractTranslationIds(translations?: string): string[] {
    if (!translations) return [];
    return translations.split(',').map((id) => id.trim()).filter((id) => id);
  }

  /**
   * Extract tafsir IDs from the comma-separated string
   */
  private extractTafsirIds(tafsirs?: string): string[] {
    if (!tafsirs) return [];
    return tafsirs.split(',').map((id) => id.trim()).filter((id) => id);
  }

  /**
   * Generate a helpful explanation summary
   */
  private generateExplanationSummary(verses: any[], metadata: any): string {
    const parts: string[] = [];

    parts.push(`Retrieved ${metadata.total_verses} verse(s) from ${metadata.verse_reference}`);

    if (metadata.chapter_name) {
      parts.push(`from ${metadata.chapter_name}`);
    }

    if (metadata.translations_included.length > 0) {
      parts.push(
        `with ${metadata.translations_included.length} translation(s) (IDs: ${metadata.translations_included.join(', ')})`
      );
    }

    if (metadata.tafsirs_included.length > 0) {
      parts.push(
        `and ${metadata.tafsirs_included.length} tafsir(s) (IDs: ${metadata.tafsirs_included.join(', ')})`
      );
    }

    if (metadata.context_included) {
      parts.push('including context verses');
    }

    parts.push(`using ${metadata.api_calls_made} optimized API call(s)`);

    return parts.join(' ') + '.';
  }
}

// Export a singleton instance
export const explanationService = new ExplanationService();
