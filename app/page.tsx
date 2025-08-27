"use client"

import { useState, useEffect } from "react"
import { client } from "@/lib/sanity.client"
import { Product } from "@/types"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Star, StarHalf, HandCoins, ShoppingBag, Truck, Shield } from "lucide-react"
import { getTranslation, languages } from "@/lib/i18n"
import { useLanguage } from "@/contexts/LanguageContext"
import { useCart } from "@/contexts/CartContext"
import { Badge } from "@/components/ui/badge"
import FloatingLanguageSelector from "@/components/FloatingLanguageSelector"


export default function HomePage() {
  const { currentLang, isRTL } = useLanguage()
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) => getTranslation(currentLang, key)
  const { addToCart, recentlyAdded } = useCart()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchFeatured = async () => {
      const query = `*[_type == "product" && isFeatured == true][0...4]{
          ...,
          "image": image.asset->url
        }`
      const products = await client.fetch<Product[]>(query)
      setFeaturedProducts(products)
    }
    fetchFeatured()
  }, [])

  return (
    <div className={`min-h-screen ${isRTL ? "rtl" : "ltr"}`} dir={languages[currentLang].dir}>
      {/* Hero Section */}
      <section className="relative luxury-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 via-luxury-black/60 to-transparent"></div>
        <div className="absolute inset-0 shimmer"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
              <h1 className={`text-4xl lg:text-6xl font-bold leading-tight font-serif ${isRTL ? "font-arabic" : ""}`}>
                {t("heroTitle")}
                <span className="block text-gradient-gold animate-fade-in">{t("heroSubtitle")}</span>
              </h1>
              <p className={`text-xl text-luxury-gold-muted leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                {t("heroDescription")}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                <Button asChild size="lg" className="luxury-button-gold font-semibold">
                  <Link href="/products">{t("shopCollection")}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black bg-transparent"
                >
                  <Link href="/about">{t("learnMore")}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold/20 to-transparent rounded-lg blur-xl"></div>
              <Image
                src="/Main_image.png"
                alt="Luxury Perfume Collection"
                width={400}
                height={500}
                className="relative mx-auto rounded-lg shadow-2xl border border-luxury-gold/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-luxury-gold-muted to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`text-center space-y-4 ${isRTL ? "font-arabic" : ""}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-luxury-gold to-luxury-gold-dark rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Truck className="w-8 h-8 text-luxury-black" />
              </div>
              <h3 className="text-xl font-semibold text-luxury-black">{t("freeShipping")}</h3>
              <p className="text-luxury-black/70">{t("freeShippingDesc")}</p>
            </div>
            <div className={`text-center space-y-4 ${isRTL ? "font-arabic" : ""}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-luxury-gold to-luxury-gold-dark rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Shield className="w-8 h-8 text-luxury-black" />
              </div>
              <h3 className="text-xl font-semibold text-luxury-black">{t("authenticProducts")}</h3>
              <p className="text-luxury-black/70">{t("authenticProductsDesc")}</p>
            </div>
            <div className={`text-center space-y-4 ${isRTL ? "font-arabic" : ""}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-luxury-gold to-luxury-gold-dark rounded-full flex items-center justify-center mx-auto shadow-lg">
                <HandCoins className="w-8 h-8 text-luxury-black" />
              </div>
              <h3 className="text-xl font-semibold text-luxury-black">{t("cashOnDelivery")}</h3>
              <p className="text-luxury-black/70">{t("cashOnDeliveryDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 ${isRTL ? "font-arabic" : ""}`}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-luxury-black font-serif">
              {t("featuredFragrances")}
            </h2>
            <p className="text-luxury-black/70 text-lg max-w-2xl mx-auto">{t("featuredDescription")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product._id} className="group luxury-card flex flex-col">
                <CardContent className="p-3 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <div className="relative mb-3 overflow-hidden rounded-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full aspect-square object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute top-2 flex flex-col gap-1 ${isRTL ? "right-2" : "left-2"}`}>
                        {product.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white">{t("new")}</Badge>}
                        {product.isSale && <Badge className="bg-red-500 hover:bg-red-600 text-white">{t("sale")}</Badge>}
                      </div>
                      {/* Hover Button with feedback */}
                      {recentlyAdded.includes(product._id) ? (
                        <Button size="sm" className={`absolute top-2 bg-green-500 cursor-not-allowed ${isRTL ? "left-2" : "right-2"}`} disabled>
                          <Check className="w-4 h-4 text-white" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className={`absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity luxury-button-gold ${isRTL ? "left-2" : "right-2"}`}
                          onClick={() => {
                            if (product.sizes && product.sizes.length > 0) {
                              const defaultSize = product.sizes[0];
                              const itemToAdd = {
                                ...product,
                                selectedSize: defaultSize.size,
                                currentPrice: defaultSize.price,
                                quantity: 1,
                              };
                              addToCart(itemToAdd);
                            }
                          }}
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className={`space-y-1 ${isRTL ? "text-right" : "text-left"}`}>
                      <div className={`text-sm text-luxury-gold ${isRTL ? "font-arabic" : ""}`}>{product.brand}</div>
                      <h3 className={`font-semibold text-lg text-luxury-black ${isRTL ? "font-arabic" : ""}`}>{product.name}</h3>
                      <div className={`text-sm text-luxury-gold ${isRTL ? "font-arabic" : ""}`}>{t((product.category || "").toLowerCase() as keyof typeof import("@/lib/i18n").translations.en)}</div>
                      <div className={`flex items-center gap-2 pt-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span className="font-bold text-luxury-gold text-sm">{product.rating?.toFixed(1)}</span>
                        <div className={`flex items-center gap-0.5 ${isRTL ? "flex-row-reverse" : ""}`}>
                          {[...Array(5)].map((_, i) => {
                            const ratingValue = i + 1;
                            if (ratingValue <= Math.floor(product.rating)) {
                              return <Star key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />;
                            } else if (ratingValue - 0.5 <= product.rating) {
                              return <StarHalf key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />;
                            } else {
                              return <Star key={i} className="w-4 h-4 text-gray-400" />;
                            }
                          })}
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 pt-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                        {product.sizes && product.sizes.length > 0 && (
                          <>
                            <span className="text-xl font-bold text-luxury-gold">{product.sizes[0].price.toFixed(2)} MAD</span>

                            {/* v v v THIS IS THE CORRECTED LOGIC v v v */}
                            {product.isSale && product.sizes[0].originalPrice && product.sizes[0].originalPrice > product.sizes[0].price && (
                              <span className="text-sm text-luxury-black/50 line-through">
                                {product.sizes[0].originalPrice.toFixed(2)} MAD
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button asChild className="w-full" variant="outline">
                      <Link href={`/products/${product._id}`}>{t("viewDetails")}</Link>
                    </Button>
                    {recentlyAdded.includes(product._id) ? (
                      <Button className="w-full bg-green-500 hover:bg-green-600" disabled>
                        <Check className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {t("added")}
                      </Button>
                    ) : (
                      <Button
                        className="w-full luxury-button-gold"
                        onClick={() => {
                          if (product.sizes && product.sizes.length > 0) {
                            const defaultSize = product.sizes[0];
                            const itemToAdd = {
                              ...product,
                              selectedSize: defaultSize.size,
                              currentPrice: defaultSize.price,
                              quantity: 1,
                            };
                            addToCart(itemToAdd);
                          }
                        }}
                      >
                        <ShoppingBag className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {t("addToCart")}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black bg-transparent"
            >
              <Link href="/products">{t("viewAllProducts")}</Link>
            </Button>
          </div>

        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="py-16 luxury-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
        <div className={`container mx-auto px-4 text-center relative ${isRTL ? "font-arabic" : ""}`}>
          <h2 className="text-3xl font-bold mb-4 font-serif">{t("newsletterTitle")}</h2>
          <p className="text-luxury-gold-muted mb-8 max-w-2xl mx-auto">{t("newsletterDescription")}</p>
          <form onSubmit={handleSubscribe} className={`max-w-md mx-auto flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <input
              type="email"
              placeholder={t("enterEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`flex-1 px-4 py-3 rounded-lg text-luxury-black bg-white border border-luxury-gold/30 focus:border-luxury-gold focus:outline-none ${isRTL ? "text-right font-arabic" : ""}`}
            />
            <Button type="submit" disabled={isSubscribing} className="luxury-button-gold font-semibold">
              {isSubscribing ? t("subscribing") : t("subscribe")}
            </Button>
          </form>
        </div>
      </section> */}

      {/* Floating Language Selector */}
      <FloatingLanguageSelector />
    </div>
  )
}
