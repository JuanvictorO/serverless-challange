export function toString(data: any): string | undefined {
  return data ? String(data) : undefined;
}

export function toArray(data: any): string[] | undefined {
  return data ? Array(data) : undefined;
}

export function toNumber(data: any): number | undefined {
  return data ? Number(data) : undefined;
}
