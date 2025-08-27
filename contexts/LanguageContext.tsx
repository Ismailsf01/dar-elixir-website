"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, languages } from "@/lib/i18n"

interface LanguageContextType {
  currentLang: Language
  setCurrentLang: (lang: Language) => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>("fr") // French as default

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("preferred-language") as Language
    if (savedLang && savedLang in languages) {
      setCurrentLang(savedLang)
    }
  }, [])

  // Save language preference and update document direction
  useEffect(() => {
    localStorage.setItem("preferred-language", currentLang)
    document.documentElement.dir = languages[currentLang].dir
    document.documentElement.lang = currentLang
  }, [currentLang])

  const isRTL = languages[currentLang].dir === "rtl"

  return <LanguageContext.Provider value={{ currentLang, setCurrentLang, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
