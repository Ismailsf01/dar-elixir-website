"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation, languages } from "@/lib/i18n"
import FloatingLanguageSelector from "@/components/FloatingLanguageSelector"

export default function ContactPage() {
  const { currentLang, isRTL } = useLanguage()
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) => getTranslation(currentLang, key)

  return (
    <div className={`min-h-screen py-8 ${isRTL ? "rtl" : "ltr"}`} dir={languages[currentLang].dir}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 ${isRTL ? "font-arabic" : ""}`}>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-luxury-black font-serif">{t("getInTouch")}</h1>
          <p className="text-luxury-black/70 text-lg max-w-2xl mx-auto">{t("getInTouchDesc")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className={`text-luxury-black ${isRTL ? "text-right font-arabic" : "text-left"}`}>
                {t("sendMessage")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className={`text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                    {t("firstName")}
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    className={`border-luxury-gold/30 focus:border-luxury-gold ${isRTL ? "text-right font-arabic" : ""}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className={`text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                    {t("lastName")}
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className={`border-luxury-gold/30 focus:border-luxury-gold ${isRTL ? "text-right font-arabic" : ""}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={`text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className={`border-luxury-gold/30 focus:border-luxury-gold ${isRTL ? "text-right font-arabic" : ""}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className={`text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                  {t("phoneOptional")}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className={`border-luxury-gold/30 focus:border-luxury-gold ${isRTL ? "text-right font-arabic" : ""}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className={`text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                  {t("subject")}
                </Label>
                <Input
                  id="subject"
                  placeholder="How can we help you?"
                  className={`border-luxury-gold/30 focus:border-luxury-gold ${isRTL ? "text-right font-arabic" : ""}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className={`text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                  {t("message")}
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  className={`border-luxury-gold/30 focus:border-luxury-gold ${isRTL ? "text-right font-arabic" : ""}`}
                />
              </div>

              <Button className="w-full luxury-button-gold" size="lg">
                {t("sendMessageBtn")}
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="luxury-card">
              <CardContent className="p-6">
                <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold to-luxury-gold-dark rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-luxury-black" />
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h3 className={`font-semibold text-lg mb-2 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                      {t("visitOurStore")}
                    </h3>
                    <p className={`text-luxury-black/70 ${isRTL ? "font-arabic" : ""}`}>
                      123 Fragrance Avenue
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardContent className="p-6">
                <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold to-luxury-gold-dark rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-luxury-black" />
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h3 className={`font-semibold text-lg mb-2 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                      {t("callUs")}
                    </h3>
                    <p className={`text-luxury-black/70 ${isRTL ? "font-arabic" : ""}`}>
                      +1 (555) 123-4567
                      <br />
                      Toll-free: 1-800-PERFUME
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardContent className="p-6">
                <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold to-luxury-gold-dark rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-luxury-black" />
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h3 className={`font-semibold text-lg mb-2 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                      {t("emailUs")}
                    </h3>
                    <p className={`text-luxury-black/70 ${isRTL ? "font-arabic" : ""}`}>
                      info@perfumeshop.com
                      <br />
                      support@perfumeshop.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardContent className="p-6">
                <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold to-luxury-gold-dark rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-luxury-black" />
                  </div>
                  <div className={isRTL ? "text-right" : "text-left"}>
                    <h3 className={`font-semibold text-lg mb-2 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                      {t("businessHours")}
                    </h3>
                    <div className={`text-luxury-black/70 space-y-1 ${isRTL ? "font-arabic" : ""}`}>
                      <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                      <p>Saturday: 10:00 AM - 6:00 PM</p>
                      <p>Sunday: 12:00 PM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2
            className={`text-2xl font-bold text-center mb-8 text-luxury-black font-serif ${isRTL ? "font-arabic" : ""}`}
          >
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="luxury-card">
              <CardContent className="p-6">
                <h3 className={`font-semibold mb-2 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                  Do you offer samples?
                </h3>
                <p className={`text-luxury-black/70 ${isRTL ? "font-arabic" : ""}`}>
                  Yes! We offer 2ml samples of most fragrances. Perfect for trying before you buy.
                </p>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardContent className="p-6">
                <h3 className={`font-semibold mb-2 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                  What's your return policy?
                </h3>
                <p className={`text-luxury-black/70 ${isRTL ? "font-arabic" : ""}`}>
                  We offer a 30-day return policy for unopened items in original packaging.
                </p>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardContent className="p-6">
                <h3 className={`font-semibold mb-2 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                  Do you ship internationally?
                </h3>
                <p className={`text-luxury-black/70 ${isRTL ? "font-arabic" : ""}`}>
                  Yes, we ship to over 50 countries worldwide. Shipping costs vary by location.
                </p>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardContent className="p-6">
                <h3 className={`font-semibold mb-2 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                  Are your products authentic?
                </h3>
                <p className={`text-luxury-black/70 ${isRTL ? "font-arabic" : ""}`}>
                  We guarantee 100% authentic products from authorized distributors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <FloatingLanguageSelector />
    </div>
  )
}
