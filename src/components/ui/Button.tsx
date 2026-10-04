import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b3e8f]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f9f6ee]";

const variants: Record<Variant, string> = {
  // Brand navy with warm amber→orange glow on hover
  primary:
    "text-white bg-[linear-gradient(120deg,#1b3e8f_0%,#3b5fb8_100%)] glow-warm hover:brightness-110 hover:scale-[1.02]",
  secondary:
    "text-[#16161d] glass gradient-stroke hover:bg-white hover:scale-[1.02] glow-brand",
  ghost: "text-[#4a4a55] hover:text-[#16161d] hover:bg-black/[0.04]",
  whatsapp:
    "text-white bg-[#25D366] hover:bg-[#22c55e] shadow-[0_8px_30px_-6px_rgba(37,211,102,0.55)] hover:scale-[1.02]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined } & ComponentProps<"button">)
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    const { href, ...linkProps } = rest;
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = rest as ComponentProps<"button"> & {
    href?: undefined;
  };
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
