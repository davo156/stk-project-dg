import { Result } from "../interfaces/products.response";

export class ProductMapper {
  static fromProductResponseResultToEntity( result: Result ) {
    return {
      id: result.id,
      title: result.title,
      description: result.description,
      price: result.price,
      category: result.category,
      images: result.images,
      thumbnail: result.thumbnail,
      reviews: result.reviews.map( review => ({
        id: Math.random(),
        rating: review.rating,
        comment: review.comment,
        date: new Date(review.date),
        reviewerName: review.reviewerName,
      }))
    }
  }
}