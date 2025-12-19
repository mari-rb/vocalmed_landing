import * as React from "react";
import {
  ButtonVariant,
  getButtonVariant,
  type ButtonSize,
} from "../../lib/variants";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild,
      children,
      ...props
    },
    ref
  ) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement,
        {
          className: cn(getButtonVariant(variant, size, className)),
          ...props,
        } as React.HtmlHTMLAttributes<HTMLElement>
      );
    }

    return (
      <button
        className={cn(getButtonVariant(variant, size, className))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
