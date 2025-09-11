import { globalStyles } from "@/app/config/app-theme"
import { ProductReview } from "@/app/core/entities/product.entity"
import { FlatList, Text, View } from "react-native"
import { ReviewComment } from "./ReviewComment"

interface listProps {
  reviews: ProductReview[]
}

export const ReviewsList = ({ reviews }: listProps ) => {
  return (
    <View>
      <Text style={ globalStyles.header2 }>Recent Reviews</Text>
      <FlatList 
        data = { reviews }
        renderItem={ ({ item }) => (
          <ReviewComment review={ item } />
        )}
        keyExtractor={ item => item.id.toString() }
        numColumns={ 1 }
        scrollEnabled= { false }
      />
      <View style={ globalStyles.line }/>
    </View>
  )
}