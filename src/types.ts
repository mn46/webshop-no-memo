export type Category = {
  id: number;
  creationAt: string;
  image: string;
  name: string;
  slug: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  category: Category;
  creationAt: string;
  description: string;
  images: string[];
  price: number;
  slug: string;
  title: string;
  updatedAt: string;
};
