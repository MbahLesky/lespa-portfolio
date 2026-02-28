"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/shared/Button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="text-textSecondary" disabled>
                <span className="sr-only">Loading theme</span>
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-textSecondary hover:text-primary dark:hover:text-accentSecondary transition-colors"
        >
            <Sun className="h-24 w-24 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-24 w-24 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
