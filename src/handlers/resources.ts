/**
 * Resource-related handlers for the Quran.com API MCP Server
 */

import {
  translationsService,
  tafsirsService,
  audioService,
  languagesService
} from '../services';
import {
  translationsSchema,
  translationInfoSchema
} from '../schemas/translations';
import {
  tafsirsSchema,
  tafsirInfoSchema,
  tafsirSchema
} from '../schemas/tafsirs';
import {
  chapterRecitersSchema,
  recitationStylesSchema
} from '../schemas/audio';
import { languagesSchema } from '../schemas/languages';
import { createHandler, simpleHandler } from '../utils/handler-wrapper';

/**
 * Handler for the translations tool
 */
export const handleTranslations = createHandler(
  'translations',
  translationsSchema,
  (args) => translationsService.listTranslations(args)
);

/**
 * Handler for the translation-info tool
 */
export const handleTranslationInfo = createHandler(
  'translation-info',
  translationInfoSchema,
  (args) => translationsService.getTranslationInfo(args)
);

/**
 * Handler for the tafsirs tool
 */
export const handleTafsirs = createHandler(
  'tafsirs',
  tafsirsSchema,
  (args) => tafsirsService.listTafsirs(args)
);

/**
 * Handler for the tafsir-info tool
 */
export const handleTafsirInfo = createHandler(
  'tafsir-info',
  tafsirInfoSchema,
  (args) => tafsirsService.getTafsirInfo(args)
);

/**
 * Handler for the tafsir tool
 */
export const handleTafsir = createHandler(
  'tafsir',
  tafsirSchema,
  (args) => tafsirsService.getTafsir(args)
);

/**
 * Handler for the chapter-reciters tool
 */
export const handleChapterReciters = createHandler(
  'chapter-reciters',
  chapterRecitersSchema,
  (args) => audioService.listChapterReciters(args)
);

/**
 * Handler for the recitation-styles tool
 */
export const handleRecitationStyles = createHandler(
  'recitation-styles',
  recitationStylesSchema,
  () => audioService.listRecitationStyles()
);

/**
 * Handler for the languages tool
 */
export const handleLanguages = createHandler(
  'languages',
  languagesSchema,
  (args) => languagesService.listLanguages(args)
);
