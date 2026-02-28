export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border mt-auto">
            <div className="mx-auto w-full px-4 md:px-8 max-w-7xl py-16 flex flex-col md:flex-row items-center justify-between gap-8">
                <p className="text-sm text-textSecondary dark:text-textMuted">
                    © {currentYear} Lespa. All rights reserved.
                </p>

                <div className="flex items-center gap-8 md:gap-24">
                    <a href="#" className="text-sm text-textSecondary hover:text-primary dark:hover:text-accentSecondary transition-colors">
                        Twitter
                    </a>
                    <a href="#" className="text-sm text-textSecondary hover:text-primary dark:hover:text-accentSecondary transition-colors">
                        GitHub
                    </a>
                    <a href="#" className="text-sm text-textSecondary hover:text-primary dark:hover:text-accentSecondary transition-colors">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}
