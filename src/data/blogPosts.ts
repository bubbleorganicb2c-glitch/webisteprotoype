export interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  content?: string;
  date?: string;
  author?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Benefits of Organic Turmeric',
    description: 'Discover the amazing health benefits of using organic turmeric in your daily diet.',
    image: 'https://images.pexels.com/photos/4198939/pexels-photo-4198939.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Organic turmeric offers numerous health benefits including anti-inflammatory properties, antioxidant effects, and improved digestion. Learn how to incorporate this golden spice into your daily meals.',
    date: '2024-01-15',
    author: 'Dr. Priya Sharma'
  },
  {
    id: 2,
    title: 'The Power of Millets',
    description: 'Learn why ancient grains like millets are making a comeback in modern nutrition.',
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Millets are nutrient-dense grains that provide essential minerals, vitamins, and fiber. They are gluten-free and have a low glycemic index, making them perfect for modern dietary needs.',
    date: '2024-01-10',
    author: 'Rajesh Kumar'
  },
  {
    id: 3,
    title: 'Organic vs Conventional',
    description: 'Understanding the real difference between organic and conventional farming practices.',
    image: 'https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Organic farming avoids synthetic pesticides and fertilizers, promoting soil health and biodiversity. Learn about the certification process and benefits for consumers.',
    date: '2024-01-05',
    author: 'Meera Patel'
  },
  {
    id: 4,
    title: 'Spice Up Your Health',
    description: 'How traditional Indian spices can boost your immune system naturally.',
    image: 'https://images.pexels.com/photos/4198939/pexels-photo-4198939.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Indian spices like ginger, garlic, and cinnamon have powerful immune-boosting properties. Discover traditional remedies and modern research supporting their benefits.',
    date: '2023-12-28',
    author: 'Dr. Amit Singh'
  },
  {
    id: 5,
    title: 'Sustainable Farming Practices',
    description: 'How organic farming contributes to environmental sustainability.',
    image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Organic farming practices help preserve soil health, reduce water pollution, and support biodiversity. Learn about our commitment to sustainable agriculture.',
    date: '2023-12-20',
    author: 'Suresh Reddy'
  },
  {
    id: 6,
    title: 'Nutrition in Every Grain',
    description: 'Exploring the nutritional benefits of different grains and cereals.',
    image: 'https://images.pexels.com/photos/41123/pexels-photo-41123.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: 'Different grains offer unique nutritional profiles. From quinoa to amaranth, discover how to incorporate diverse grains into your diet for optimal health.',
    date: '2023-12-15',
    author: 'Dr. Kavita Rao'
  }
];
