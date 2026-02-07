import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { toast } from "sonner";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggle = () => {
    if (theme === "dark") {
      toast.info("Essa funcionalidade ainda está em desenvolvimento, pode estar meio bugado rsrs");
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-11 h-11 rounded-xl border border-border animate-pulse bg-muted/50" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center justify-center w-11 h-11 rounded-xl border border-border hover:bg-muted active:bg-accent transition-colors touch-manipulation"
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-foreground" strokeWidth={2} />
      ) : (
        <Moon className="w-5 h-5 text-foreground" strokeWidth={2} />
      )}
    </button>
  );
}
