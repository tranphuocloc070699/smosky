export function convertedSentence(sentence: string) {
    return sentence
      .toLowerCase()
      .replace(/\s+/g, "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }