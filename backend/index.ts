import express from "express";
import cors from "cors";

const app = express();

const port = 5000;
app.use(express.json());
app.use(cors());

const db: any = {};

function addVote(letter: string, font: string) {
  if (!(letter in db)) {
    db[letter] = {};
  }
  if (!(font in db[letter])) {
    db[letter][font] = 0;
  }
  db[letter][font]++;
}

app.get("/", async (request, response) => {
  return response.status(200).send(db);
});

function appendError(errors: any, key: string, error: string) {
  if (!(key in errors)) {
    errors[key] = [];
  }
  errors[key].push(error);
}

const alphabet = new Set(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
);

app.post("/vote/", async (request, response) => {
  /* validations */
  const data = request.body;
  console.log("/vote/", data);
  const errors = {};
  for (const requiredField of ["letter", "font"]) {
    if (!(requiredField in data)) {
      appendError(errors, requiredField, "This field is required.");
    }
  }
  if (!alphabet.has(data.letter)) {
    appendError(
      errors,
      "letter",
      "This letter is invalid. Letter must be a-zA-Z."
    );
  }
  if (typeof data.font !== "string") {
    appendError(errors, "font", "This field must be a string value.");
  }
  if (Object.keys(errors).length > 0) {
    return response.status(400).send(errors);
  }
  addVote(data.letter, data.font);
  return response.status(200).send({
    status: "OK",
  });
});

try {
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
} catch (error) {
  console.log(error);
}
