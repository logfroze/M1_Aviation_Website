import React from "react";
import Link from "next/link";

interface ParallelogramButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "white" | "silver" | "shiny-silver" | "gold" | "black";
  className?: string;
  isExternal?: boolean;
}

export default function ParallelogramButton({
  children,
  href,
  onClick,
  variant = "white",
  className = "",
  isExternal = false,
}: ParallelogramButtonProps) {
  const variantStyles = {
    white: "bg-white text-black hover:bg-zinc-100 hover:text-black border-white shadow-[0_4px_16px_rgba(255,255,255,0.25)]",
    black: "bg-black text-white hover:bg-zinc-900 hover:text-white border-zinc-800 shadow-[0_4px_16px_rgba(0,0,0,0.6)]",
    silver: "bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300 text-black hover:from-white hover:via-zinc-200 hover:to-white border-zinc-300 shadow-[0_0_20px_rgba(255,255,255,0.25)]",
    "shiny-silver": "bg-gradient-to-r from-zinc-300 via-white to-zinc-300 text-zinc-950 hover:from-white hover:via-zinc-100 hover:to-white border-white/90 shadow-[0_0_25px_rgba(255,255,255,0.45)] hover:shadow-[0_0_35px_rgba(255,255,255,0.75)]",
    gold: "bg-[#D4AF37] text-black hover:bg-[#E5C158] border-[#D4AF37]",
  };

  const baseClasses = `relative inline-flex items-center justify-center px-7 py-3 font-semibold text-xs tracking-wider uppercase transition-all duration-200 -skew-x-12 border select-none group shadow-sm active:scale-95 ${variantStyles[variant]} ${className}`;

  const content = <span className="inline-block skew-x-12">{children}</span>;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className={baseClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}
