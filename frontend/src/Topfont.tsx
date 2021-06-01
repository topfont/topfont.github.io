export const Topfont: React.FC<{ text: string; topfont: any }> = (props) => (
  <>
    {props.text.split("").map((x, i) => (
      <span key={i} style={{ fontFamily: props.topfont[x] }}>
        {x}
      </span>
    ))}
  </>
);
