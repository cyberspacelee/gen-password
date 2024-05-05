'use client';
import { LucideCheck, LucideClipboard } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useGenPass } from '@/lib/store';

const PasswdContent = () => {
  const [copied, setCopied] = useState(false);
  const password = useGenPass((state) => state.password);

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(password);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="relative">
      <input
        readOnly
        className="h-12 w-full rounded-lg
             border pl-4 font-semibold text-slate-500 focus:outline-none"
        type="text"
        value={password}
        placeholder="Generated Password"
      />
      <Button
        onClick={copyToClipboard}
        size="icon"
        variant={'outline'}
        className="absolute end-4 top-1/2 h-8 w-8 -translate-y-1/2 p-2"
        asChild
      >
        {copied ? <LucideCheck /> : <LucideClipboard />}
      </Button>
    </div>
  );
};

export default PasswdContent;
