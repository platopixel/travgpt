import Head from 'next/head';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState();

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
        } catch (error) {}
    }

    return (
        <div>
            <Head>
                <title>TravGPT</title>
            </Head>

            <main className={styles.main}>
                <h3>TravGPT</h3>
                <div className={styles.body}>
                    <form onSubmit={onSubmit}>
                        <textarea
                            type="text"
                            name="userInput"
                            placeholder=""
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <input type="submit" value="Prompt" />
                    </form>
                    <div className={styles.result}>{result}</div>
                </div>
            </main>
        </div>
    );
}
