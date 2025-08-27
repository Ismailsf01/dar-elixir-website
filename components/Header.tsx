"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingBag, User, Heart, Menu, X } from "lucide-react"
import LanguageSelector from "./LanguageSelector"
import { getTranslation, languages } from "@/lib/i18n"
import { useLanguage } from "@/contexts/LanguageContext"
import Image from 'next/image';
import { useCart } from "@/contexts/CartContext"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, } from "@/components/ui/navigation-menu"

export default function Header() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const isMobile = useIsMobile();
  const { currentLang, isRTL } = useLanguage()
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  const t = (key: keyof typeof import("@/lib/i18n").translations.en) => getTranslation(currentLang, key)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${searchTerm.trim()}`);
    }
  };
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return;

      const scrollBuffer = isMobile ? 220 : 150;
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < scrollBuffer);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isMobile, isMenuOpen]);

  return (
    <header
      className={`border-b border-luxury-gold/20 bg-luxury-black sticky top-0 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'} ${isRTL ? "rtl" : "ltr"}`}
      dir={languages[currentLang].dir}
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-luxury-black">
        <div className={`container mx-auto px-4 py-2 text-center text-sm font-medium ${isRTL ? "font-arabic" : ""}`}>
          {currentLang === "en" && "Free shipping on orders over 500 MAD"}
          {currentLang === "fr" &&
            "Livraison gratuite sur les commandes de plus de 500 Dirhams"}
          {currentLang === "ar" && "شحن مجاني للطلبات أكثر من 500 درهم"}
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto pl-2 pr-8">
        <div className="flex items-center justify-between h-17">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gradient-gold font-serif">
            <Image
              src="/Main_icon.png"
              alt="Dar Elixir Logo"
              width={160}
              height={90}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-1 ${isRTL ? "space-x-reverse font-arabic" : ""}`}>
            <NavigationMenu>
              <NavigationMenuList>

                {/* Home Link */}
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    {/* v v v Change is on this line v v v */}
                    <NavigationMenuLink className={navigationMenuTriggerStyle() + " bg-transparent text-luxury-gold hover:bg-luxury-gold/10 hover:text-luxury-gold-light focus:bg-luxury-gold/10 focus:text-luxury-gold-light"}>
                      {t("home")}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Products Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-luxury-gold hover:bg-luxury-gold/10 hover:text-luxury-gold-light focus:bg-luxury-gold/10 focus:text-luxury-gold-light data-[state=open]:bg-luxury-gold/10 data-[state=open]:text-luxury-gold-light">
                    {t("products")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4 bg-luxury-black border border-luxury-gold/20">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/products?gender=female" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors text-luxury-gold hover:bg-luxury-gold/10 hover:text-luxury-gold-light">
                            <div className="text-sm font-medium leading-none">{t("women")}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/products?gender=male" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors text-luxury-gold hover:bg-luxury-gold/10 hover:text-luxury-gold-light">
                            <div className="text-sm font-medium leading-none">{t("men")}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle() + " bg-transparent text-luxury-gold hover:bg-luxury-gold/10 hover:text-luxury-gold-light focus:bg-luxury-gold/10 focus:text-luxury-gold-light"}>
                      {t("contact")}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search
                className={`absolute top-1/2 transform -translate-y-1/2 text-luxury-gold/60 w-4 h-4 ${isRTL ? "right-3" : "left-3"}`}
              />
              <Input
                type="search"
                placeholder={t("search")}
                value={searchTerm} // Connect to state
                onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
                className={`bg-luxury-black-light border-luxury-gold/30 text-luxury-gold placeholder-luxury-gold/60 focus:border-luxury-gold ${isRTL ? "pr-10 pl-4 text-right font-arabic" : "pl-10 pr-4"}`}
              />
            </div>
          </form>

          {/* Actions */}
          <div className={`flex items-center space-x-4 ${isRTL ? "space-x-reverse" : ""}`}>
            <LanguageSelector />
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="relative text-luxury-gold hover:text-luxury-gold-light"
            >
              <Link href="/cart">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="...">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-luxury-gold"
              onClick={() => {
                setVisible(true);
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <Search
              className={`absolute top-1/2 transform -translate-y-1/2 text-luxury-gold/60 w-4 h-4 ${isRTL ? "right-3" : "left-3"}`}
            />
            <Input
              type="search"
              placeholder={t("search")}
              className={`bg-luxury-black-light border-luxury-gold/30 text-luxury-gold placeholder-luxury-gold/60 focus:border-luxury-gold ${isRTL ? "pr-10 pl-4 text-right font-arabic" : "pl-10 pr-4"}`}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-luxury-gold/20 bg-luxury-black-light">
          <nav className={`container mx-auto px-4 py-4 space-y-4 ${isRTL ? "font-arabic" : ""}`}>
            <Link
              href="/"
              className="block text-luxury-gold hover:text-luxury-gold-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href="/products"
              className="block text-luxury-gold hover:text-luxury-gold-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("products")}
            </Link>
            <Link
              href="/contact"
              className="block text-luxury-gold hover:text-luxury-gold-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("contact")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
