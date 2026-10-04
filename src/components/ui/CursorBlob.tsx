"use client";

import { useEffect, useRef } from "react";

/**
 * Soft warm blob that follows the mouse on desktop.
 * Uses requestAnimationFrame with lerp smoothing for fluid motion.
 * Hidden on touch / small screens via CSS media query.
 */
export function CursorBlob() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        el.classList.add("is-visible");
        visible = true;
      }
    };

    const onLeave = () => {
      el.classList.remove("is-visible");
      visible = false;
    };

    const tick = () => {
      x += (mouseX - x) * 0.12;
      y += (mouseY - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden className="cursor-blob" />;
}
