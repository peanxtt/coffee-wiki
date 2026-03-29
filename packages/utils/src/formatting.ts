/**
 * Format a number as a temperature string
 */
export function formatTemperature(
  temp: number,
  unit: 'C' | 'F' = 'C'
): string {
  return `${temp}°${unit}`
}

/**
 * Format altitude range
 */
export function formatAltitude(min: number, max: number, unit = 'm'): string {
  return `${min.toLocaleString()} - ${max.toLocaleString()}${unit}`
}

/**
 * Format a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(text: string): string {
  return text.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
