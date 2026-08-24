import type { Lang } from "../types";

export const LANGS: Lang[] = [
  { code: "lug", name: "Luganda", native: "Luganda", region: "Uganda", tts: true, stt: true, provider: "Sunbird" },
  { code: "ach", name: "Acholi", native: "Acholi", region: "Uganda", tts: true, stt: true, provider: "Sunbird" },
  { code: "teo", name: "Ateso", native: "Ateso", region: "Uganda", tts: true, stt: true, provider: "Sunbird" },
  { code: "nyn", name: "Runyankore", native: "Runyankore", region: "Uganda", tts: true, stt: true, provider: "Sunbird" },
  { code: "lgg", name: "Lugbara", native: "Lugbara", region: "Uganda", tts: true, stt: true, provider: "Sunbird" },
  { code: "yo", name: "Yoruba", native: "Yoruba", region: "Nigeria", tts: false, provider: "Khaya" },
  { code: "tw", name: "Twi", native: "Twi", region: "Ghana", tts: false, provider: "Khaya" },
  { code: "ee", name: "Ewe", native: "Ewe", region: "Ghana/Togo", tts: false, provider: "Khaya" },
  { code: "gaa", name: "Ga", native: "Ga", region: "Ghana", tts: false, provider: "Khaya" },
  { code: "dag", name: "Dagbani", native: "Dagbani", region: "Ghana", tts: false, provider: "Khaya" },
  { code: "ki", name: "Kikuyu", native: "Gikuyu", region: "Kenya", tts: false, provider: "Khaya" },
  { code: "luo", name: "Luo", native: "Dholuo", region: "Kenya", tts: false, provider: "Khaya" },
  { code: "mer", name: "Kimeru", native: "Kimeru", region: "Kenya", tts: false, provider: "Khaya" },
  { code: "kus", name: "Kusaal", native: "Kusaal", region: "Ghana", tts: false, provider: "Khaya" },
  { code: "sw", name: "Swahili", native: "Kiswahili", region: "East Africa", tts: false, stt: true, provider: "HuggingFace" },
  { code: "fr", name: "French", native: "Francais", region: "Francophone", tts: false, provider: "HuggingFace" },
  { code: "ar", name: "Arabic", native: "العربية", region: "North Africa", tts: false, provider: "HuggingFace" },
  { code: "af", name: "Afrikaans", native: "Afrikaans", region: "South Africa", tts: false, provider: "HuggingFace" },
];

// Tailwind utility strings replacing the old .badge-* classes from globals.css
export const BADGE: Record<string, string> = {
  Sunbird: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  Khaya: "bg-amber-50 text-amber-800 border border-amber-300",
  HuggingFace: "bg-blue-50 text-blue-800 border border-blue-300",
};

export const TRANSLATE_SUGG = [
  "Good morning",
  "How are you?",
  "Thank you",
  "Welcome home",
  "Where is the hospital?",
  "My name is David",
];

export const CHAT_SUGG = [
  "Tell me about Uganda",
  "What is Luganda?",
  "Teach me a greeting",
  "African history",
  "What crops grow in West Africa?",
];
