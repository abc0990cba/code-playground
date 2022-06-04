import MathJax from "react-mathjax2";

//asciimath.org/
//how to input formula

export const Formula = ({formula}) => {
  const content = `$$${formula}$$`;
  return (
      <MathJax.Text text={content} />
  );
};
