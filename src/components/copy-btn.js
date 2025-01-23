'use client';

import { Check } from 'lucide-react';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);

  const onCopyText = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return copied ? (
    <button
      className="text-green-600"
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
        fontSize: '12px',
        zIndex: 1,
      }}
    >
      <Check />
    </button>
  ) : (
    <CopyToClipboard text={code} onCopy={onCopyText}>
      <button
        className="dark:text-blue-400 text-slate-100"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          border: 'none',
          borderRadius: '5px',
          padding: '5px 10px',
          cursor: 'pointer',
          fontSize: '12px',
          zIndex: 1,
        }}
      >
        <Copy />
      </button>
    </CopyToClipboard>
  );
}
