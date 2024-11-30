export const startingWords = {
  fr: {
    word: "Pierre",
    emoji: "🪨"
  },
  en: {
    word: "Stone",
    emoji: "🪨"
  },
  de: {
    word: "Stein",
    emoji: "🪨"
  },
  es: {
    word: "Piedra",
    emoji: "🪨"
  },
  it: {
    word: "Pietra",
    emoji: "🪨"
  }
} as const;

export type StartingWord = typeof startingWords[keyof typeof startingWords];