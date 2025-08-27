"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Loader2, Star, StarHalf, Filter, ShoppingBag } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation, languages } from "@/lib/i18n"
import FloatingLanguageSelector from "@/components/FloatingLanguageSelector"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useCart } from "@/contexts/CartContext";
import { client } from "@/lib/sanity.client"
import { Product } from "@/types"
import { SortOrder } from "@/types";



export default function ProductsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const genderFromUrl = searchParams.get('gender')
  const searchTermFromUrl = searchParams.get('search')
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([])
  const { currentLang, isRTL } = useLanguage()
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) => getTranslation(currentLang, key)
  const [activeGender, setActiveGender] = useState(genderFromUrl || "all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSeason, setActiveSeason] = useState("all");
  const { addToCart, recentlyAdded } = useCart();
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const clearFilters = () => {
    setActiveGender("all");
    setActiveSeason("all");
    setActiveCategory("all");
    setSortOrder("default");
    router.push(pathname, { scroll: false });
  };

  const handleFilterChange = (filterType: 'gender' | 'season' | 'category', value: string) => {
    router.push(pathname, { scroll: false });

    if (filterType === 'gender') setActiveGender(value);
    if (filterType === 'season') setActiveSeason(value);
    if (filterType === 'category') setActiveCategory(value);
  };

  // Fetch data from Sanity when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const query = `*[_type == "product"]{
                      ..., // This keeps all the existing fields
                      "image": image.asset->url // This specifically gets the URL for the image
                    }`
      try {
        const sanityProducts = await client.fetch<Product[]>(query)
        console.log("Products from Sanity:", sanityProducts);
        setProducts(sanityProducts)
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false); // Stop loading, regardless of success or failure
      }
    }
    fetchProducts()
  }, [])

  let filteredAndSortedProducts = [...products];

  if (searchTermFromUrl) {
    filteredAndSortedProducts = filteredAndSortedProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTermFromUrl.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTermFromUrl.toLowerCase())
    );
  }

  // 1. Filter by Season
  if (activeSeason !== "all") {
    filteredAndSortedProducts = filteredAndSortedProducts.filter(
      (product) => product.season === activeSeason || product.season === 'all-year'
    );
  }

  // 2. Filter by Gender
  if (activeGender !== "all") {
    filteredAndSortedProducts = filteredAndSortedProducts.filter(
      (product) => product.gender === activeGender
    );
  }

  // 3. Filter by Category
  if (activeCategory !== "all") {
    filteredAndSortedProducts = filteredAndSortedProducts.filter(
      (product) => product.category === activeCategory
    );
  }

  // 4. Apply Sorting
  switch (sortOrder) {
    case "price-asc":
      filteredAndSortedProducts.sort((a, b) => (a.sizes?.[0]?.price || 0) - (b.sizes?.[0]?.price || 0));
      break;
    case "price-desc":
      filteredAndSortedProducts.sort((a, b) => (b.sizes?.[0]?.price || 0) - (a.sizes?.[0]?.price || 0));
      break;
    case "rating-desc":
      filteredAndSortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // No sorting or default sort
      break;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-luxury-gold animate-spin" />
      </div>
    )
  }

  return (
    <div className={`min-h-screen py-8 ${isRTL ? "rtl" : "ltr"}`} dir={languages[currentLang].dir}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`mb-8 ${isRTL ? "text-right font-arabic" : "text-left"}`}>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-luxury-black font-serif">
            {t("ourPerfumeCollection")}
          </h1>
          <p className="text-luxury-black/70 text-lg">{t("discoverCompleteRange")}</p>
        </div>

        {/* Filters */}
        <div className={`space-y-4 mb-8 ${isRTL ? "text-right" : "text-left"}`}>

          {/* Gender Filters */}
          <div className="flex flex-wrap justify-inherit gap-2 items-center">
            <span className={`font-semibold ${isRTL ? "ml-2" : "mr-2"}`}>{t("gender")}:</span>
            <Button onClick={() => handleFilterChange('gender', 'all')} size="sm" variant={activeGender === "all" ? "solid-gold" : "ghost"}>{t("all")}</Button>
            <Button onClick={() => handleFilterChange('gender', 'female')} size="sm" variant={activeGender === "female" ? "solid-gold" : "ghost"}>{t("women")}</Button>
            <Button onClick={() => handleFilterChange('gender', 'male')} size="sm" variant={activeGender === "male" ? "solid-gold" : "ghost"}>{t("men")}</Button>
          </div>

          {/* Season Filters */}
          <div className="flex flex-wrap justify-inherit gap-2 items-center">
            <span className={`font-semibold ${isRTL ? "ml-2" : "mr-2"}`}>{t("season")}:</span>
            <Button onClick={() => handleFilterChange('season', 'all')} size="sm" variant={activeSeason === 'all' ? 'solid-gold' : 'ghost'}>{t("all")}</Button>
            <Button onClick={() => handleFilterChange('season', 'summer')} size="sm" variant={activeSeason === 'summer' ? 'solid-gold' : 'ghost'}>{t("summer")}</Button>
            <Button onClick={() => handleFilterChange('season', 'winter')} size="sm" variant={activeSeason === 'winter' ? 'solid-gold' : 'ghost'}>{t("winter")}</Button>
            <Button onClick={() => handleFilterChange('season', 'all-year')} size="sm" variant={activeSeason === 'all-year' ? 'solid-gold' : 'ghost'}>{t("allYear")}</Button>
          </div>

          {/* Scent Family Filters */}
          <div className="flex flex-wrap justify-inherit gap-2 items-center">
            <span className={`font-semibold ${isRTL ? "ml-2" : "mr-2"}`}>{t("scentFamily")}:</span>
            <Button onClick={() => handleFilterChange('category', 'all')} size="sm" variant="outline" className={activeCategory === 'all' ? 'bg-luxury-gold text-luxury-black border-luxury-gold' : 'border-gray-300'}>{t("allCategories")}</Button>
            <Button onClick={() => handleFilterChange('category', 'Floral')} size="sm" variant={activeCategory === 'Floral' ? 'solid-gold' : 'ghost'}>{t("floral")}</Button>
            <Button onClick={() => handleFilterChange('category', 'Oriental')} size="sm" variant={activeCategory === 'Oriental' ? 'solid-gold' : 'ghost'}>{t("oriental")}</Button>
            <Button onClick={() => handleFilterChange('category', 'Woody')} size="sm" variant={activeCategory === 'Woody' ? 'solid-gold' : 'ghost'}>{t("woody")}</Button>
            <Button onClick={() => handleFilterChange('category', 'Fresh')} size="sm" variant={activeCategory === 'Fresh' ? 'solid-gold' : 'ghost'}>{t("fresh")}</Button>
            <Button onClick={() => handleFilterChange('category', 'Gourmand')} size="sm" variant={activeCategory === 'Gourmand' ? 'solid-gold' : 'ghost'}>{t("gourmand")}</Button>
            <Button onClick={() => handleFilterChange('category', 'Aromatic')} size="sm" variant={activeCategory === 'Aromatic' ? 'solid-gold' : 'ghost'}>{t("aromatic")}</Button>
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center justify-end gap-3 mb-4">
          <span className="text-sm font-medium text-luxury-black/80">{t("sortByLabel")}</span>

          {/* 3. Apply the SortOrder type to the onValueChange function */}
          <Select value={sortOrder} onValueChange={(value: SortOrder) => setSortOrder(value)}>
            <SelectTrigger className="w-[200px] luxury-input">
              <SelectValue placeholder={t("sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">{t("featured")}</SelectItem>
              <SelectItem value="price-asc">{t("priceLowToHigh")}</SelectItem>
              <SelectItem value="price-desc">{t("priceHighToLow")}</SelectItem>
              <SelectItem value="rating-desc">{t("productRating")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product) => (
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

                      {/* Badges */}
                      <div className={`absolute top-2 flex flex-col gap-1 ${isRTL ? "right-2" : "left-2"}`}>
                        {product.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white">{t("new")}</Badge>}
                        {product.isSale && <Badge className="bg-red-500 hover:bg-red-600 text-white">{t("sale")}</Badge>}
                      </div>

                      {/* Hover Button */}
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
                      <h3 className={`font-semibold text-lg text-luxury-black ${isRTL ? "font-arabic" : ""}`}>
                        {product.name}
                      </h3>
                      <div className={`text-sm text-luxury-gold ${isRTL ? "font-arabic" : ""}`}>
                        {t(product.category.toLowerCase() as keyof typeof import("@/lib/i18n").translations.en)}
                      </div>

                      {/* --- RATING --- */}
                      <div className={`flex items-center gap-2 pt-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span className="font-bold text-luxury-gold text-sm">{product.rating.toFixed(1)}</span>
                        <div className={`flex items-center gap-0.5 ${isRTL ? "flex-row-reverse" : ""}`}>
                          {/* V V V THIS IS THE LOGIC THAT WAS MISSING V V V */}
                          {[...Array(5)].map((_, i) => {
                            const ratingValue = i + 1;
                            if (ratingValue <= Math.floor(product.rating)) {
                              // Full Star
                              return <Star key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />;
                            } else if (ratingValue - 0.5 <= product.rating) {
                              // Half Star
                              return <StarHalf key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />;
                            } else {
                              // Empty Star
                              return <Star key={i} className="w-4 h-4 text-gray-400" />;
                            }
                          })}
                        </div>
                      </div>

                      {/* --- PRICE --- */}
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
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">{t("noProductsFound")}</h2>
              <p className="text-luxury-black/70 mb-6">{t("tryDifferentFilters")}</p>
              <Button onClick={clearFilters} className="luxury-button-gold">{t("clearFilters")}</Button>
            </div>
          )}
        </div>
      </div>
      <FloatingLanguageSelector />
    </div>
  )
}
