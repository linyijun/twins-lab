"use client";

import { useEffect, useRef, useState } from "react";
import { sitePath } from "../lib/site";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const navigation = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOutside(event: PointerEvent) {
      if (!navigation.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      toggle.current?.focus();
    }

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return <nav
    ref={navigation}
    className="site-navigation"
    aria-label="Main navigation"
    onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}
  >
    <button
      ref={toggle}
      className="navigation-toggle"
      type="button"
      aria-label="Toggle navigation"
      aria-expanded={open}
      aria-controls="site-navigation-links"
      onClick={() => setOpen(value => !value)}
    >
      <svg className="navigation-chevron" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path d="m4 7 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
    <div id="site-navigation-links" className="navigation-dropdown" hidden={!open}>
      <a href={sitePath("/#research")} onClick={() => setOpen(false)}>Research</a>
      <a href={sitePath("/#team")} onClick={() => setOpen(false)}>Team</a>
      <a href={sitePath("/#join-us")} onClick={() => setOpen(false)}>Join us</a>
    </div>
  </nav>;
}
