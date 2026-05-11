"use client"

import { useEffect, useSyncExternalStore } from "react"

export type ThemeMode = "light" | "dark"

const themeEvent = "portfolio-theme-change"

function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light"
  }

  const stored = window.localStorage.getItem("theme")

  if (stored === "light" || stored === "dark") {
    return stored
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function syncDocumentTheme(theme: ThemeMode) {
  if (typeof document === "undefined") {
    return
  }

  document.documentElement.classList.toggle("dark", theme === "dark")
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {}
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)")
  const notify = () => onStoreChange()
  const notifySystemChange = () => {
    if (!window.localStorage.getItem("theme")) {
      notify()
    }
  }

  window.addEventListener(themeEvent, notify)
  window.addEventListener("storage", notify)
  media.addEventListener("change", notifySystemChange)

  return () => {
    window.removeEventListener(themeEvent, notify)
    window.removeEventListener("storage", notify)
    media.removeEventListener("change", notifySystemChange)
  }
}

function getServerSnapshot(): ThemeMode {
  return "light"
}

export function setTheme(theme: ThemeMode) {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem("theme", theme)
  syncDocumentTheme(theme)
  window.dispatchEvent(new Event(themeEvent))
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    getPreferredTheme,
    getServerSnapshot
  )

  useEffect(() => {
    syncDocumentTheme(theme)
  }, [theme])

  return {
    theme,
    isDark: theme === "dark",
    setTheme,
    toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
  }
}
