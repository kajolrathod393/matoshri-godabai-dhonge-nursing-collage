import en from "./en.json";
import mr from "./mr.json";

export type Lang = "en" | "mr";
export type Dictionary = typeof en;

// mr.json must have exactly the same keys as en.json (checked by TypeScript).
const mrDict: Dictionary = mr;

export const dictionaries: Record<Lang, Dictionary> = { en, mr: mrDict };
export const LANGS: Lang[] = ["en", "mr"];
export const DEFAULT_LANG: Lang = "en";
export const LANG_STORAGE_KEY = "site-lang";
