import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "border-zinc-800 bg-zinc-900/90 text-zinc-200 font-sans",
        secondary:
          "border-zinc-850 bg-zinc-950 text-zinc-400 font-sans",
        destructive:
          "border-rose-900/50 bg-rose-950/30 text-rose-400",
        outline:
          "text-zinc-400 border-white/[0.08] bg-transparent",
        success:
          "border-zinc-800/60 bg-zinc-950/30 text-zinc-400 font-mono",
        zk:
          "border-zinc-700 bg-zinc-900 text-white font-mono text-[10px] tracking-tight",
        privacy:
          "border-zinc-800 bg-zinc-900 text-zinc-300 font-mono text-[10px]",
        institutional:
          "border-zinc-800 bg-black text-zinc-400 uppercase tracking-widest font-mono text-[9px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
