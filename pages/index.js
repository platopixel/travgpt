import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: input }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      console.log(data.result);
      setResult(data.result);
      setInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Story Generator 3001</title>
      </Head>

      <main className={styles.main}>
        <h3>Super Story Generator Plus 3001</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="userInput"
            placeholder="Enter details about the feature"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" value="Generate Story Description" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
