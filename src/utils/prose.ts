/** Normalise a prose field (string | string[]) into an array of paragraphs. */
export function toParagraphs(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}
