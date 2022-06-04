import MathJax from "react-mathjax2";

export function FormulaHOC({ children }) {
  return (
    <MathJax.Context
      input="ascii"
      onLoad={() => console.log("Loaded MathJax script!")}
      onError={(MathJax, error) => {
        console.warn(error);
        console.log("Encountered a MathJax error, re-attempting a typeset!");
        MathJax.Hub.Queue(MathJax.Hub.Typeset());
      }}
      script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
      options={{
        asciimath2jax: {
          useMathMLspacing: true,
          delimiters: [["$$", "$$"]],
          preview: "none",
        },
      }}
    >
      {children}
    </MathJax.Context>
  );
}
