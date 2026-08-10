/** Type guard for populated Payload relationship fields. */
export function isPopulated<T extends { id: number | string }>(
  value: number | T | null | undefined,
): value is T {
  return typeof value === 'object' && value !== null && 'id' in value
}

export function populatedDocs<T extends { id: number | string }>(
  values: (number | T)[] | null | undefined,
): T[] {
  if (!values?.length) return []
  return values.filter((value): value is T => isPopulated(value))
}
