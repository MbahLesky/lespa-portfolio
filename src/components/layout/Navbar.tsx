import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-8 flex h-16 items-center justify-between">
                <div className="flex items-center gap-8 md:gap-24">
                    <Link href="/" className="mr-8 md:mr-32">
                        <span className="font-heading text-xl md:text-2xl font-extrabold text-primary dark:text-accentSecondary">LESPA</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8 lg:gap-32">
                        <a href="#services" className="text-sm font-medium text-textSecondary hover:text-primary dark:hover:text-accentSecondary transition-colors">
                            Services
                        </a>
                        <a href="#work" className="text-sm font-medium text-textSecondary hover:text-primary dark:hover:text-accentSecondary transition-colors">
                            Work
                        </a>
                        <a href="#process" className="text-sm font-medium text-textSecondary hover:text-primary dark:hover:text-accentSecondary transition-colors">
                            Process
                        </a>
                    </nav>
                </div>

                <div className="flex items-center gap-4 md:gap-16">
                    <ThemeToggle />
                    <Button asChild variant="default" size="sm">
                        <a href="#contact">Contact</a>
                    </Button>
                </div>
            </div>
        </header>
    );
}
