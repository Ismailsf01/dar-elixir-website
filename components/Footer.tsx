"use client"

import { useState } from 'react';
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Music } from "lucide-react"
import { getTranslation, languages } from "@/lib/i18n"
import { useLanguage } from "@/contexts/LanguageContext"
import { TiktokIcon } from "./ui/TiktokIcon"
import Image from "next/image";

export default function Footer() {
  const { currentLang, isRTL } = useLanguage()
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) => getTranslation(currentLang, key)
  /* const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        alert("Thank you for subscribing!");
        setEmail('');
      } else {
        throw new Error("Subscription failed.");
      }
    } catch (error) {
      alert("Oops! Something went wrong.");
    } finally {
      setIsSubscribing(false);
    }
  }; */

  return (
    <footer className={`bg-luxury-black text-luxury-gold ${isRTL ? "rtl" : "ltr"}`} dir={languages[currentLang].dir}>
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
            {/*<h3 className="text-2xl font-bold text-gradient-gold font-serif">
              {currentLang === "ar" ? "عطور لوكس" : "Luxe Parfums"}
            </h3>*/}
            <Image
              src="/Main_icon.png"
              alt="Dar Elixir Logo"
              width={140}
              height={79}
            />
            <p className={`text-luxury-gold/80 ${isRTL ? "font-arabic" : ""}`}>
              {currentLang === "en" &&
                "Our mission is to make the world of luxury fragrance accessible to all. We believe everyone deserves the confidence of a signature scent, and Dar Elixir provides an elegant way to discover yours."}
              {currentLang === "fr" &&
                "Notre mission est de rendre le monde de la haute parfumerie accessible à tous. Nous croyons que chacun mérite la confiance d'une signature olfactive, et Dar Elixir offre une voie élégante pour découvrir la vôtre."}
              {currentLang === "ar" &&
                "مهمتنا هي جعل عالم العطور الفاخرة في متناول الجميع. نؤمن بأن كل شخص يستحق الثقة التي يمنحها العطر المميز، ودار الإكسير يقدم لكم الطريق الأمثل لاكتشاف عطركم الخاص."}
            </p>
            <div className={`flex space-x-4 ${isRTL ? "space-x-reverse" : ""}`}>
              <Button
                variant="ghost"
                size="sm"
                className="text-luxury-gold/80 hover:text-luxury-gold-light hover:bg-luxury-gold/10"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-luxury-gold/80 hover:text-luxury-gold-light hover:bg-luxury-gold/10"
              >
                {/*<Music className="w-5 h-5" />*/}
                <TiktokIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`space-y-4 ${isRTL ? "text-right font-arabic" : "text-left"}`}>
            <h4 className="text-lg font-semibold text-luxury-gold-light">
              {currentLang === "en" && "Quick Links"}
              {currentLang === "fr" && "Liens Rapides"}
              {currentLang === "ar" && "روابط سريعة"}
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/products" className="text-luxury-gold/80 hover:text-luxury-gold-light transition-colors">
                {t("products")}
              </Link>
              <Link href="/contact" className="text-luxury-gold/80 hover:text-luxury-gold-light transition-colors">
                {t("contact")}
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className={`space-y-4 ${isRTL ? "text-right font-arabic" : "text-left"}`}>
            <h4 className="text-lg font-semibold text-luxury-gold-light">
              {currentLang === "en" && "Customer Service"}
              {currentLang === "fr" && "Service Client"}
              {currentLang === "ar" && "خدمة العملاء"}
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/shipping" className="text-luxury-gold/80 hover:text-luxury-gold-light transition-colors">
                {currentLang === "en" && "Shipping Info"}
                {currentLang === "fr" && "Info Livraison"}
                {currentLang === "ar" && "معلومات الشحن"}
              </Link>

              <Link href="/faq" className="text-luxury-gold/80 hover:text-luxury-gold-light transition-colors">
                FAQ
              </Link>
              <Link href="/support" className="text-luxury-gold/80 hover:text-luxury-gold-light transition-colors">
                {currentLang === "en" && "Support"}
                {currentLang === "fr" && "Support"}
                {currentLang === "ar" && "الدعم"}
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          {/* <div className={`space-y-4 ${isRTL ? "text-right font-arabic" : "text-left"}`}>
            <h4 className="text-lg font-semibold text-luxury-gold-light">
              {currentLang === "en" && "Stay Updated"}
              {currentLang === "fr" && "Restez Informé"}
              {currentLang === "ar" && "ابق على اطلاع"}
            </h4>
            <p className="text-luxury-gold/80 text-sm">{t("newsletterDescription")}</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder={t("enterEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`bg-luxury-black-light border-luxury-gold/30 text-luxury-gold placeholder-luxury-gold/60 focus:border-luxury-gold ${isRTL ? "text-right" : ""}`}
              />
              <Button type="submit" disabled={isSubscribing} className="w-full luxury-button-gold">
                {isSubscribing ? t("subscribing") : t("subscribe")}
              </Button>
            </form>
          </div> */}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-luxury-gold/20">
        <div className="container mx-auto px-4 py-6">
          <div
            className={`flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 ${isRTL ? "md:flex-row-reverse font-arabic" : ""}`}
          >
            <div className="text-luxury-gold/80 text-sm">
              © {new Date().getFullYear()} {currentLang === "ar" ? "دار الإكسير" : "Dar Elixir"}.
              {currentLang === "en" && " All rights reserved."}
              {currentLang === "fr" && " Tous droits réservés."}
              {currentLang === "ar" && " جميع الحقوق محفوظة."}
            </div>
            <div className={`flex space-x-6 text-sm ${isRTL ? "space-x-reverse" : ""}`}>
              <Link href="/privacy" className="text-luxury-gold/80 hover:text-luxury-gold-light transition-colors">
                {currentLang === "en" && "Privacy Policy"}
                {currentLang === "fr" && "Politique de Confidentialité"}
                {currentLang === "ar" && "سياسة الخصوصية"}
              </Link>
              <Link href="/terms" className="text-luxury-gold/80 hover:text-luxury-gold-light transition-colors">
                {currentLang === "en" && "Terms of Service"}
                {currentLang === "fr" && "Conditions de Service"}
                {currentLang === "ar" && "شروط الخدمة"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
