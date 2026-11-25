"use client";

import { useEffect, useRef, useState } from "react";

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
      aria-expanded={open}
      aria-controls="site-navigation-links"
      onClick={() => setOpen(value => !value)}
    >
      Menu <span className="navigation-chevron" aria-hidden="true" />
    </button>
    <div id="site-navigation-links" className="navigation-dropdown" hidden={!open}>
      <a href="/#research" onClick={() => setOpen(false)}>Research</a>
      <a href="/#team" onClick={() => setOpen(false)}>Team</a>
      <a href="/#join-us" onClick={() => setOpen(false)}>Join us</a>
    </div>
  </nav>;
}
