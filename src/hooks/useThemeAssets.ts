"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function useThemeAssets() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const symbolPath =
            theme === "dark"
                ? "/assets/logos/dark-theme/Lespa/Symbol.svg"
                : "/assets/logos/light-theme/Symbol.svg";
        document.body.style.cursor = `url(${symbolPath}) 16 16, auto`;
    }, [theme, mounted]);

    const logoSrc =
        mounted && theme === "dark"
            ? "/assets/logos/dark-theme/Lespa/Wordmark.svg"
            : "/assets/logos/light-theme/Wordmark.svg";

    return { logoSrc, mounted };
}
