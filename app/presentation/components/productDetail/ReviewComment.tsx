import { globalStyles } from '@/app/config/app-theme';
import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProductReview } from '../../../core/entities/product.entity';

interface Props {
  review: ProductReview;
}

export const ReviewComment = ({ review }: Props) => {

  const formattedDate = format(review.date, 'MMMM do, yyyy')

  return (
    <View style={ styles.container }>
      <View style={ styles.nameContainer }>
        <Text style={{ ...globalStyles.titleBold, paddingRight: 10 } }>{ review.reviewerName }</Text>
        <Text style={ globalStyles.date }>{ formattedDate }</Text>
      </View>
      <Text style={ globalStyles.description }>{ review.comment }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5
  },
  nameContainer: {
    flexDirection: 'row',
  }
})