"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { languages, type Language } from "@/lib/i18n"

export default function FloatingLanguageSelector() {
  const { currentLang, setCurrentLang } = useLanguage()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-luxury-black/90 backdrop-blur-sm rounded-full p-2 border border-luxury-gold/30 shadow-lg">
        <select
          value={currentLang}
          onChange={(e) => setCurrentLang(e.target.value as Language)}
          className="bg-transparent text-luxury-gold border-none outline-none cursor-pointer font-semibold text-sm min-w-[120px]"
        >
          {Object.entries(languages).map(([code, lang]) => (
            <option key={code} value={code} className="bg-luxury-black text-luxury-gold">
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
