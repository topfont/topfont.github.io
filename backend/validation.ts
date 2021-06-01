export const alphabet = new Set(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
);

export const fonts = new Set([
  "Arial",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Abril Fatface",
  "Alfa Slab One",
  "Balsamiq Sans",
  "Bebas Neue",
  "Cabin Sketch",
  "Comfortaa",
  "Concert One",
  "Fredericka the Great",
  "Frijole",
  "Graduate",
  "Lobster",
  "Monoton",
  "Press Start 2P",
  "Righteous",
  "Roboto",
  "Staatliches",
  "UnifrakturMaguntia",
]);

export function appendError(errors: any, key: string, error: string) {
  if (!(key in errors)) {
    errors[key] = [];
  }
  errors[key].push(error);
}
