import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../../lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  width?: number;
  height?: number;
  variant?: string;
  showText?: boolean;
}

export function Logo({
  href = "/",
  className,
  width = 120,
  height = 40,
  variant = "auto",
  showText = false,
}: LogoProps) {
  const logoSrc = "/images/logo/vocalmed-logo.svg";

  const logoContent = (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src={logoSrc}
        alt="VocalMed logo"
        width={width}
        height={height}
        className="h-auto"
        priority
      />
      {showText && (
        <span className="text-xl font-bold text-[#007c79] dark:text-[#1fa093]"></span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-80">
        {logoContent}
      </Link>
    );
  }
}
