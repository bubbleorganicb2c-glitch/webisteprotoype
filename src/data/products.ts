export interface WeightOption {
  label: string;
  price: number;
}

export interface ProductModel {
  id: number;
  name: string;
  category: string;
  image: string;
  weights: WeightOption[];
}

export const PRODUCTS: ProductModel[] = [
  { id: 1, name: "Black Sesame Seeds", category: "Spices", image: "/products/BlackSesameseed.jpg", weights: [{ label: "100g", price: 95 }, { label: "200g", price: 180 }] },
  { id: 2, name: "Idli Rice", category: "Rice", image: "/products/Idli-rice.jpg", weights: [{ label: "1kg", price: 140 }, { label: "2kg", price: 275 }] },
  { id: 3, name: "Almond", category: "Nuts", image: "/products/Almond.jpg", weights: [{ label: "100g", price: 189 }] },
  { id: 4, name: "Organic Red Chilli Powder", category: "Masalas", image: "/products/Red-chilli-powder.jpg", weights: [{ label: "100g", price: 140 }, { label: "200g", price: 275 }] },
  { id: 5, name: "Organic Fox Tail Millet", category: "Millets", image: "/products/Foxtail-millet.jpg", weights: [{ label: "500g", price: 110 }, { label: "1Kg", price: 215 }] },
  { id: 6, name: "Toor Dal", category: "Pulses", image: "/products/Toor-dal.jpg", weights: [{ label: "500g", price: 175 }, { label: "1Kg", price: 275 }] },
  { id: 7, name: "Green Gram", category: "Cereals", image: "/products/Green-gram.jpg", weights: [{ label: "500g", price: 160 }, { label: "1Kg", price: 295 }] },
  { id: 8, name: "Pumpkin Seeds", category: "Seeds", image: "/products/Pumpkin-seed.jpg", weights: [{ label: "100g", price: 115 }] },
  { id: 9, name: "Wheat Flour", category: "Flours", image: "/products/Wheat-flour.jpg", weights: [{ label: "1Kg", price: 80 }] },
  { id: 10, name: "Himalayan Pink Salt Crystal", category: "Bubble Organic Special Products", image: "/products/pink-salt-crystal.jpg", weights: [{ label: "500g", price: 95 }] },
];