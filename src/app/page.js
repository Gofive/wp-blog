import Image from 'next/image';
import Markdown from 'react-markdown';
import fs from 'fs';
import path from 'path';
import { getBlogs } from '@/lib/read-md';

const files = await getBlogs();
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          height={0}
          width={0}
          style={{ width: 180, height: 'auto' }}
          priority
        />
        <ol className="font-mono font-semibold list-inside list-decimal text-sm text-center sm:text-left">
          <li className="mb-2">
            Get started by editing{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code>
            .
          </li>

          {files?.map((file, index) => (
            <li key={index} className="">
              {file}
            </li>
          ))}
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
