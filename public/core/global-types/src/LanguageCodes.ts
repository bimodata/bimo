export type LanguageCode = "fr" | "en";

export type StringByLanguageCode = {
  [code in LanguageCode]?: string;
};
