"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Shield,
  Settings,
  CheckCircle,
  Star,
  ArrowRight,
  Globe,
  Smartphone,
  Search,
  CreditCard,
  BarChart3,
  Headphones,
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation, languages } from "@/lib/i18n"
import FloatingLanguageSelector from "@/components/FloatingLanguageSelector"

export default function ServicesPage() {
  const { currentLang, isRTL } = useLanguage()
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) => getTranslation(currentLang, key)

  return (
    <div className={`min-h-screen ${isRTL ? "rtl" : "ltr"}`} dir={languages[currentLang].dir}>
      {/* Hero Section */}
      <section className="relative luxury-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/90 via-luxury-black/70 to-transparent"></div>
        <div className="absolute inset-0 shimmer"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-luxury-gold/20 text-luxury-gold border-luxury-gold/30">
              {t("webDevelopmentServices")}
            </Badge>
            <h1
              className={`text-4xl lg:text-6xl font-bold leading-tight font-serif mb-6 ${isRTL ? "font-arabic" : ""}`}
            >
              {t("servicesTitle")}
            </h1>
            <p
              className={`text-xl lg:text-2xl text-luxury-gold-muted leading-relaxed mb-8 max-w-3xl mx-auto ${isRTL ? "font-arabic" : ""}`}
            >
              {t("servicesSubtitle")}
            </p>
            <div className={`flex justify-center`}>
              <Button asChild size="lg" className="luxury-button-gold font-semibold">
                <a href="#contact-form">{t("getStarted")}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-gradient-to-b from-luxury-gold-muted to-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${isRTL ? "font-arabic" : ""}`}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-luxury-black font-serif">{t("whatWeOffer")}</h2>
            <p className="text-luxury-black/70 text-lg max-w-2xl mx-auto">{t("whatWeOfferDesc")}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="luxury-card border-2 border-luxury-gold/30 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-luxury-gold to-luxury-gold-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-10 h-10 text-luxury-black" />
                </div>
                <CardTitle className={`text-2xl lg:text-3xl font-bold text-luxury-black font-serif ${isRTL ? "font-arabic" : ""}`}>
                  {t("starterPackageTitle")}
                </CardTitle>
                <div className="text-3xl font-bold text-luxury-gold mt-2">{t("starterPackagePrice")}</div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className={`text-center text-luxury-black/70 text-lg ${isRTL ? "font-arabic" : ""}`}>
                  {t("starterPackageDesc")}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className={`font-semibold text-luxury-black text-lg ${isRTL ? "font-arabic" : ""}`}>
                      {t("coreFeatures")}
                    </h4>
                    <div className="space-y-3">
                      {["responsiveDesign", "productCatalog", "shoppingCart", "paymentIntegration", "orderManagement"].map((feature) => (
                        <div key={feature} className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                          <CheckCircle className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                          <span className={`text-luxury-black/80 ${isRTL ? "font-arabic" : ""}`}>
                            {t(feature as keyof typeof import("@/lib/i18n").translations.en)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className={`font-semibold text-luxury-black text-lg ${isRTL ? "font-arabic" : ""}`}>
                      {t("additionalServices")}
                    </h4>
                    <div className="space-y-3">
                      {["seoOptimization", "mobileOptimized", "securityFeatures", "analyticsSetup", "socialIntegration", "supportTraining"].map((service) => (
                        <div key={service} className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                          <CheckCircle className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                          <span className={`text-luxury-black/80 ${isRTL ? "font-arabic" : ""}`}>
                            {t(service as keyof typeof import("@/lib/i18n").translations.en)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-center pt-6 border-t border-luxury-gold/20">
                  <Button asChild size="lg" className="luxury-button-gold font-semibold">
                    <a href="#contact-form">{t("getQuote")}</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${isRTL ? "font-arabic" : ""}`}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-luxury-black font-serif">{t("whyChooseUs")}</h2>
            <p className="text-luxury-black/70 text-lg max-w-2xl mx-auto">{t("whyChooseUsDesc")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="luxury-card text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-luxury-gold to-luxury-gold-dark rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-luxury-black" />
                </div>
                <h3 className={`text-xl font-bold mb-4 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>{t("speedTitle")}</h3>
                <p className={`text-luxury-black/70 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>{t("speedDesc")}</p>
              </CardContent>
            </Card>
            <Card className="luxury-card text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-luxury-gold to-luxury-gold-dark rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-luxury-black" />
                </div>
                <h3 className={`text-xl font-bold mb-4 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>{t("securityTitle")}</h3>
                <p className={`text-luxury-black/70 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>{t("securityDesc")}</p>
              </CardContent>
            </Card>
            <Card className="luxury-card text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-luxury-gold to-luxury-gold-dark rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-10 h-10 text-luxury-black" />
                </div>
                <h3 className={`text-xl font-bold mb-4 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>{t("easyManagementTitle")}</h3>
                <p className={`text-luxury-black/70 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>{t("easyManagementDesc")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="py-16 bg-gradient-to-b from-luxury-gold-muted to-white">
  <div className="container mx-auto px-4">
    <div className={`text-center mb-12 ${isRTL ? "font-arabic" : ""}`}>
      <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-luxury-black font-serif">{t("ourWork")}</h2>
      <p className="text-luxury-black/70 text-lg max-w-2xl mx-auto">{t("ourWorkDesc")}</p>
    </div>

    <div className="max-w-5xl mx-auto">
      <Card className="luxury-card overflow-hidden shadow-2xl">
        <CardContent className="p-0">
          {/* v v v The grid class has been removed from this div v v v */}
          <div>
            {/* Image is now on top */}
            <div className="relative">
              <Image
                src="/screenshot.jpg"
                alt="Dar Elixir Perfume Website"
                width={1200} // Using a wider aspect ratio is fine now
                height={750}
                className="w-full h-auto object-cover" // h-auto lets the image keep its shape
              />
            </div>

            {/* Text is now below the image */}
            <div className={`p-8 lg:p-12 ${isRTL ? "text-right" : "text-left"}`}>
              <h3
                className={`text-2xl lg:text-3xl font-bold mb-4 text-luxury-black font-serif ${isRTL ? "font-arabic" : ""}`}
              >
                {t("darElixirTitle")}
              </h3>
              <p className={`text-luxury-black/70 mb-6 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                {t("darElixirDesc")}
              </p>
                    <Button asChild size="lg" className="luxury-button-gold font-semibold w-fit">
                      <Link href="/">
                        {t("viewLiveWebsite")}
                        <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2" : "ml-2"}`} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 luxury-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
        <div className="relative container mx-auto px-4">
          <div className={`text-center mb-12 ${isRTL ? "font-arabic" : ""}`}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif">{t("getInTouchTitle")}</h2>
            <p className="text-luxury-gold-muted text-lg max-w-2xl mx-auto">{t("servicesGetInTouchDesc")}</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="luxury-card bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className={`text-center text-luxury-black ${isRTL ? "font-arabic" : ""}`}>{t("contactFormTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className={`text-luxury-black ${isRTL ? "font-arabic" : ""}`}>{t("name")}</Label>
                    <Input id="name" placeholder={t("namePlaceholder")} className={`border-luxury-gold/30 focus:border-luxury-gold ${isRTL ? "text-right font-arabic" : ""}`} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className={`text-luxury-black ${isRTL ? "font-arabic" : ""}`}>{t("email")}</Label>
                    <Input id="email" type="email" placeholder={t("emailPlaceholder")} className={`border-luxury-gold/30 focus:border-luxury-gold ${isRTL ? "text-right font-arabic" : ""}`} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className={`text-luxury-black ${isRTL ? "font-arabic" : ""}`}>{t("message")}</Label>
                  <Textarea id="message" placeholder={t("messagePlaceholder")} rows={5} className={`border-luxury-gold/30 focus:border-luxury-gold ${isRTL ? "text-right font-arabic" : ""}`} />
                </div>
                <Button className="w-full luxury-button-gold font-semibold" size="lg">
                  {t("getFreeQuote")}
                </Button>
                <p className={`text-center text-luxury-black/60 text-sm ${isRTL ? "font-arabic" : ""}`}>{t("responseTime")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FloatingLanguageSelector />
    </div>
  )
}