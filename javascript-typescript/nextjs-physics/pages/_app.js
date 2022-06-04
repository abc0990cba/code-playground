import '../styles/globals.css'
import NextNprogress from "nextjs-progressbar";
import {FormulaHOC} from "../components/FormulaHOC"

// export const ConditionContext = React.createContext({
//   typeCoefA: 2,
//   typeF: 2,
//   typeFi: 2,
//   typeMu1: 2,
//   typeMu2: 2,
//   condition: [2, 2, 2, 2, 2],
//   changeCondition: (type, value) => {
//     this[type] = value
//   },
// });


function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress
        color="yellow"
        startPosition={0.4}
        stopDelayMs={100}
        height={4}
      />
      
      <FormulaHOC>
        <Component {...pageProps} />
      </FormulaHOC>
    </>
  );
}

export default MyApp
