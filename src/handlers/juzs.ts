/**
 * Juzs-related handlers for the Quran.com API MCP Server
 */

import { juzsService } from '../services';
import { juzsSchema } from '../schemas/juzs';
import { createHandler } from '../utils/handler-wrapper';

/**
 * Handler for the juzs tool
 */
export const handleJuzs = createHandler(
  'juzs',
  juzsSchema,
  (args) => juzsService.getJuzs(args)
);
