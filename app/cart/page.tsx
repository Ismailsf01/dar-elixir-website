"use client"

import { useState } from "react"
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation, languages } from "@/lib/i18n"
import FloatingLanguageSelector from "@/components/FloatingLanguageSelector"
import { useCart } from "@/contexts/CartContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const cities = [
  { name: "Rabat", fee: 0 },
  { name: "Salé", fee: 0 },
  { name: "Casablanca", fee: 20 },
  { name: "Témara", fee: 0 },
  { name: "Kenitra", fee: 20 },
  { name: "Marrakech", fee: 30 },
  { name: "Tanger", fee: 30 },
  { name: "Agadir", fee: 30 },
  // Adding new cities
  { name: "Fès", fee: 30 },
  { name: "Meknès", fee: 30 },
  { name: "Oujda", fee: 30 },
  { name: "Tétouan", fee: 30 },
  { name: "Safi", fee: 30 },
  { name: "Laâyoune", fee: 30 },
  { name: "El Jadida", fee: 30 },
  { name: "Aït Melloul", fee: 30 },
  { name: "Beni Mellal", fee: 30 },
  { name: "Mohammédia", fee: 30 },
  { name: "Khouribga", fee: 30 },
  { name: "Settat", fee: 30 },
  { name: "Nador", fee: 30 },
  { name: "Taza", fee: 30 },
  { name: "Larache", fee: 30 },
  { name: "Guelmim", fee: 30 },
  { name: "Khémisset", fee: 30 },
  { name: "Bouskoura", fee: 30 },
  { name: "Inezgane", fee: 30 },
  { name: "Berkane", fee: 30 },
  { name: "Khénifra", fee: 30 },
  { name: "Taourirt", fee: 30 },
  { name: "Ben Guerir", fee: 30 },
  { name: "Dakhla", fee: 30 },
  { name: "Errachidia", fee: 30 },
  { name: "Sidi Slimane", fee: 30 },
  { name: "Tiznit", fee: 30 },
  { name: "Taroudant", fee: 30 },
  { name: "Guercif", fee: 30 },
  { name: "Essaouira", fee: 30 },
  { name: "Sidi Kacem", fee: 30 },
];


export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const { currentLang, isRTL } = useLanguage()
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) => getTranslation(currentLang, key)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subtotal = cartItems.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
  const selectedCityData = cities.find(c => c.name === city);
  let shippingFee = selectedCityData ? selectedCityData.fee : 0;
  if (subtotal >= 500) {
    shippingFee = 0;
  }

  const total = subtotal + shippingFee;

  const handlePlaceOrder = async () => {
    if (!name || !phone || !city || !address || cartItems.length === 0) {
      alert("Please fill in all delivery information.");
      return;
    }

    setIsSubmitting(true);

    const message = cartItems.map(item =>
      `${item.quantity} x ${item.name} (${item.selectedSize}) - ${item.currentPrice.toFixed(2)} MAD`
    ).join('\n');
    const totalAmount = total.toFixed(2);
    const templateParams = {
      from_name: name,
      phone,
      city,
      address,
      message,
      total_amount: totalAmount,
    };

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
      .then((response: EmailJSResponseStatus) => {
        console.log('SUCCESS!', response.status, response.text);
        alert("Thank you! Your order has been placed successfully.");
        clearCart();
      })
      .catch((err: any) => {
        console.log('FAILED...', err);
        alert("Oops! Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen py-16 ${isRTL ? "rtl" : "ltr"}`} dir={languages[currentLang].dir}>
        <div className={`container mx-auto px-4 text-center ${isRTL ? "font-arabic" : ""}`}>
          <ShoppingBag className="w-24 h-24 text-luxury-gold/50 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-luxury-black">{t("cartEmpty")}</h1>
          <p className="text-luxury-black/70 mb-8">{t("cartEmptyDesc")}</p>
          <Button asChild size="lg" className="luxury-button-gold">
            <Link href="/products">{t("continueShopping")}</Link>
          </Button>
        </div>
        <FloatingLanguageSelector />
      </div>
    )
  }

  return (
    <div className={`min-h-screen py-8 ${isRTL ? "rtl" : "ltr"}`} dir={languages[currentLang].dir}>
      <div className="container mx-auto px-4">
        <h1
          className={`text-3xl font-bold mb-8 text-luxury-black font-serif ${isRTL ? "text-right font-arabic" : "text-left"}`}
        >
          {t("shoppingCart")}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item._id} className="luxury-card">
                <CardContent className="p-4"> {/* Adjusted padding for mobile */}
                  <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}> {/* Stacks vertically on mobile */}
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg border border-luxury-gold/20 mx-auto sm:mx-0" // Centered on mobile
                    />

                    {/* Added min-w-0 to allow this container to shrink */}
                    <div className={`flex-1 min-w-0 space-y-3 ${isRTL ? "text-right" : "text-left"}`}>
                      <div>
                        {/* Added break-words to wrap long names */}
                        <h3 className={`font-semibold text-lg text-luxury-black break-words ${isRTL ? "font-arabic" : ""}`}>
                          {item.name}
                        </h3>
                        <p className={`text-luxury-black/70 ${isRTL ? "font-arabic" : ""}`}>{item.brand}</p>
                        <p className={`text-sm text-luxury-gold ${isRTL ? "font-arabic" : ""}`}>
                          {t("size")}: {item.selectedSize}
                        </p>
                      </div>

                      {/* This row now also stacks on small screens for better layout */}
                      <div className={`flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                        <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center text-luxury-black font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                          <span className="font-semibold text-lg text-luxury-gold">
                            {(item.currentPrice * item.quantity).toFixed(2)} MAD
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item._id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className={`text-luxury-black ${isRTL ? "text-right font-arabic" : "text-left"}`}>
                  {t("orderSummary")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`flex justify-between ${isRTL ? "flex-row-reverse font-arabic" : ""}`}>
                  <span className="text-luxury-black">{t("subtotal")}</span>
                  <span className="text-luxury-black">{subtotal.toFixed(2)} MAD</span>
                </div>

                <div className={`flex justify-between ${isRTL ? "flex-row-reverse font-arabic" : ""}`}>
                  <span className="text-luxury-black">{t("shipping")}</span>
                  <span className="text-luxury-black">
                    {city ? `${shippingFee.toFixed(2)} MAD` : t("selectCity")}
                  </span>
                </div>

                <Separator />

                <div className={`flex justify-between font-semibold text-lg ${isRTL ? "flex-row-reverse font-arabic" : ""}`}>
                  <span className="text-luxury-black">{t("total")}</span>
                  <span className="text-luxury-gold">{total.toFixed(2)} MAD</span>
                </div>

                <Separator />

                <div className="space-y-3 pt-4">
                  <h3 className="font-semibold text-lg text-luxury-black">{t("deliveryInformation")}</h3>
                  <Input
                    placeholder={t("fullName")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="luxury-input"
                  />
                  <Input
                    placeholder={t("phoneNumber")}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="luxury-input"
                  />
                  <Select value={city} onValueChange={(value) => setCity(value)}>
                    <SelectTrigger className="luxury-input">
                      <SelectValue placeholder={t("city")} />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((cityOption) => (
                        <SelectItem key={cityOption.name} value={cityOption.name}>
                          {cityOption.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder={t("address")}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="luxury-input"
                  />

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full luxury-button-gold"
                    size="lg"
                  >
                    {isSubmitting ? t("placingOrder") : t("placeOrder")}
                  </Button>

                  <Button asChild variant="outline" size="lg" className="w-full bg-transparent border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black">
                    <Link href="/products">{t("continueShopping")}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <FloatingLanguageSelector />
    </div>
  )
}
