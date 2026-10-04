export default function MarkdownText({
  text = "",
}) {
  return (
    <div >
      {text.split("\n").map((line, i) => (
        <p className="my-[9px] text-[13px] leading-[1.7] text-[#c6cedc]" key={i}>
          {line || "\u00a0"}
        </p>
      ))}
    </div>
  );
}