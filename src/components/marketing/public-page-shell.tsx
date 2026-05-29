import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface PublicPageShellProps {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
  heroClassName?: string;
}

export function PublicPageShell({
  eyebrow,
  title,
  description,
  children,
  heroClassName,
}: PublicPageShellProps) {
  return (
    <div className="bg-background text-foreground">
      <section
        className={cn(
          "relative overflow-hidden border-b bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-20 text-white md:px-10",
          heroClassName,
        )}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-12 top-10 h-32 w-32 rounded-full bg-cyan-400 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-blue-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl space-y-4">
          {eyebrow ? (
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
            {description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-6 py-12 md:px-10 md:py-16">
        {children}
      </div>
    </div>
  );
}

interface PublicSectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PublicSectionHeading({
  eyebrow,
  title,
  description,
}: PublicSectionHeadingProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {description ? (
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
