export type Lang = {
  code: string; name: string; native: string;
  region: string; tts: boolean; stt?: boolean; provider: string;
};

export type Mode = "translate" | "chat";

export type TranslateMsg = {
  id: string; kind: "translate";
  input: string;
  translation?: string; error?: string;
  provider?: string; quality?: number; latency?: number;
  lang: Lang;
};

export type ChatMsg = {
  id: string; kind: "chat"; role: "user" | "assistant";
  english: string;
  translated?: string; error?: string;
  provider?: string; quality?: number; latency?: number;
  lang: Lang;
  loading?: boolean;
};

export type Msg = TranslateMsg | ChatMsg;

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
