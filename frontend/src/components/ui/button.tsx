import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-40 cursor-pointer active:scale-[0.98] select-none",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-zinc-200 font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.08)] border border-white/20",
        destructive:
          "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20",
        outline:
          "border border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-200 hover:text-white backdrop-blur-sm",
        secondary:
          "bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border border-zinc-800 shadow-sm",
        ghost:
          "text-zinc-400 hover:text-white hover:bg-zinc-900/60",
        link:
          "text-white underline-offset-4 hover:underline",
        glow:
          "bg-white text-black font-semibold hover:bg-zinc-200 shadow-[0_0_25px_rgba(255,255,255,0.18)] border border-white",
        institutional:
          "bg-zinc-950 text-zinc-200 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 font-mono text-xs",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 text-sm sm:text-base",
        icon: "h-9 w-9 p-0",
        "icon-sm": "h-7 w-7 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
