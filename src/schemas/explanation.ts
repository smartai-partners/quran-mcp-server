/**
 * Explanation schema for the Quran.com API MCP Server
 *
 * This schema enables efficient, comprehensive Quran explanation by combining
 * verses, translations, and tafsirs in a single optimized request.
 */

import { z } from 'zod';

/**
 * Schema for getting comprehensive Quran explanation
 *
 * This tool provides the most efficient way to understand Quranic verses by:
 * - Fetching the original Arabic text
 * - Including multiple translations for better understanding
 * - Providing scholarly explanations (tafsirs)
 * - All in a single optimized API call
 */
export const explanationSchema = z.object({
  // Verse reference (required - one of these must be provided)
  verse_key: z.string().optional().describe(
    "Verse key in format 'chapter:verse' (e.g., '1:1' for Al-Fatihah verse 1, '2:255' for Ayat al-Kursi). " +
    "This is the most direct way to reference a specific verse."
  ),
  chapter_number: z.string().optional().describe(
    "Chapter/Surah number (1-114). Use this to get explanations for an entire chapter or specific verses within it."
  ),
  page_number: z.string().optional().describe(
    "Madani Mushaf page number (1-604). Get explanations for all verses on a specific page."
  ),
  juz_number: z.string().optional().describe(
    "Juz number (1-30). Get explanations for verses in a specific Juz."
  ),
  hizb_number: z.string().optional().describe(
    "Hizb number (1-60). Get explanations for verses in a specific Hizb."
  ),
  rub_el_hizb_number: z.string().optional().describe(
    "Rub el Hizb number (1-240). Get explanations for verses in a specific Rub el Hizb."
  ),

  // Translation IDs (highly recommended for understanding)
  translations: z.string().optional().describe(
    "Comma-separated translation IDs to include (e.g., '131,21,22'). " +
    "Popular translations: 131 (Dr. Mustafa Khattab, The Clear Quran), " +
    "20 (Sahih International), 85 (Abdul Haleem), 22 (Pickthall), 19 (Yusuf Ali). " +
    "Including multiple translations provides better understanding. " +
    "Get available translations using the 'translations' tool."
  ),

  // Tafsir IDs (for scholarly explanation)
  tafsirs: z.string().optional().describe(
    "Comma-separated tafsir IDs to include for scholarly explanation (e.g., '169,93'). " +
    "Popular tafsirs: 169 (Tafsir Ibn Kathir in English), 93 (Tafsir al-Jalalayn). " +
    "Use the 'tafsirs' tool to get the full list of available tafsirs."
  ),

  // Language preference
  language: z.string().optional().describe(
    "Language code for metadata (e.g., 'en', 'ar', 'ur', 'tr'). " +
    "This affects chapter names and other metadata. Default is 'en'."
  ),

  // Additional options for verse words
  words: z.string().optional().describe(
    "Include word-by-word information ('true' or 'false'). " +
    "When true, includes Arabic words with transliteration and word-by-word translation. " +
    "Useful for detailed study."
  ),

  word_fields: z.string().optional().describe(
    "Comma-separated word fields to include (e.g., 'text_uthmani,transliteration,translation'). " +
    "Only relevant if words=true. Available fields: text_uthmani, text_imlaei, transliteration, translation."
  ),

  translation_fields: z.string().optional().describe(
    "Comma-separated translation fields to include (e.g., 'resource_name,text'). " +
    "Useful for customizing which translation metadata to return."
  ),

  // Pagination (for chapter/page/juz queries)
  page: z.string().optional().describe(
    "Page number for pagination (default: 1). Use when fetching large sets of verses."
  ),

  per_page: z.string().optional().describe(
    "Number of verses per page (default: varies by endpoint, typically 10-50). " +
    "Use with 'page' parameter for pagination."
  ),

  // Context options
  include_context: z.boolean().optional().describe(
    "Include surrounding verses for context (default: false). " +
    "When true, includes verses before and after the requested verse(s) to provide better context."
  ),

  context_verses: z.number().optional().describe(
    "Number of verses to include before and after for context (default: 2, max: 5). " +
    "Only used if include_context is true."
  ),
});

// Export default
export default {
  explanation: explanationSchema,
};
