export const languages = {
  fr: { name: "Français", dir: "ltr", flag: "🇫🇷" },
  ar: { name: "العربية", dir: "rtl", flag: "🇲🇦" },
  en: { name: "English", dir: "ltr", flag: "🇺🇸" },
} as const

export type Language = keyof typeof languages

export const translations = {
  en: {
    // Navigation
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    cart: "Cart",
    search: "Search fragrances...",

    // Homepage
    heroTitle: "The companion for",
    heroSubtitle: "your daily life.",
    heroDescription:
      "A selection of authentic perfumes, chosen to enhance your moments.",
    shopCollection: "Shop Collection",
    learnMore: "Learn More",

    // Features
    freeShipping: "Free Shipping",
    freeShippingDesc: "Free delivery on orders over 500 MAD",
    authenticProducts: "Authentic Products",
    authenticProductsDesc: "100% genuine perfumes guaranteed",
    cashOnDelivery: "Cash On Delivery",
    cashOnDeliveryDesc: "Pay with cash upon receiving your product.",

    // Products
    featuredFragrances: "Featured Fragrances",
    featuredDescription:
      "Discover our most popular and trending perfumes, carefully selected.",
    viewDetails: "View Details",
    viewAllProducts: "View All Products",
    addToCart: "Add to Cart",
    sortByLabel: "Sort by",
    ourPerfumeCollection: "Our Perfume Collection",
    discoverCompleteRange: "Discover our complete range of premium fragrances for every occasion and personality.",
    allCategories: "All Categories",
    productRating: "Fragrance rating",
    gender: "Gender",
    all: "All",
    women: "Women",
    men: "Men",
    sortBy: "Sort by...",
    featured: "Featured",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    season: "Season",
    summer: "Summer",
    winter: "Winter",
    allYear: "All year",
    scentFamily: "Scent Family",
    noProductsFound: "No Products Found",
    tryDifferentFilters: "Try adjusting your filters to find what you're looking for.",
    clearFilters: "Clear Filters",
    added: "Added",

    // Product Detail
    brand: "Brand",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    quantity: "Quantity",
    addToWishlist: "Add to Wishlist",
    shareProduct: "Share Product",
    productDescription: "Product Description",
    customerReviews: "Customer Reviews",

    // Cart
    shoppingCart: "Shopping Cart",
    cartEmpty: "Your cart is empty",
    cartEmptyDesc: "Looks like you haven't added any items to your cart yet.",
    continueShopping: "Continue Shopping",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    tax: "Tax",
    total: "Total",
    promoCode: "Promo code",
    apply: "Apply",
    proceedToCheckout: "Proceed to Checkout",
    remove: "Remove",
    deliveryInformation: "Delivery Information",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    city: "City",
    selectCity: "Select a city",
    address: "Address",
    placeOrder: "Place Order",
    placingOrder: "Placing Order...",

    // About
    ourStoryTitle: "Our Story of Fragrance",
    ourStoryDesc1:
      "Founded in 2015, we began our journey with a simple mission: to make luxury fragrances accessible to everyone. What started as a small boutique has grown into a trusted destination for perfume enthusiasts worldwide.",
    ourStoryDesc2:
      "We believe that the right fragrance has the power to transform your day, boost your confidence, and create lasting memories. That's why we carefully curate our collection to include only the finest perfumes from renowned brands and emerging artisans.",
    ourValues: "Our Values",
    ourValuesDesc:
      "These core principles guide everything we do, from selecting our products to serving our customers.",
    qualityFirst: "Quality First",
    qualityFirstDesc: "We source only authentic, high-quality fragrances from trusted suppliers and brands.",
    customerFocus: "Customer Focus",
    customerFocusDesc: "Your satisfaction is our priority. We're here to help you find your perfect scent.",
    globalReach: "Global Reach",
    globalReachDesc: "We ship worldwide, bringing luxury fragrances to customers across the globe.",
    passion: "Passion",
    passionDesc: "We're passionate about fragrances and love sharing that enthusiasm with our customers.",
    meetOurTeam: "Meet Our Team",
    meetOurTeamDesc: "Our dedicated team of fragrance experts is here to help you discover your signature scent.",

    // Contact
    getInTouch: "Get in Touch",
    getInTouchDesc:
      "Have questions about our fragrances or need help finding your perfect scent? We'd love to hear from you.",
    sendMessage: "Send us a Message",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    phoneOptional: "Phone (Optional)",
    subject: "Subject",
    message: "Message",
    sendMessageBtn: "Send Message",
    visitOurStore: "Visit Our Store",
    callUs: "Call Us",
    emailUs: "Email Us",
    businessHours: "Business Hours",

    // Newsletter
    newsletterTitle: "Stay in the Scent",
    newsletterDescription:
      "Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and fragrance tips.",
    subscribe: "Subscribe",
    enterEmail: "Enter your email",
    subscribing: "Subscribing...",

    // Product categories
    oriental: "Oriental",
    floral: "Floral",
    fresh: "Fresh",
    //citrus: "Citrus",
    gourmand: "Gourmand",
    woody: "Woody",
    aromatic: "Aromatic",

    // Common
    new: "New",
    sale: "Sale",
    reviews: "reviews",
    save: "Save",
    size: "Size",
    description: "Description",
    fragranceNotes: "Fragrance Notes",
    topNotes: "Top Notes",
    middleNotes: "Middle Notes",
    baseNotes: "Base Notes",
  },
  fr: {
    // Navigation
    home: "Accueil",
    products: "Produits",
    about: "À Propos",
    contact: "Contact",
    cart: "Panier",
    search: "Rechercher des parfums...",

    // Homepage
    heroTitle: "Le compagnon",
    heroSubtitle: "de votre quotidien.",
    heroDescription:
      "Une sélection de parfums authentiques, choisie pour sublimer vos moments.",
    shopCollection: "Voir la Collection",
    learnMore: "En Savoir Plus",

    // Features
    freeShipping: "Livraison Gratuite",
    freeShippingDesc: "Livraison gratuite sur les commandes de plus de 500 MAD",
    authenticProducts: "Produits Authentiques",
    authenticProductsDesc: "Parfums 100% authentiques garantis",
    cashOnDelivery: "Paiement à la livraison",
    cashOnDeliveryDesc: "Payez en espèces à la réception de votre produit.",

    // Products
    featuredFragrances: "Parfums Vedettes",
    featuredDescription:
      "Découvrez nos parfums les plus populaires et tendance, soigneusement sélectionnés.",
    viewDetails: "Voir les Détails",
    viewAllProducts: "Voir Tous les Produits",
    addToCart: "Ajouter au Panier",
    sortByLabel: "Trier par",
    ourPerfumeCollection: "Notre Collection de Parfums",
    discoverCompleteRange: "Découvrez notre collection de parfums haut de gamme, pensée pour chaque occasion et personnalité.",
    allCategories: "Toutes les Catégories",
    productRating: "Évaluation du parfum",
    gender: "Genre",
    all: "Tous",
    women: "Femmes",
    men: "Hommes",
    sortBy: "Trier par...",
    featured: "En vedette",
    priceLowToHigh: "Prix : Croissant",
    priceHighToLow: "Prix : Décroissant",
    season: "Saison",
    summer: "Été",
    winter: "Hiver",
    allYear: "Toute l'année",
    scentFamily: "Famille Olfactive",
    woody: "Boisé",
    noProductsFound: "Aucun produit trouvé",
    tryDifferentFilters: "Essayez de modifier vos filtres pour trouver ce que vous cherchez.",
    clearFilters: "Effacer les filtres",
    added: "Ajouté",

    // Product Detail
    brand: "Marque",
    inStock: "En Stock",
    outOfStock: "Rupture de Stock",
    quantity: "Quantité",
    addToWishlist: "Ajouter aux Favoris",
    shareProduct: "Partager le Produit",
    productDescription: "Description du Produit",
    customerReviews: "Avis Clients",

    // Cart
    shoppingCart: "Panier d'Achat",
    cartEmpty: "Votre panier est vide",
    cartEmptyDesc: "Il semble que vous n'ayez encore ajouté aucun article à votre panier.",
    continueShopping: "Continuer les Achats",
    orderSummary: "Résumé de la Commande",
    subtotal: "Sous-total",
    shipping: "Livraison",
    tax: "Taxe",
    total: "Total",
    promoCode: "Code promo",
    apply: "Appliquer",
    proceedToCheckout: "Procéder au Paiement",
    remove: "Supprimer",
    deliveryInformation: "Informations de livraison",
    fullName: "Nom et Prénom",
    phoneNumber: "Numéro de téléphone",
    city: "Ville",
    selectCity: "Sélectionnez une ville",
    address: "Adresse",
    placeOrder: "Passer la commande",
    placingOrder: "Commande en cours...",

    // About
    ourStoryTitle: "Notre Histoire du Parfum",
    ourStoryDesc1:
      "Fondée en 2015, nous avons commencé notre voyage avec une mission simple : rendre les parfums de luxe accessibles à tous. Ce qui a commencé comme une petite boutique est devenu une destination de confiance pour les amateurs de parfums du monde entier.",
    ourStoryDesc2:
      "Nous croyons que le bon parfum a le pouvoir de transformer votre journée, de renforcer votre confiance et de créer des souvenirs durables. C'est pourquoi nous sélectionnons soigneusement notre collection pour inclure uniquement les meilleurs parfums de marques renommées et d'artisans émergents.",
    ourValues: "Nos Valeurs",
    ourValuesDesc:
      "Ces principes fondamentaux guident tout ce que nous faisons, de la sélection de nos produits au service de nos clients.",
    qualityFirst: "Qualité d'Abord",
    qualityFirstDesc:
      "Nous nous approvisionnons uniquement en parfums authentiques et de haute qualité auprès de fournisseurs et de marques de confiance.",
    customerFocus: "Focus Client",
    customerFocusDesc:
      "Votre satisfaction est notre priorité. Nous sommes là pour vous aider à trouver votre parfum parfait.",
    globalReach: "Portée Mondiale",
    globalReachDesc: "Nous expédions dans le monde entier, apportant des parfums de luxe aux clients du globe.",
    passion: "Passion",
    passionDesc: "Nous sommes passionnés par les parfums et aimons partager cet enthousiasme avec nos clients.",
    meetOurTeam: "Rencontrez Notre Équipe",
    meetOurTeamDesc:
      "Notre équipe dédiée d'experts en parfums est là pour vous aider à découvrir votre parfum signature.",

    // Contact
    getInTouch: "Contactez-Nous",
    getInTouchDesc:
      "Vous avez des questions sur nos parfums ou besoin d'aide pour trouver votre parfum parfait ? Nous aimerions avoir de vos nouvelles.",
    sendMessage: "Envoyez-nous un Message",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    phone: "Téléphone",
    phoneOptional: "Téléphone (Optionnel)",
    subject: "Sujet",
    message: "Message",
    sendMessageBtn: "Envoyer le Message",
    visitOurStore: "Visitez Notre Magasin",
    callUs: "Appelez-Nous",
    emailUs: "Envoyez-nous un Email",
    businessHours: "Heures d'Ouverture",

    // Newsletter
    newsletterTitle: "Restez dans le Parfum",
    newsletterDescription:
      "Abonnez-vous à notre newsletter et soyez le premier à connaître les nouvelles arrivées, les offres exclusives et les conseils parfum.",
    subscribe: "S'abonner",
    enterEmail: "Entrez votre email",
    subscribing: "Inscription en cours...",

    // Product categories
    oriental: "Oriental",
    floral: "Floral",
    fresh: "Frais",
    //citrus: "Agrumes",
    gourmand: "Gourmand",
    aromatic: "Aromatique",

    // Common
    new: "Nouveau",
    sale: "Solde",
    reviews: "avis",
    save: "Économiser",
    size: "Taille",
    description: "Description",
    fragranceNotes: "Notes de Parfum",
    topNotes: "Notes de Tête",
    middleNotes: "Notes de Cœur",
    baseNotes: "Notes de Fond",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    products: "المنتجات",
    about: "من نحن",
    contact: "اتصل بنا",
    cart: "السلة",
    search: "البحث عن العطور...",

    // Homepage
    heroTitle: "رفيقكم",
    heroSubtitle: "اليومي.",
    heroDescription:
      "مجموعة مختارة من العطور الأصيلة، انتقيت خصيصاً لتزيّن لحظاتكم.",
    shopCollection: "تسوق المجموعة",
    learnMore: "اعرف المزيد",

    // Features
    freeShipping: "شحن مجاني",
    freeShippingDesc: "توصيل مجاني للطلبات أكثر من 500 درهم",
    authenticProducts: "منتجات أصلية",
    authenticProductsDesc: "عطور أصلية 100% مضمونة",
    cashOnDelivery: "الدفع عند الإستلام",
    cashOnDeliveryDesc: "الدفع نقدا عند إستلام المنتج",

    // Products
    featuredFragrances: "العطور المميزة",
    featuredDescription: "اكتشف عطورنا الأكثر شعبية ورواجاً، المختارة بعناية.",
    viewDetails: "عرض التفاصيل",
    viewAllProducts: "عرض جميع المنتجات",
    addToCart: "أضف للسلة",
    sortByLabel: "الترتيب حسب",
    ourPerfumeCollection: "مجموعة العطور لدينا",
    discoverCompleteRange: "اكتشف مجموعتنا الكاملة من العطور الفاخرة لكل مناسبة وشخصية.",
    allCategories: "جميع الفئات",
    productRating: "تقييم العطر",
    gender: "النوع",
    all: "الكل",
    women: "نساء",
    men: "رجال",
    sortBy: "الترتيب حسب...",
    featured: "المميزة",
    priceLowToHigh: "السعر: من الأقل إلى الأعلى",
    priceHighToLow: "السعر: من الأعلى إلى الأقل",
    season: "الموسم",
    summer: "صيف",
    winter: "شتاء",
    allYear: "كل الفصول",
    scentFamily: "العائلة العطرية",
    woody: "خشبي",
    noProductsFound: "لم يتم العثور على منتجات",
    tryDifferentFilters: "حاول تعديل الفلاتر للعثور على ما تبحث عنه.",
    clearFilters: "مسح الفلاتر",
    added: "تمت الإضافة",


    // Product Detail
    brand: "العلامة التجارية",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    quantity: "الكمية",
    addToWishlist: "أضف للمفضلة",
    shareProduct: "شارك المنتج",
    productDescription: "وصف المنتج",
    customerReviews: "تقييمات العملاء",

    // Cart
    shoppingCart: "سلة التسوق",
    cartEmpty: "سلتك فارغة",
    cartEmptyDesc: "يبدو أنك لم تضف أي عناصر إلى سلتك بعد.",
    continueShopping: "متابعة التسوق",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    tax: "الضريبة",
    total: "المجموع",
    promoCode: "كود الخصم",
    apply: "تطبيق",
    proceedToCheckout: "المتابعة للدفع",
    remove: "إزالة",
    deliveryInformation: "معلومات التوصيل",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    city: "المدينة",
    selectCity: "اختر مدينة",
    address: "العنوان",
    placeOrder: "تأكيد الطلب",
    placingOrder: "...جاري إرسال الطلب",

    // About
    ourStoryTitle: "قصتنا مع العطور",
    ourStoryDesc1:
      "تأسست في عام 2015، بدأنا رحلتنا بمهمة بسيطة: جعل العطور الفاخرة في متناول الجميع. ما بدأ كمتجر صغير نما ليصبح وجهة موثوقة لعشاق العطور في جميع أنحاء العالم.",
    ourStoryDesc2:
      "نؤمن أن العطر المناسب له القدرة على تحويل يومك، وتعزيز ثقتك، وخلق ذكريات دائمة. لهذا السبب نختار مجموعتنا بعناية لتشمل فقط أفضل العطور من العلامات التجارية المشهورة والحرفيين الناشئين.",
    ourValues: "قيمنا",
    ourValuesDesc: "هذه المبادئ الأساسية توجه كل ما نقوم به، من اختيار منتجاتنا إلى خدمة عملائنا.",
    qualityFirst: "الجودة أولاً",
    qualityFirstDesc: "نحصل فقط على عطور أصلية وعالية الجودة من موردين وعلامات تجارية موثوقة.",
    customerFocus: "التركيز على العميل",
    customerFocusDesc: "رضاكم هو أولويتنا. نحن هنا لمساعدتك في العثور على عطرك المثالي.",
    globalReach: "الوصول العالمي",
    globalReachDesc: "نشحن في جميع أنحاء العالم، نجلب العطور الفاخرة للعملاء في جميع أنحاء العالم.",
    passion: "الشغف",
    passionDesc: "نحن متحمسون للعطور ونحب مشاركة هذا الحماس مع عملائنا.",
    meetOurTeam: "تعرف على فريقنا",
    meetOurTeamDesc: "فريقنا المتخصص من خبراء العطور هنا لمساعدتك في اكتشاف عطرك المميز.",

    // Contact
    getInTouch: "تواصل معنا",
    getInTouchDesc: "هل لديك أسئلة حول عطورنا أو تحتاج مساعدة في العثور على عطرك المثالي؟ نود أن نسمع منك.",
    sendMessage: "أرسل لنا رسالة",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    phoneOptional: "الهاتف (اختياري)",
    subject: "الموضوع",
    message: "الرسالة",
    sendMessageBtn: "إرسال الرسالة",
    visitOurStore: "زر متجرنا",
    callUs: "اتصل بنا",
    emailUs: "راسلنا",
    businessHours: "ساعات العمل",

    // Newsletter
    newsletterTitle: "ابق في عالم العطور",
    newsletterDescription:
      "اشترك في نشرتنا الإخبارية وكن أول من يعرف عن الوصولات الجديدة والعروض الحصرية ونصائح العطور.",
    subscribe: "اشترك",
    enterEmail: "أدخل بريدك الإلكتروني",
    subscribing: "...جاري الاشتراك",

    // Product categories
    oriental: "شرقي",
    floral: "زهري",
    fresh: "منعش",
    //citrus: "حمضي",
    gourmand: "حلو",
    aromatic: "عطري",

    // Common
    new: "جديد",
    sale: "تخفيض",
    reviews: "تقييم",
    save: "وفر",
    size: "الحجم",
    description: "الوصف",
    fragranceNotes: "نوتات العطر",
    topNotes: "النوتات العلوية",
    middleNotes: "النوتات الوسطى",
    baseNotes: "النوتات القاعدية",
  },
} as const

export type TranslationKey = keyof typeof translations.en

export function getTranslation(lang: Language, key: TranslationKey): string {
  return translations[lang][key] || translations.en[key]
}
