/**
 * Chapter-related handlers for the Quran.com API MCP Server
 */

import { chaptersService } from '../services';
import {
  listChaptersSchema,
  getChapterSchema,
  chapterInfoSchema
} from '../schemas/chapters';
import { createHandler } from '../utils/handler-wrapper';

/**
 * Handler for the list-chapters tool
 */
export const handleListChapters = createHandler(
  'list-chapters',
  listChaptersSchema,
  (args) => chaptersService.listChapters(args)
);

/**
 * Handler for the GET-chapter tool
 */
export const handleGetChapter = createHandler(
  'GET-chapter',
  getChapterSchema,
  (args) => chaptersService.getChapter(args)
);

/**
 * Handler for the info tool
 */
export const handleChapterInfo = createHandler(
  'info',
  chapterInfoSchema,
  (args) => chaptersService.getChapterInfo(args)
);
