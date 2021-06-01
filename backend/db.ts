/* The database is stored in-memory here to reduce the scope of the implementation. In the future, one could switch this out for e.g. postgres. */
export const db: {
  [letter: string]: { [fontName: string]: number };
} = {};

/* Simple db wrapper to add a single vote to a letter/font combination. */
export function addVote(letter: string, font: string) {
  if (!(letter in db)) {
    db[letter] = {};
  }
  if (!(font in db[letter])) {
    db[letter][font] = 0;
  }
  db[letter][font]++;
}
