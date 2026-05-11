export type Category = {
  name: string;
  slug: string;
  url: string;
};

export interface Product {
  id: number;
  category: string;
  description: string;
  images: string[];
  price: number;
  title: string;
}

export interface CartProduct extends Product {
  amount: number;
}
