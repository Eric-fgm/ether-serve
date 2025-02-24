import Link from "next/link";

export default function Main() {
  return (
    <div className="container">
      <div className="chip">&#10003; Ultrafast & Lightweight</div>
      <h1 className="main-heading">
        Power Up Your Backend with
        <br /> Lightning-Fast <span className="stand-out">Node.js </span>
        Framework
      </h1>
      <p className="main-paragraph">
        Ether Serve is a lightweight and high-performance Node.js framework
        designed for building scalable APIs and real-time applications with
        ease.
      </p>
      <div className="flex">
        <button className="btn-primary">
          <Link href="/docs/installation" prefetch>
            Get Started &#8594;
          </Link>
        </button>
        <button className="btn-secondary">
          <a
            href="https://github.com/Eric-fgm/ether-serve"
            target="_blank"
            rel="noreferrer"
          >
            Source Code &#10003;
          </a>
        </button>
      </div>
    </div>
  );
}
