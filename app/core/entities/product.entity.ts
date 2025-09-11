export interface Product {
  id: number,
  title: string,
  description: string,
  price: number,
  category: string,
  images: string[],
  thumbnail: string,
  reviews: ProductReview[]
}

export interface ProductReview {
  id: number,
  rating: number,
  comment: string,
  date: Date,
  reviewerName: string,
}