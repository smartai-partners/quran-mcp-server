/**
 * Explanation handler for the Quran.com API MCP Server
 *
 * This handler provides the most efficient way to get comprehensive Quran explanations.
 */

import { verboseLog } from '../utils/logger';
import { explanationService } from '../services/explanation-service';
import { explanationSchema } from '../schemas/explanation';

/**
 * Handler for the explanation tool
 *
 * This is the most efficient way to understand Quranic verses because it:
 * - Fetches verse(s), translations, and tafsirs in a single optimized API call
 * - Provides comprehensive explanation with context
 * - Returns structured, easy-to-understand data
 * - Uses smart caching to avoid redundant API calls
 *
 * @param args - The arguments for the explanation request
 * @returns MCP-formatted response with explanation data
 */
export async function handleExplanation(args: any) {
  try {
    // Validate arguments
    const validatedArgs = explanationSchema.parse(args);

    // Call the service
    const result = await explanationService.getExplanation(validatedArgs);

    // Log the response in verbose mode
    verboseLog('response', {
      tool: 'explanation',
      result,
    });

    // Format the response for better readability
    const formattedResponse = {
      summary: result.data.explanation_summary,
      metadata: result.data.metadata,
      verses: result.data.verses.map((verse: any, index: number) => {
        const formattedVerse: any = {
          verse_number: index + 1,
          verse_key: verse.verse_key,
          text_uthmani: verse.text_uthmani,
          text_imlaei: verse.text_imlaei,
          text_indopak: verse.text_indopak,
        };

        // Add translations if available
        if (verse.translations && verse.translations.length > 0) {
          formattedVerse.translations = verse.translations.map((trans: any) => ({
            id: trans.resource_id,
            name: trans.resource_name,
            text: trans.text,
            language: trans.language_name,
          }));
        }

        // Add tafsirs if available
        if (verse.tafsirs && verse.tafsirs.length > 0) {
          formattedVerse.tafsirs = verse.tafsirs.map((tafsir: any) => ({
            id: tafsir.resource_id,
            name: tafsir.resource_name,
            text: tafsir.text,
            language: tafsir.language_name,
          }));
        }

        // Add word-by-word if available
        if (verse.words && verse.words.length > 0) {
          formattedVerse.words = verse.words.map((word: any) => ({
            text: word.text_uthmani || word.text,
            transliteration: word.transliteration?.text,
            translation: word.translation?.text,
          }));
        }

        return formattedVerse;
      }),
    };

    // Return MCP-formatted response
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(formattedResponse, null, 2),
        },
      ],
    };
  } catch (error) {
    verboseLog('error', {
      tool: 'explanation',
      error: error instanceof Error ? error.message : String(error),
    });

    // Use the standardized error response utility
    const { createErrorResponse } = require('../utils/error-handler');
    return createErrorResponse(error, 'explanation');
  }
}
