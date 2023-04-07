export function prettifyFlavorText(text?: string) {
  if (!text) return '';
  return text.replace(/\s/g, ' ').replace(/POKéMON/i, 'Pokémon');
}

export function kebabCaseToCamelCase(str?: string, replaceDashWithSpace = true) {
  if (!str) return '';
  const parts = str.split('-');
  const capitalize = (str: string) => str.substring(0, 1).toUpperCase() + str.substring(1);
  return parts.map(capitalize).join(replaceDashWithSpace ? ' ' : '');
}
