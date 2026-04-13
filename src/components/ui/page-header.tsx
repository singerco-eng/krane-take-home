import * as React from "react";

import { cn } from "@/lib/utils";

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "border-b border-border/50 bg-gradient-card/80 backdrop-blur-sm shadow-glow",
        className,
      )}
      {...props}
    />
  ),
);

PageHeader.displayName = "PageHeader";

const PageHeaderContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between", className)}
    {...props}
  />
));

PageHeaderContent.displayName = "PageHeaderContent";

const PageHeaderTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title: string;
    description?: string;
  }
>(({ className, title, description, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props}>
    <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
    {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
  </div>
));

PageHeaderTitle.displayName = "PageHeaderTitle";

export { PageHeader, PageHeaderContent, PageHeaderTitle };
