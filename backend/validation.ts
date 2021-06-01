export const alphabet = new Set(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
);

export function appendError(errors: any, key: string, error: string) {
  if (!(key in errors)) {
    errors[key] = [];
  }
  errors[key].push(error);
}
