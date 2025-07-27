import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gradientHeadingVariants = cva(
  "font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
  {
    variants: {
      size: {
        sm: "text-2xl",
        default: "text-4xl",
        lg: "text-5xl",
        xl: "text-6xl",
        "2xl": "text-7xl",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      size: "default",
      align: "left",
    },
  }
);

interface GradientHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof gradientHeadingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const GradientHeading = React.forwardRef<
  HTMLHeadingElement,
  GradientHeadingProps
>(({ className, size, align, as: Component = "h1", ...props }, ref) => {
  return (
    <Component
      className={cn(gradientHeadingVariants({ size, align, className }))}
      ref={ref}
      {...props}
    />
  );
});
GradientHeading.displayName = "GradientHeading";

export { GradientHeading, gradientHeadingVariants };
