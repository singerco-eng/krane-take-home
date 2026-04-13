import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-1 rounded-full border text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        filter: "border-border bg-card/70 text-foreground hover:bg-card",
        assist: "border-primary-muted/30 bg-primary-muted/15 text-foreground",
        suggestion: "border-accent/30 bg-accent/10 text-foreground",
      },
      size: {
        sm: "h-6 px-2",
        md: "h-8 px-3",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "filter",
      size: "sm",
    },
  },
);

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  removable?: boolean;
  onRemove?: () => void;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, size, removable, onRemove, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(chipVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {removable ? (
        <X
          className="h-3 w-3"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onRemove?.();
          }}
        />
      ) : null}
    </button>
  ),
);

Chip.displayName = "Chip";

export { Chip, chipVariants };
