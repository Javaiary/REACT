import "./globals.css";
import Link from 'next/link';
import {Control} from './Control';


export const metadata = {
  title: "Web Tutorials",
  description: "go go nextapp",
};

export default async function RootLayout({ children }) {
    const resp = await fetch(`http://localhost:9999/topics`, {next: 'no-store'});
    const topics = await resp.json();
  return (
      <html>
        <body>
          <h1><Link href="/">WEB</Link></h1>
          <ol>
            {topics.map((topic) => {
              return <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
            })}
          </ol>
          {children}
          <Control></Control>
        </body>
      </html>
  );
}
