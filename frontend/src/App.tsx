import React, { useState } from "react";
import "./App.css";

const FontCard: React.FC<{
  letter: string;
  font: string;
  onClick: () => void;
}> = (props) => {
  return (
    <button
      onClick={props.onClick}
      style={{
        width: 128,
        height: 128,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 64,
        borderRadius: 8,
        background: "white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.06)",
        margin: 8,
        border: 0,
        color: "#502824",
        fontFamily: props.font,
      }}
    >
      {props.letter}
    </button>
  );
};

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
];
function getRandomFont() {
  return fonts[(Math.random() * fonts.length) | 0];
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const [answeredQuestions, setAnsweredQuestions] = useState(
    +(window.localStorage.getItem("voteCount") || 0) || 0
  );
  const [currentLetter, setCurrentLetter] = useState(getRandomLetter());
  const [isLoading, setIsLoading] = useState(false);
  const [currentFontPair, setCurrentFontPair] = useState([
    getRandomFont(),
    getRandomFont(),
  ]);

  const vote = async (letter: string, font: string) => {
    setIsLoading(true);
    setAnsweredQuestions((old) => {
      const value = old + 1;
      window.localStorage.setItem("voteCount", "" + value);
      return value;
    });
    try {
      await delay(500);
      await fetch("localhost:5000", {
        method: "POST",
        body: JSON.stringify({
          letter,
          font,
        }),
      });
    } catch {
    } finally {
      setIsLoading(false);
      setCurrentLetter(getRandomLetter());
      setCurrentFontPair([getRandomFont(), getRandomFont()]);
    }
  };

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
        <span style={{ fontWeight: "bold" }}>topfont</span>
        <span style={{ opacity: 0.5 }}>.github.io</span>
      </div>
      <div
        style={{
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <p style={{ marginBottom: 32 }}>
          Topfont is a community-sourced project to find the best combination
          font, the <b>Topfont</b>. It works pitting glyphs from various fonts
          against eachother 1-on-1, and synthesises a whole new font that uses
          the most popular glyphs from all fonts for each letter.
        </p>

        <p
          style={{
            paddingLeft: 32,
            paddingRight: 32,
          }}
        >
          <a href="">View the Topfont in all it's glory.</a>
        </p>
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
      </div>
    </div>
  );
}

export default App;
