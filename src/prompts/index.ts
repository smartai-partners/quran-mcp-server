/**
 * MCP Prompts for common Quran study tasks
 *
 * These prompts provide ready-to-use templates for interacting with the Quran API
 */

export interface Prompt {
  id: string;
  name: string;
  description: string;
  arguments?: Array<{
    name: string;
    description: string;
    required: boolean;
  }>;
}

/**
 * Available prompts for the Quran MCP server
 */
export const prompts: Prompt[] = [
  {
    id: "daily-verse",
    name: "Daily Verse for Reflection",
    description: "Get a random verse with translation and tafsir for daily reflection and study",
    arguments: [
      {
        name: "translation",
        description: "Translation ID to use (default: 131 - Sahih International)",
        required: false
      }
    ]
  },
  {
    id: "study-surah",
    name: "Study a Surah",
    description: "Get comprehensive information about a specific Surah including verses, translation, and chapter info",
    arguments: [
      {
        name: "surah_number",
        description: "The Surah number (1-114)",
        required: true
      },
      {
        name: "translation",
        description: "Translation ID to use (default: 131 - Sahih International)",
        required: false
      }
    ]
  },
  {
    id: "search-topic",
    name: "Search for a Topic",
    description: "Search the Quran for verses related to a specific topic or keyword",
    arguments: [
      {
        name: "topic",
        description: "The topic or keyword to search for (e.g., 'patience', 'mercy', 'prayer')",
        required: true
      },
      {
        name: "language",
        description: "Language for search (default: 'en')",
        required: false
      }
    ]
  },
  {
    id: "compare-translations",
    name: "Compare Verse Translations",
    description: "Get a specific verse with multiple translations for comparison and deeper understanding",
    arguments: [
      {
        name: "verse_key",
        description: "The verse key (e.g., '2:255' for Ayat al-Kursi)",
        required: true
      },
      {
        name: "translations",
        description: "Comma-separated translation IDs (e.g., '131,20,22' for Sahih International, Yusuf Ali, Pickthall)",
        required: false
      }
    ]
  },
  {
    id: "juz-study",
    name: "Study a Juz",
    description: "Get verses from a specific Juz for structured Quran reading",
    arguments: [
      {
        name: "juz_number",
        description: "The Juz number (1-30)",
        required: true
      },
      {
        name: "translation",
        description: "Translation ID to use (default: 131 - Sahih International)",
        required: false
      }
    ]
  },
  {
    id: "famous-verse",
    name: "Get a Famous Verse",
    description: "Access well-known verses like Ayat al-Kursi, the verse of light, or the opening of Surah Al-Fatiha",
    arguments: [
      {
        name: "verse_name",
        description: "Name of the verse: 'ayat-al-kursi' (2:255), 'verse-of-light' (24:35), 'al-fatiha' (1:1-7), 'throne-verse' (2:255)",
        required: true
      },
      {
        name: "translation",
        description: "Translation ID to use (default: 131 - Sahih International)",
        required: false
      }
    ]
  },
  {
    id: "list-translations",
    name: "Browse Available Translations",
    description: "Get a list of all available translations in different languages",
    arguments: [
      {
        name: "language",
        description: "Filter by language (e.g., 'en', 'ar', 'ur', 'fr')",
        required: false
      }
    ]
  },
  {
    id: "memorization-helper",
    name: "Memorization Helper",
    description: "Get verses from a specific page of the Mushaf for memorization practice",
    arguments: [
      {
        name: "page_number",
        description: "Mushaf page number (1-604)",
        required: true
      },
      {
        name: "translation",
        description: "Translation ID to use (default: 131 - Sahih International)",
        required: false
      }
    ]
  }
];

/**
 * Get prompt details by ID
 */
export function getPromptById(id: string): Prompt | undefined {
  return prompts.find(p => p.id === id);
}

/**
 * Get the prompt message content for a given prompt ID and arguments
 */
export function getPromptMessage(id: string, args: Record<string, string>): string {
  const prompt = getPromptById(id);
  if (!prompt) {
    throw new Error(`Prompt with id '${id}' not found`);
  }

  switch (id) {
    case "daily-verse":
      return `Please get me a random verse for daily reflection. ${args.translation ? `Use translation ID ${args.translation}.` : 'Use Sahih International translation (ID 131).'} Include both the Arabic text and translation.`;

    case "study-surah":
      if (!args.surah_number) {
        throw new Error("surah_number argument is required");
      }
      return `I want to study Surah ${args.surah_number}. Please provide:
1. Chapter information and context
2. The verses with ${args.translation ? `translation ID ${args.translation}` : 'Sahih International translation'}
3. Any relevant background about this Surah`;

    case "search-topic":
      if (!args.topic) {
        throw new Error("topic argument is required");
      }
      return `Search the Quran for verses about "${args.topic}". Show me relevant verses with their translations in ${args.language || 'English'}. Include verse references.`;

    case "compare-translations":
      if (!args.verse_key) {
        throw new Error("verse_key argument is required");
      }
      const translationIds = args.translations || '131,20,22'; // Sahih International, Yusuf Ali, Pickthall
      return `Please show me verse ${args.verse_key} with multiple translations for comparison. Use translation IDs: ${translationIds}. Include the Arabic text and all translations side by side.`;

    case "juz-study":
      if (!args.juz_number) {
        throw new Error("juz_number argument is required");
      }
      return `I want to study Juz ${args.juz_number}. Please provide the verses with ${args.translation ? `translation ID ${args.translation}` : 'Sahih International translation'}. You can show me the first few verses to start.`;

    case "famous-verse":
      if (!args.verse_name) {
        throw new Error("verse_name argument is required");
      }
      const verseMap: Record<string, string> = {
        'ayat-al-kursi': '2:255',
        'throne-verse': '2:255',
        'verse-of-light': '24:35',
        'al-fatiha': '1:1'
      };
      const verseKey = verseMap[args.verse_name];
      if (!verseKey) {
        throw new Error(`Unknown verse name: ${args.verse_name}. Use: ayat-al-kursi, verse-of-light, al-fatiha, or throne-verse`);
      }
      return `Please show me ${args.verse_name} (verse ${verseKey}) with ${args.translation ? `translation ID ${args.translation}` : 'Sahih International translation'}. Include both Arabic and translation.`;

    case "list-translations":
      return `Please list all available Quran translations${args.language ? ` in ${args.language}` : ''}. Show me the translation ID, name, and author for each.`;

    case "memorization-helper":
      if (!args.page_number) {
        throw new Error("page_number argument is required");
      }
      return `I'm memorizing page ${args.page_number} of the Mushaf. Please show me the verses from this page with ${args.translation ? `translation ID ${args.translation}` : 'Sahih International translation'} to help me understand the meaning.`;

    default:
      throw new Error(`Unknown prompt ID: ${id}`);
  }
}
