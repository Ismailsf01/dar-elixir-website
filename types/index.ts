// This represents a single product from your main product list
export interface SizeOption {
    size: string;
    price: number;
    originalPrice?: number;
}

export interface Product {
    _id: string;
    name: string;
    brand: string;
    // price: number;
    // originalPrice: number;
    image: string;
    rating: number;
    category: string;
    isNew: boolean;
    isSale: boolean;
    gender: string;
    season: string;
    // size: string;
    description: string;
    topNotes: string;
    middleNotes: string;
    baseNotes: string;
    sizes: SizeOption[];
}


// This represents a product once it's inside the cart
export interface CartItem extends Product {
    quantity: number;
    selectedSize: string;
    currentPrice: number;
}

export type SortOrder = "default" | "price-asc" | "price-desc" | "rating-desc";