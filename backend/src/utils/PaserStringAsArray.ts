export function ParseStrinAsArray(words: string): string[] {
  return words.split(",").map((tech: string) => tech.trim());
}
