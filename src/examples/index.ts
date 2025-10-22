/**
 * Examples for MCP tool descriptions
 * 
 * This module provides example usage and results for MCP tools
 * to help models understand how to use them correctly.
 */

/**
 * Tool examples organized by tool name
 */
export const toolExamples = {
  // Explanation examples (comprehensive Quran explanation)
  'explanation': [
    {
      description: "Get comprehensive explanation for Ayat al-Kursi (2:255) with multiple translations and tafsir",
      parameters: {
        verse_key: "2:255",
        translations: "131,20",
        tafsirs: "169",
        language: "en"
      },
      result: {
        success: true,
        message: "Explanation retrieved successfully",
        data: {
          summary: "Retrieved 1 verse(s) from Verse 2:255 from Al-Baqarah with 2 translation(s) (IDs: 131, 20) and 1 tafsir(s) (IDs: 169) using 1 optimized API call(s).",
          metadata: {
            verse_reference: "Verse 2:255",
            chapter_name: "Al-Baqarah",
            total_verses: 1,
            translations_included: ["131", "20"],
            tafsirs_included: ["169"],
            context_included: false,
            api_calls_made: 1
          },
          verses: [
            {
              verse_number: 1,
              verse_key: "2:255",
              text_uthmani: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
              translations: [
                {
                  id: 131,
                  name: "Dr. Mustafa Khattab, The Clear Quran",
                  text: "Allah! There is no god worthy of worship except Him, the Ever-Living, All-Sustaining.",
                  language: "english"
                },
                {
                  id: 20,
                  name: "Sahih International",
                  text: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.",
                  language: "english"
                }
              ],
              tafsirs: [
                {
                  id: 169,
                  name: "Tafsir Ibn Kathir",
                  text: "Allah's statement: (Allah! La ilaha illa Huwa (none has the right to be worshipped but He), Al-Hayyul-Qayyum) meaning, He is the One, there is no deity worthy of worship except Him...",
                  language: "english"
                }
              ]
            }
          ]
        }
      }
    },
    {
      description: "Get explanation for entire Al-Fatihah (Chapter 1) with translation and context",
      parameters: {
        chapter_number: "1",
        translations: "131",
        language: "en"
      },
      result: {
        success: true,
        message: "Explanation retrieved successfully",
        data: {
          summary: "Retrieved 7 verse(s) from Chapter 1 from Al-Fatihah with 1 translation(s) (IDs: 131) using 1 optimized API call(s).",
          metadata: {
            verse_reference: "Chapter 1",
            chapter_name: "Al-Fatihah",
            total_verses: 7,
            translations_included: ["131"],
            tafsirs_included: [],
            context_included: false,
            api_calls_made: 1
          },
          verses: [
            {
              verse_number: 1,
              verse_key: "1:1",
              text_uthmani: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
              translations: [
                {
                  id: 131,
                  name: "Dr. Mustafa Khattab, The Clear Quran",
                  text: "In the Name of Allah - the Most Compassionate, Most Merciful.",
                  language: "english"
                }
              ]
            }
            // Additional verses truncated for brevity
          ]
        }
      }
    },
    {
      description: "Get verse with context (surrounding verses)",
      parameters: {
        verse_key: "112:1",
        translations: "131",
        include_context: true,
        context_verses: 2,
        language: "en"
      },
      result: {
        success: true,
        message: "Explanation retrieved successfully",
        data: {
          summary: "Retrieved 4 verse(s) from Verse 112:1 from Al-Ikhlas with 1 translation(s) (IDs: 131) including context verses using 2 optimized API call(s).",
          metadata: {
            verse_reference: "Verse 112:1",
            chapter_name: "Al-Ikhlas",
            total_verses: 4,
            translations_included: ["131"],
            tafsirs_included: [],
            context_included: true,
            api_calls_made: 2
          },
          verses: [
            {
              verse_number: 1,
              verse_key: "112:1",
              text_uthmani: "قُلْ هُوَ اللَّهُ أَحَدٌ",
              translations: [
                {
                  id: 131,
                  name: "Dr. Mustafa Khattab, The Clear Quran",
                  text: "Say, O Prophet, He is Allah—One and Indivisible.",
                  language: "english"
                }
              ]
            }
            // Additional context verses truncated for brevity
          ]
        }
      }
    }
  ],

  // Chapter-related examples
  'list-chapters': [
    {
      description: "Get chapters in English",
      parameters: { language: "en" },
      result: { 
        success: true, 
        message: "list-chapters executed successfully", 
        data: { 
          chapters: [
            { id: 1, name_arabic: "الفاتحة", name_simple: "Al-Fatihah", translated_name: { name: "The Opening" } },
            { id: 2, name_arabic: "البقرة", name_simple: "Al-Baqarah", translated_name: { name: "The Cow" } },
            // Additional chapters truncated for brevity
          ]
        } 
      }
    },
    {
      description: "Get chapters in Arabic",
      parameters: { language: "ar" },
      result: { 
        success: true, 
        message: "list-chapters executed successfully", 
        data: { 
          chapters: [
            { id: 1, name_arabic: "الفاتحة", name_simple: "Al-Fatihah", translated_name: { name: "الفاتحة" } },
            { id: 2, name_arabic: "البقرة", name_simple: "Al-Baqarah", translated_name: { name: "البقرة" } },
            // Additional chapters truncated for brevity
          ]
        } 
      }
    }
  ],
  
  'GET-chapter': [
    {
      description: "Get Al-Fatihah (Chapter 1) in English",
      parameters: { language: "en", id: 1 },
      result: {
        success: true,
        message: "GET-chapter executed successfully",
        data: {
          chapter: {
            id: 1,
            revelation_place: "makkah",
            revelation_order: 5,
            bismillah_pre: false,
            name_simple: "Al-Fatihah",
            name_complex: "Al-Fātiĥah",
            name_arabic: "الفاتحة",
            verses_count: 7,
            pages: [1, 1],
            translated_name: { 
              language_name: "english", 
              name: "The Opening" 
            }
          }
        }
      }
    }
  ],
  
  // Verse-related examples
  'verses-by_chapter_number': [
    {
      description: "Get first 3 verses of Al-Fatihah with English translation",
      parameters: { 
        chapter_number: 1, 
        language: "en",
        translations: [131],
        limit: 3,
        page: 1
      },
      result: {
        success: true,
        message: "verses-by_chapter_number executed successfully",
        data: {
          verses: [
            {
              id: 1,
              verse_key: "1:1",
              text_uthmani: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
              translations: [
                {
                  text: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
                  resource_name: "Saheeh International"
                }
              ]
            },
            {
              id: 2,
              verse_key: "1:2",
              text_uthmani: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
              translations: [
                {
                  text: "All praise is due to Allah, Lord of the worlds -",
                  resource_name: "Saheeh International"
                }
              ]
            },
            {
              id: 3,
              verse_key: "1:3",
              text_uthmani: "الرَّحْمَٰنِ الرَّحِيمِ",
              translations: [
                {
                  text: "The Entirely Merciful, the Especially Merciful,",
                  resource_name: "Saheeh International"
                }
              ]
            }
          ]
        }
      }
    }
  ],
  
  'verses-by_verse_key': [
    {
      description: "Get verse 1:1 with English translation",
      parameters: { 
        verse_key: "1:1", 
        language: "en",
        translations: [131]
      },
      result: {
        success: true,
        message: "verses-by_verse_key executed successfully",
        data: {
          verse: {
            id: 1,
            verse_key: "1:1",
            text_uthmani: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            translations: [
              {
                text: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
                resource_name: "Saheeh International"
              }
            ]
          }
        }
      }
    }
  ],
  
  'random_verse': [
    {
      description: "Get a random verse with English translation",
      parameters: { 
        language: "en",
        translations: [131]
      },
      result: {
        success: true,
        message: "random_verse executed successfully",
        data: {
          verse: {
            id: 2583,
            verse_key: "20:39",
            text_uthmani: "أَنِ اقْذِفِيهِ فِي التَّابُوتِ فَاقْذِفِيهِ فِي الْيَمِّ فَلْيُلْقِهِ الْيَمُّ بِالسَّاحِلِ يَأْخُذْهُ عَدُوٌّ لِّي وَعَدُوٌّ لَّهُ وَأَلْقَيْتُ عَلَيْكَ مَحَبَّةً مِّنِّي وَلِتُصْنَعَ عَلَىٰ عَيْنِي",
            translations: [
              {
                text: "[Saying], 'Cast him into the chest and cast it into the river, and the river will throw it onto the bank; there will take him an enemy to Me and an enemy to him.' And I bestowed upon you love from Me that you would be brought up under My eye.",
                resource_name: "Saheeh International"
              }
            ]
          }
        }
      }
    }
  ],
  
  // Search-related examples
  'search': [
    {
      description: "Search for 'mercy' in English translation",
      parameters: { 
        query: "mercy", 
        language: "en",
        size: 5,
        page: 1
      },
      result: {
        success: true,
        message: "search executed successfully",
        data: {
          search: {
            query: "mercy",
            total_results: 79,
            results: [
              {
                verse_key: "1:3",
                text_uthmani: "الرَّحْمَٰنِ الرَّحِيمِ",
                translations: [
                  {
                    text: "The Entirely Merciful, the Especially Merciful,",
                    resource_name: "Saheeh International"
                  }
                ]
              },
              {
                verse_key: "2:218",
                text_uthmani: "إِنَّ الَّذِينَ آمَنُوا وَالَّذِينَ هَاجَرُوا وَجَاهَدُوا فِي سَبِيلِ اللَّهِ أُولَٰئِكَ يَرْجُونَ رَحْمَتَ اللَّهِ وَاللَّهُ غَفُورٌ رَّحِيمٌ",
                translations: [
                  {
                    text: "Indeed, those who have believed and those who have emigrated and fought in the cause of Allah - those expect the mercy of Allah. And Allah is Forgiving and Merciful.",
                    resource_name: "Saheeh International"
                  }
                ]
              }
              // Additional results truncated for brevity
            ]
          }
        }
      }
    }
  ],
  
  // Juz-related examples
  'juzs': [
    {
      description: "Get list of all juzs",
      parameters: {},
      result: {
        success: true,
        message: "juzs executed successfully",
        data: {
          juzs: [
            {
              id: 1,
              juz_number: 1,
              verse_mapping: {
                "1": "1-7",
                "2": "1-141"
              },
              first_verse_id: 1,
              last_verse_id: 148,
              verses_count: 148
            },
            {
              id: 2,
              juz_number: 2,
              verse_mapping: {
                "2": "142-252"
              },
              first_verse_id: 149,
              last_verse_id: 259,
              verses_count: 111
            }
            // Additional juzs truncated for brevity
          ]
        }
      }
    }
  ],
  
  // Translation-related examples
  'translations': [
    {
      description: "Get list of available translations",
      parameters: { language: "en" },
      result: {
        success: true,
        message: "translations executed successfully",
        data: {
          translations: [
            {
              id: 131,
              name: "Saheeh International",
              author_name: "Saheeh International",
              slug: "saheeh-international",
              language_name: "english",
              translated_name: { name: "Saheeh International" }
            },
            {
              id: 20,
              name: "Yusuf Ali",
              author_name: "Abdullah Yusuf Ali",
              slug: "yusuf-ali",
              language_name: "english",
              translated_name: { name: "Yusuf Ali" }
            }
            // Additional translations truncated for brevity
          ]
        }
      }
    }
  ],
  
  // Tafsir-related examples
  'tafsirs': [
    {
      description: "Get list of available tafsirs",
      parameters: { language: "en" },
      result: {
        success: true,
        message: "tafsirs executed successfully",
        data: {
          tafsirs: [
            {
              id: 1,
              name: "Tafsir Ibn Kathir",
              author_name: "Ibn Kathir",
              slug: "ibn-kathir",
              language_name: "english",
              translated_name: { name: "Tafsir Ibn Kathir" }
            },
            {
              id: 2,
              name: "Tafsir al-Jalalayn",
              author_name: "Jalal ad-Din al-Mahalli and Jalal ad-Din as-Suyuti",
              slug: "jalalayn",
              language_name: "english",
              translated_name: { name: "Tafsir al-Jalalayn" }
            }
            // Additional tafsirs truncated for brevity
          ]
        }
      }
    }
  ],
  
  // Language-related examples
  'languages': [
    {
      description: "Get all available languages",
      parameters: {},
      result: {
        success: true,
        message: "languages executed successfully",
        data: {
          languages: [
            {
              id: 1,
              name: "English",
              iso_code: "en",
              native_name: "English",
              direction: "ltr",
              translations_count: 12
            },
            {
              id: 2,
              name: "Arabic",
              iso_code: "ar",
              native_name: "العربية",
              direction: "rtl",
              translations_count: 5
            }
            // Additional languages truncated for brevity
          ]
        }
      }
    }
  ]
};
