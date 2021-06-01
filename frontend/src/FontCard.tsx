export const FontCard: React.FC<{
  letter: string;
  font: string;
  onClick: () => void;
}> = (props) => {
  return (
    <button
      onClick={props.onClick}
      style={{
        userSelect: "none",
        cursor: "pointer",
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
