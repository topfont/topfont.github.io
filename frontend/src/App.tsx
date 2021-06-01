import React, { useState } from "react";
import { FontCard } from "./FontCard";
import { Topfont } from "./Topfont";
import "./App.css";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function getRandomLetter() {
  return alphabet[(Math.random() * alphabet.length) | 0];
}

const fonts: string[] = [
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
];
function getRandomFontPair() {
  const a = (Math.random() * fonts.length) | 0;
  let b = a;
  while (b === a) {
    b = (Math.random() * fonts.length) | 0;
  }
  return [fonts[a], fonts[b]];
}

function App() {
  const [answeredQuestions, setAnsweredQuestions] = useState(
    +(window.localStorage.getItem("voteCount") || 0) || 0
  );
  const [currentLetter, setCurrentLetter] = useState(getRandomLetter());
  const [isLoading, setIsLoading] = useState(false);
  const [showTopfont, setShowTopfont] = useState(false);
  const [votes, setVotes] = useState<any>(null);
  const [currentFontPair, setCurrentFontPair] = useState(getRandomFontPair());

  const vote = async (letter: string, font: string) => {
    setIsLoading(true);
    setAnsweredQuestions((old) => {
      const value = old + 1;
      window.localStorage.setItem("voteCount", "" + value);
      return value;
    });
    try {
      await fetch("https://topfont.arkt.is/vote/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          letter,
          font,
        }),
      });
    } catch {
    } finally {
      setIsLoading(false);
      setCurrentLetter(getRandomLetter());
      setCurrentFontPair(getRandomFontPair());
    }
  };

  let topfont = null;
  if (votes && votes !== "loading") {
    const entries = alphabet.split("").map((x) => [x, votes[x] || {}]);
    for (const entry of entries) {
      //@ts-expect-error
      const font = Object.entries(entry[1]).sort((a, b) => a[1] - b[1])[0];
      entry[1] = font ? font[0] : undefined;
    }
    topfont = Object.fromEntries(entries);
  }

  return (
    <div className="App">
      <div
        style={{
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          background: "#502824",
          padding: 16,
        }}
      >
        <a href="/" style={{ color: "white", textDecoration: "none" }}>
          <span style={{ fontWeight: "bold" }}>topfont</span>
          <span style={{ opacity: 0.5 }}>.github.io</span>
        </a>
      </div>
      <div
        style={{
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 16,
          paddingBottom: 16,
          margin: "0 auto",
          maxWidth: 450,
        }}
      >
        <p style={{ marginBottom: 32, lineHeight: 1.5 }}>
          <a href="https://github.com/topfont/topfont.github.io">
            {" "}
            Topfont (GitHub)
          </a>{" "}
          is a community-sourced project to find the best combination font, the{" "}
          <b>Topfont</b>. It works by pitting glyphs from various fonts against
          eachother 1-on-1, and synthesises a whole new font that uses the most
          popular letter glyph across all fonts for each letter.
        </p>

        <p>
          {!showTopfont ? (
            <a
              href="/topfont"
              onClick={async (e) => {
                e.preventDefault();
                setShowTopfont(true);
                setVotes("loading");
                try {
                  const response = await fetch("https://topfont.arkt.is/");
                  const votes = await response.json();
                  setVotes(votes);
                } catch {
                  setVotes(null);
                  setShowTopfont(false);
                }
              }}
            >
              View the Topfont in all it's glory.
            </a>
          ) : (
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setShowTopfont(false);
              }}
            >
              Continue voting for glyphs.
            </a>
          )}
        </p>
        {showTopfont ? (
          <div
            style={{
              marginTop: 32,
              fontSize: 24,
              background: "white",
              paddingTop: 1,
              paddingBottom: 1,
              paddingLeft: 32,
              paddingRight: 32,
              lineHeight: 1.25,
              borderRadius: 8,
            }}
          >
            {votes === "loading" ? (
              ""
            ) : (
              <div>
                <p>
                  <Topfont
                    text="Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz"
                    topfont={topfont}
                  />
                </p>
                <p>
                  <Topfont
                    text="The quick brown fox jumps over the lazy dog."
                    topfont={topfont}
                  />
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div
              style={{
                fontWeight: "bold",
                fontSize: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 32,
                marginTop: 64,
                color: "#502824",
              }}
            >
              Which looks nicer?
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 128,
              }}
            >
              {!isLoading && (
                <>
                  <FontCard
                    letter={currentLetter}
                    font={currentFontPair[0]}
                    onClick={() => {
                      vote(currentLetter, currentFontPair[0]);
                    }}
                  />
                  <FontCard
                    letter={currentLetter}
                    font={currentFontPair[1]}
                    onClick={() => {
                      vote(currentLetter, currentFontPair[1]);
                    }}
                  />
                </>
              )}
            </div>

            {answeredQuestions > 0 && (
              <div style={{ marginTop: 32, textAlign: "center" }}>
                You have voted on{" "}
                <span style={{ fontVariantNumeric: "tabular-nums" }}>
                  {answeredQuestions}
                </span>{" "}
                fonts. {answeredQuestions > 20 && " Nice!"}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
