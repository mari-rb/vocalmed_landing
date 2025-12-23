"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "../../hooks/use-theme";
import { cn } from "../../lib/utils";

interface ThemeToggleProps {
  variant?: "icon" | "button";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { toggleTheme, mounted, theme } = useTheme();

  // Evita flash de conteúdo não estilizado
  if (!mounted) {
    return <div className={cn("h-10 w-10", className)} />;
  }

  const currentTheme =
    theme === "system"
      ? typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  if (variant === "button") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={cn("h-10 w-10", className)}
        aria-label={
          currentTheme === "dark"
            ? "Mudar para modo claro"
            : "Mudar para modo escuro"
        }
        title={
          currentTheme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
        }
      >
        {currentTheme === "dark" ? (
          <Sun className="h-5 w-5 text-[#5e5e5e] dark:text-[#f4f4f4]" />
        ) : (
          <Moon className="h-5 w-5 text-[#5e5e5e] dark:text-[#f4f4f4]" />
        )}
      </Button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-[#f4f4f4] dark:hover:bg-[#2a2a2a]",
        className
      )}
      aria-label={
        currentTheme === "dark"
          ? "Mudar para modo claro"
          : "Mudar para modo escuro"
      }
      title={
        currentTheme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
      }
    >
      {currentTheme === "dark" ? (
        <Sun className="h-5 w-5 text-[#5e5e5e] dark:text-[#f4f4f4]" />
      ) : (
        <Moon className="h-5 w-5 text-[#5e5e5e] dark:text-[#f4f4f4]" />
      )}
    </button>
  );
}
