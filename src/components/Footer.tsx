import { Github as IconGithub } from "lucide-react";

export function Footer() {
  return (
    <footer className="p-4 pb-0 text-center">
      <a
        href="https://github.com/Briggybros/runpace.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all shadow-sm"
      >
        <IconGithub className="h-3.5 w-3.5" />
        <span>View on GitHub</span>
      </a>
    </footer>
  );
}
