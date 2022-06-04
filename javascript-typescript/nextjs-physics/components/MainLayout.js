import Head from "next/head";
import Link from "next/link";
import styles from "../styles/MainLayout.module.css";

export function MainLayout({ children, title }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title} | physics</title>
        <meta name="keywords" content="HTML, js, nextjs, heat, equation" />
        <meta name="description" content="heat equation physics" />
        <meta charSet="utf-8" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      
        <nav className="blue darken-4">
          <Link href={"/"}>
            <a>Home</a>
          </Link>
          <Link href={"/heatequation"}>
            <a>Heat Equation</a>
          </Link>
          <Link href={"/about"}>
            <a>About</a>
          </Link>
        </nav>

        <main>{children}</main>
     
      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" />
        </a>
      </footer> */}
    </div>
  );
}
