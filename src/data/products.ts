export interface WeightOption {
  label: string;
  price: number;
}

export interface ProductModel {
  id: number;
  name: string;
  category: string;
  image: string;
  additionalImages: string[];
  weights: WeightOption[];
  about?: string;
  description?: string;
  howToUse?: string;
  videoUrl?: string;
}

export const PRODUCTS: ProductModel[] = [
  {
    id: 1,
    name: "Black Sesame Seeds",
    category: "Spices",
    image: "/products/BlackSesameseed.jpg",
    additionalImages: ["/product-back/Black-Sesame-Seeds-Back.png", "/logos/certificate-product-logo.jpg"],
    weights: [{ label: "100g", price: 95 }, { label: "200g", price: 180 }],
    about: "Black Sesame seed phytosterols lower cholesterol are good source of fiber with nutty flavor, it is called the queen of oil seeds delight gift from nature, it has number of benefits, it widens metabolic function, especially facilitates hair and skin health, it is generous quantity of vitamins and also its absorption. ",
    description: "Bubble Organic Black Sesame seed are more diverse, extremely well-known ingredient in all cuisine, especially Indians. Our vision is to provide the highest quality of organic products for genuine price. Our products are special because there is no refine or products gone under polishing process and no addition of artificial aroma. We take great delight to ensure the nutrient substance in food and its organic taste. Real organic products undergo traditional process of harvest where farmer has the practices of making the grains, pulses, rise etc., to dry directly under sunlight and processing by beating the grains for removing the pods by cracking and scratching for removing husk and outer covering, cleaning by natural way for removing soil and stone or winnowing method used to remove skins. Our products are made from premium quality; undergo austere and accurate laboratory ordeal to meet FSSAI food safety standard norm. Our products are packed in good hygienic condition.",
    howToUse: "Black Sesame seed are magnificent spice can be use directly in our dishes. Fresh and roasted seeds are used commonly in snacks and also in traditional foods; it is common in continental foods for incredible flavors. These tiny seeds are used as topping on breadsticks and burger buns.",
    videoUrl: "https://www.youtube.com/embed/nKvjdbTeGjQ"
  },
  {
    id: 2,
    name: "Idli Rice",
    category: "Rice",
    image: "/products/Idli-rice.jpg",
    additionalImages: ["/placeholder-rice-1.jpg", "//logo/certificate-product-logo.jpg"],
    weights: [{ label: "1kg", price: 140 }, { label: "2kg", price: 275 }],
    description: "Specialty rice variety perfect for making soft, fluffy idlis. Grown organically without pesticides or chemicals. Known for its excellent fermentation properties.",
    howToUse: "Soak rice for 4-6 hours, grind with urad dal, ferment overnight, and steam to make idlis. Can also be used for dosas and other South Indian dishes.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 3,
    name: "Almond",
    category: "Nuts",
    image: "/products/Almond.jpg",
    additionalImages: ["/placeholder-almond-1.jpg", "/placeholder-almond-2.jpg"],
    weights: [{ label: "100g", price: 189 }],
    description: "Premium quality almonds grown in organic orchards. Rich in vitamin E, healthy fats, and protein. Perfect for snacking or adding to various recipes.",
    howToUse: "Eat raw as a snack, add to trail mix, or use in baking. Soak overnight for better digestion. Can be ground into almond flour for gluten-free baking.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 4,
    name: "Organic Red Chilli Powder",
    category: "Masalas",
    image: "/products/Red-chilli-powder.jpg",
    additionalImages: ["/placeholder-chilli-1.jpg", "/placeholder-chilli-2.jpg"],
    weights: [{ label: "100g", price: 140 }, { label: "200g", price: 275 }],
    description: "Authentic red chilli powder made from premium quality organic chillies. Adds perfect heat and color to your dishes without artificial additives.",
    howToUse: "Use in curries, marinades, pickles, and spice blends. Start with small amounts and adjust according to taste. Store in airtight container away from light.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 5,
    name: "Organic Fox Tail Millet",
    category: "Millets",
    image: "/products/Foxtail-millet.jpg",
    additionalImages: ["/placeholder-millet-1.jpg", "/placeholder-millet-2.jpg"],
    weights: [{ label: "500g", price: 110 }, { label: "1Kg", price: 215 }],
    description: "Nutritious fox tail millet grown organically. High in fiber, protein, and essential minerals. A healthier alternative to rice and wheat.",
    howToUse: "Cook like rice - boil in water for 15-20 minutes. Can be used in upma, khichdi, or as a rice substitute. Also great for making flatbreads or porridge.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 6,
    name: "Toor Dal",
    category: "Pulses",
    image: "/products/Toor-dal.jpg",
    additionalImages: ["/placeholder-toor-1.jpg", "/placeholder-toor-2.jpg"],
    weights: [{ label: "500g", price: 175 }, { label: "1Kg", price: 275 }],
    description: "Premium quality toor dal (pigeon pea) from organic farms. Rich in protein and essential nutrients. Perfect for making traditional Indian dals and curries.",
    howToUse: "Pressure cook with water and spices for 4-5 whistles. Can be used to make sambar, dal tadka, or various lentil-based dishes. Soak for 30 minutes before cooking for better results.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 7,
    name: "Green Gram",
    category: "Cereals",
    image: "/products/Green-gram.jpg",
    additionalImages: ["/placeholder-gram-1.jpg", "/placeholder-gram-2.jpg"],
    weights: [{ label: "500g", price: 160 }, { label: "1Kg", price: 295 }],
    description: "Organic green gram (moong dal) packed with protein and nutrients. Easy to digest and perfect for various culinary preparations.",
    howToUse: "Can be used whole or split. Make dal, sprouts, or use in khichdi. For sprouts, soak overnight and keep moist for 24-48 hours. Great for fasting recipes.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 8,
    name: "Pumpkin Seeds",
    category: "Seeds",
    image: "/products/Pumpkin-seed.jpg",
    additionalImages: ["/placeholder-pumpkin-1.jpg", "/placeholder-pumpkin-2.jpg"],
    weights: [{ label: "100g", price: 115 }],
    description: "Nutrient-dense pumpkin seeds from organic pumpkins. Rich in zinc, magnesium, and healthy fats. Perfect for snacking and adding to various dishes.",
    howToUse: "Roast lightly with salt for snacking. Add to salads, trail mix, or sprinkle on yogurt. Can be ground into powder for smoothies or baking.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 9,
    name: "Wheat Flour",
    category: "Flours",
    image: "/products/Wheat-flour.jpg",
    additionalImages: ["/placeholder-flour-1.jpg", "/placeholder-flour-2.jpg"],
    weights: [{ label: "1Kg", price: 80 }],
    description: "Finely milled organic wheat flour made from premium quality wheat. Perfect for making chapatis, parathas, and various traditional Indian breads.",
    howToUse: "Knead with water to make dough for chapatis. Can be used for making puris, parathas, or as a base for various baked goods. Store in airtight container.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 10,
    name: "Himalayan Pink Salt Crystal",
    category: "Bubble Organic Special Products",
    image: "/products/pink-salt-crystal.jpg",
    additionalImages: ["/placeholder-salt-1.jpg", "/placeholder-salt-2.jpg"],
    weights: [{ label: "500g", price: 95 }],
    description: "Natural Himalayan pink salt crystals rich in minerals. Unrefined and unprocessed, containing over 80 trace minerals essential for health.",
    howToUse: "Use as regular salt in cooking and seasoning. Can be ground in a mortar and pestle for finer texture. Perfect for bath salts or mineral-rich cooking.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
];
