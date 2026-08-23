export type Provider = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  capabilities: string[];
  langs: string[];
  learnMore: string;
};

export const PROVIDERS: Provider[] = [
  {
    id: "sunbird",
    emoji: "🌻",
    name: "Sunbird AI",
    description: "Built specifically for Ugandan languages. Powers translation, speech-to-text, and text-to-speech for Luganda, Acholi, Ateso, Runyankore, and Lugbara.",
    capabilities: ["Translation", "Speech-to-Text", "Text-to-Speech"],
    langs: ["lug", "ach", "teo", "nyn", "lgg"],
    learnMore: "https://www.sunbird.ai",
  },
  {
    id: "khaya",
    emoji: "🌍",
    name: "Khaya AI",
    description: "Purpose-built for West and East African languages. GhanaNLP's translation API v2 covering Yoruba, Twi, Ewe, Ga, Dagbani, Kikuyu, Luo, and more.",
    capabilities: ["Translation"],
    langs: ["yo", "tw", "ee", "gaa", "dag", "ki", "luo", "mer", "kus"],
    learnMore: "https://ghananlp.org",
  },
  {
    id: "huggingface",
    emoji: "🤗",
    name: "HuggingFace",
    description: "Helsinki-NLP opus-mt models for Swahili, French, Arabic, and Afrikaans. Acts as the universal fallback layer when primary providers are unavailable.",
    capabilities: ["Translation"],
    langs: ["sw", "fr", "ar", "af"],
    learnMore: "https://huggingface.co",
  },
];
