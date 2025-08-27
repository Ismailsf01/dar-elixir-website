"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, Check, StarHalf, ShoppingBag } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation, languages } from "@/lib/i18n"
import { useCart } from "@/contexts/CartContext"
import { Product, SizeOption } from "@/types"
import { client } from "@/lib/sanity.client"

// This is now the main component exported by the file.
// Its only job is to fetch data and handle the loading state.
export default function ProductDetailsFetcher({ id }: { id: string }) {
    const [product, setProduct] = useState<Product | null>(null);
    const { currentLang } = useLanguage(); // Get language for the fetch

    useEffect(() => {
        const fetchProductData = async () => {
            const query = `*[_type == "product" && _id == $id][0]{
        ...,
        "image": image.asset->url,
        "description": description[_key == $lang][0].value,
        "name": name, // assuming name is not translated
        "brand": brand, // assuming brand is not translated
        "topNotes": topNotes[_key == $lang][0].value,
        "middleNotes": middleNotes[_key == $lang][0].value,
        "baseNotes": baseNotes[_key == $lang][0].value
      }`;
            const params = { id, lang: currentLang };
            const data = await client.fetch<Product>(query, params);
            setProduct(data);
        };

        fetchProductData();
    }, [id, currentLang]);

    // If the product is still loading, show a loading message.
    if (!product) {
        return <div className="min-h-screen text-center py-16">Loading product...</div>;
    }

    // Once the product is loaded, render the UI component and pass the data to it.
    return <ProductDetailsUI product={product} />;
}



function ProductDetailsUI({ product }: { product: Product }) {
    const { currentLang, isRTL } = useLanguage();
    const { addToCart, recentlyAdded } = useCart();
    const t = (key: keyof typeof import("@/lib/i18n").translations.en) => getTranslation(currentLang, key);

    const [selectedSize, setSelectedSize] = useState<SizeOption | null>(product.sizes?.[0] || null);
    const [quantity, setQuantity] = useState(1);

    // This effect updates the selected size if the product prop somehow changes
    useEffect(() => {
        setSelectedSize(product.sizes?.[0] || null);
    }, [product]);

    const handleAddToCart = () => {
        // We no longer need to check if 'product' is null here, because it's guaranteed.
        if (!selectedSize) return;

        const itemToAdd = {
            ...product,
            selectedSize: selectedSize.size,
            currentPrice: selectedSize.price,
            quantity: quantity,
        };
        addToCart(itemToAdd);
    };

    return (
        <div className={`min-h-screen py-8 ${isRTL ? "rtl" : "ltr"}`} dir={languages[currentLang].dir}>
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="relative">
                            <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={500}
                                height={500}
                                className="w-full aspect-square object-cover rounded-lg shadow-lg border border-luxury-gold/20"
                            />
                            {product.isSale && (
                                <Badge className={`absolute top-4 bg-red-500 text-white ${isRTL ? "right-4" : "left-4"}`}>{t("sale")}</Badge>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className={`space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
                        <div>
                            <div className={`text-luxury-gold font-medium mb-2 ${isRTL ? "font-arabic" : ""}`}>{product.brand}</div>
                            <h1 className={`text-3xl lg:text-4xl font-bold mb-4 text-luxury-black font-serif ${isRTL ? "font-arabic" : ""}`}>
                                {product.name}
                            </h1>
                            <div className={`flex items-center gap-2 pt-1 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className="font-bold text-luxury-gold text-sm">{product.rating?.toFixed(1)}</span>
                                <div className={`flex items-center gap-0.5 ${isRTL ? "flex-row-reverse" : ""}`}>
                                    {[...Array(5)].map((_, i) => {
                                        const ratingValue = i + 1;
                                        if (ratingValue <= Math.floor(product.rating)) return <Star key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />;
                                        if (ratingValue - 0.5 <= product.rating) return <StarHalf key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />;
                                        return <Star key={i} className="w-4 h-4 text-gray-400" />;
                                    })}
                                </div>
                            </div>
                        </div>


                        {/* Price */}
                        <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                            {selectedSize && (
                                <>
                                    <span className="text-3xl font-bold text-luxury-gold">{selectedSize.price.toFixed(2)} MAD</span>
                                    {selectedSize.originalPrice && selectedSize.originalPrice > selectedSize.price && (
                                        <span className="text-xl text-luxury-black/50 line-through">{selectedSize.originalPrice.toFixed(2)} MAD</span>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Size Selection */}
                        <div>
                            <h3 className={`font-semibold mb-3 text-luxury-black`}>{t("size")}</h3>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((sizeOption) => (
                                    <Button
                                        key={sizeOption.size}
                                        variant={selectedSize?.size === sizeOption.size ? "solid-gold" : "outline"}
                                        onClick={() => setSelectedSize(sizeOption)}
                                    >
                                        {sizeOption.size}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div>
                            <h3 className={`font-semibold mb-3 text-luxury-black`}>{t("quantity")}</h3>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
                                <span className="font-semibold w-10 text-center">{quantity}</span>
                                <Button variant="outline" size="sm" onClick={() => setQuantity(q => q + 1)}>+</Button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                            {recentlyAdded.includes(product._id) ? (
                                <Button size="lg" className="flex-1 gap-2 bg-green-500 hover:bg-green-600" disabled>
                                    <Check className="w-5 h-5" />
                                    {t("added")}
                                </Button>
                            ) : (
                                <Button size="lg" className="flex-1 gap-2 luxury-button-gold" onClick={handleAddToCart} disabled={!selectedSize}>
                                    <ShoppingBag className="w-5 h-5" />
                                    {t("addToCart")}
                                </Button>
                            )}
                        </div>

                        <Separator />

                        {/* Description */}
                        <div>
                            <h3 className={`font-semibold text-lg mb-3 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>{t("description")}</h3>
                            <p className={`text-luxury-black/70 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>{product.description}</p>
                        </div>

                        {/* Fragrance Notes */}
                        <Card className="luxury-card">
                            <CardContent className="p-6">
                                <h3 className={`font-semibold text-lg mb-4 text-luxury-black ${isRTL ? "font-arabic" : ""}`}>{t("fragranceNotes")}</h3>
                                <div className="space-y-4">

                                    {/* Top Notes */}
                                    {product.topNotes && <div>
                                        <h4 className={`font-medium text-luxury-gold mb-2 ${isRTL ? "font-arabic" : ""}`}>{t("topNotes")}</h4>
                                        {/* v v v The change is from 'justify-end' to 'text-right' v v v */}
                                        <div className={`flex flex-wrap gap-2 ${isRTL ? "text-right" : "text-left"}`}>
                                            {product.topNotes.split(',').map((note: string) => (<Badge key={note.trim()} variant="secondary">{note.trim()}</Badge>))}
                                        </div>
                                    </div>}

                                    {/* Middle Notes */}
                                    {product.middleNotes && <div>
                                        <h4 className={`font-medium text-luxury-gold mb-2 ${isRTL ? "font-arabic" : ""}`}>{t("middleNotes")}</h4>
                                        {/* v v v The change is from 'justify-end' to 'text-right' v v v */}
                                        <div className={`flex flex-wrap gap-2 ${isRTL ? "text-right" : "text-left"}`}>
                                            {product.middleNotes.split(',').map((note: string) => (<Badge key={note.trim()} variant="secondary">{note.trim()}</Badge>))}
                                        </div>
                                    </div>}

                                    {/* Base Notes */}
                                    {product.baseNotes && <div>
                                        <h4 className={`font-medium text-luxury-gold mb-2 ${isRTL ? "font-arabic" : ""}`}>{t("baseNotes")}</h4>
                                        {/* v v v The change is from 'justify-end' to 'text-right' v v v */}
                                        <div className={`flex flex-wrap gap-2 ${isRTL ? "text-right" : "text-left"}`}>
                                            {product.baseNotes.split(',').map((note: string) => (<Badge key={note.trim()} variant="secondary">{note.trim()}</Badge>))}
                                        </div>
                                    </div>}

                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}