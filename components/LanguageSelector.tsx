"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { languages, type Language } from "@/lib/i18n"
import { useLanguage } from "@/contexts/LanguageContext"

export default function LanguageSelector() {
  const { currentLang, setCurrentLang } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-luxury-gold hover:text-luxury-gold-light">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{languages[currentLang].flag}</span>
          <span className="hidden md:inline">{languages[currentLang].name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-luxury-black border-luxury-gold/20">
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setCurrentLang(code as Language)}
            className={`gap-3 cursor-pointer text-luxury-gold hover:text-luxury-gold-light hover:bg-luxury-black-light ${
              currentLang === code ? "bg-luxury-black-medium" : ""
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className={lang.dir === "rtl" ? "font-arabic" : ""}>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
