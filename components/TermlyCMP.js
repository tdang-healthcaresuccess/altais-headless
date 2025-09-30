'use client';

import { useEffect, useMemo, useRef } from 'react';

const SCRIPT_SRC_BASE = 'https://app.termly.io';

export default function TermlyCMP({ websiteUUID, autoBlock, masterConsentsOrigin }) {
  const scriptSrc = useMemo(() => {
    const src = new URL(SCRIPT_SRC_BASE);
    src.pathname = `/resource-blocker/${websiteUUID}`;
    if (autoBlock) src.searchParams.set('autoBlock', 'on');
    if (masterConsentsOrigin) src.searchParams.set('masterConsentsOrigin', masterConsentsOrigin);
    return src.toString();
  }, [autoBlock, masterConsentsOrigin, websiteUUID]);

  const isScriptAdded = useRef(false);

  useEffect(() => {
    if (isScriptAdded.current) return;
    const script = document.createElement('script');
    script.src = scriptSrc;
    document.head.appendChild(script);
    isScriptAdded.current = true;
  }, [scriptSrc]);

  useEffect(() => {
    window.Termly?.initialize();
  }, []);

  return null;
}
