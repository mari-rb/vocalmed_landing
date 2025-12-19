import { type ClassValue } from "clsx";
import { cn } from "./utils";

/**
 * Variantes de botão usando a paleta VocalMed
 */
export const buttonVariants = {
  base: "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-medium focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    default: "bg-[#007c79] text-white hover:bg-[#1fa093] dark:bg-[#1fa093] dark:hover:bg-[#00ccbd]",
    primary: "bg-[#007c79] text-white hover:bg-[#1fa093] dark:bg-[#1fa093] dark:hover:bg-[#00ccbd]",
    secondary: "bg-[#f4f4f4] text-[#5e5e5e] hover:bg-[#919191] hover:text-white dark:bg-[#2a2a2a] dark:text-[#f4f4f4] dark:hover:bg-[#5e5e5e]",
    outline: "border border-[#007c79] bg-transparent text-[#007c79] hover:bg-[#007c79] hover:text-white dark:border-[#1fa093] dark:text-[#1fa093] dark:hover:bg-[#1fa093] dark:hover:text-white",
    ghost: "hover:bg-[#f4f4f4] text-[#5e5e5e] dark:hover:bg-[#2a2a2a] dark:text-[#f4f4f4]",
    destructive: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
  },
  sizes: {
    default: "h-10 px-6 py-2",
    sm: "h-9 rounded-md px-5 text-sm",
    lg: "h-12 rounded-md px-10 text-base",
    icon: "h-10 w-10",
  },
} as const;

/**
 * Variantes de badge usando a paleta VocalMed
 */
export const badgeVariants = {
  base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  variants: {
    default: "bg-[#007c79] text-white hover:bg-[#1fa093] dark:bg-[#1fa093] dark:text-white dark:hover:bg-[#00ccbd]",
    secondary: "bg-[#f4f4f4] text-[#5e5e5e] hover:bg-[#919191] hover:text-white dark:bg-[#2a2a2a] dark:text-[#f4f4f4] dark:hover:bg-[#5e5e5e]",
    outline: "text-[#007c79] border-[#007c79] dark:text-[#1fa093] dark:border-[#1fa093]",
    success: "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600",
    destructive: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
    accent: "bg-[#00ccbd] text-white hover:bg-[#1fa093] dark:bg-[#00ccbd] dark:hover:bg-[#1fa093]",
  },
} as const;

/**
 * Variantes de card usando a paleta VocalMed
 */
export const cardVariants = {
  base: "rounded-lg border border-[#f4f4f4] bg-white text-foreground shadow-sm dark:border-[#2a2a2a] dark:bg-[#1a1a1a]",
  padding: {
    default: "p-6",
    sm: "p-4",
    lg: "p-8",
    none: "p-0",
  },
} as const;

/**
 * Variantes de separador usando a paleta VocalMed
 */
export const separatorVariants = {
  base: "shrink-0 bg-[#f4f4f4] dark:bg-[#2a2a2a]",
  orientation: {
    horizontal: "h-[1px] w-full",
    vertical: "h-full w-[1px]",
  },
} as const;

/**
 * Função helper para combinar variantes de botão
 */
export function getButtonVariant(
  variant: keyof typeof buttonVariants.variants = "default",
  size: keyof typeof buttonVariants.sizes = "default",
  className?: ClassValue
) {
  return cn(
    buttonVariants.base,
    buttonVariants.variants[variant],
    buttonVariants.sizes[size],
    className
  );
}

/**
 * Função helper para combinar variantes de badge
 */
export function getBadgeVariant(
  variant: keyof typeof badgeVariants.variants = "default",
  className?: ClassValue
) {
  return cn(badgeVariants.base, badgeVariants.variants[variant], className);
}

/**
 * Função helper para combinar variantes de card
 */
export function getCardVariant(
  padding: keyof typeof cardVariants.padding = "default",
  className?: ClassValue
) {
  return cn(cardVariants.base, cardVariants.padding[padding], className);
}

/**
 * Função helper para combinar variantes de separador
 */
export function getSeparatorVariant(
  orientation: keyof typeof separatorVariants.orientation = "horizontal",
  className?: ClassValue
) {
  return cn(
    separatorVariants.base,
    separatorVariants.orientation[orientation],
    className
  );
}

/**
 * Tipos exportados para uso nos componentes
 */
export type ButtonVariant = keyof typeof buttonVariants.variants;
export type ButtonSize = keyof typeof buttonVariants.sizes;
export type BadgeVariant = keyof typeof badgeVariants.variants;
export type CardPadding = keyof typeof cardVariants.padding;
export type SeparatorOrientation = keyof typeof separatorVariants.orientation;