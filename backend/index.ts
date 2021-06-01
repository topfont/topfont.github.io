import express from "express";
import cors from "cors";
import { addVote, db } from "./db";
import { appendError, alphabet } from "./validation";

/* express setup */
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

/* Retrieves all vote data. */
app.get("/", async (_request, response) => {
  return response.json(db);
});

/* Stores a single letter/font vote. */
app.post("/vote/", async (request, response) => {
  /* Some manual validation. In a bigger code base, this would likely be more declaratively set up. */
  const data = request.body;
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
      "This letter is invalid. Letter must be in [a-zA-Z]."
    );
  }
  if (typeof data.font !== "string") {
    appendError(errors, "font", "This field must be a string value.");
  }
  if (Object.keys(errors).length > 0) {
    return response.status(400).send(errors);
  }

  /* Actually perform the vote store. */
  addVote(data.letter, data.font);

  return response.json({
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
