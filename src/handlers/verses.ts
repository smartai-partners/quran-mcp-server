/**
 * Verse-related handlers for the Quran.com API MCP Server
 */

import { versesService } from '../services';
import {
  versesByChapterNumberSchema,
  versesByPageNumberSchema,
  versesByJuzNumberSchema,
  versesByHizbNumberSchema,
  versesByRubElHizbNumberSchema,
  versesByVerseKeySchema,
  randomVerseSchema,
} from '../schemas/verses';
import { createHandler } from '../utils/handler-wrapper';

/**
 * Handler for the verses-by_chapter_number tool
 */
export const handleVersesByChapterNumber = createHandler(
  'verses-by_chapter_number',
  versesByChapterNumberSchema,
  (args) => versesService.versesByChapterNumber(args)
);

/**
 * Handler for the verses-by_page_number tool
 */
export const handleVersesByPageNumber = createHandler(
  'verses-by_page_number',
  versesByPageNumberSchema,
  (args) => versesService.versesByPageNumber(args)
);

/**
 * Handler for the verses-by_juz_number tool
 */
export const handleVersesByJuzNumber = createHandler(
  'verses-by_juz_number',
  versesByJuzNumberSchema,
  (args) => versesService.versesByJuzNumber(args)
);

/**
 * Handler for the verses-by_hizb_number tool
 */
export const handleVersesByHizbNumber = createHandler(
  'verses-by_hizb_number',
  versesByHizbNumberSchema,
  (args) => versesService.versesByHizbNumber(args)
);

/**
 * Handler for the verses-by_rub_el_hizb_number tool
 */
export const handleVersesByRubElHizbNumber = createHandler(
  'verses-by_rub_el_hizb_number',
  versesByRubElHizbNumberSchema,
  (args) => versesService.versesByRubElHizbNumber(args)
);

/**
 * Handler for the verses-by_verse_key tool
 */
export const handleVersesByVerseKey = createHandler(
  'verses-by_verse_key',
  versesByVerseKeySchema,
  (args) => versesService.versesByVerseKey(args)
);

/**
 * Handler for the random_verse tool
 */
export const handleRandomVerse = createHandler(
  'random_verse',
  randomVerseSchema,
  (args) => versesService.randomVerse(args)
);
