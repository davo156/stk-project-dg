import { Product } from '@/app/core/entities/product.entity';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { useProductUserPersistStore } from '../../hooks/useFavoriteProductsStore';

interface Props {
  product: Product;
}

export const AddProductButton = ({product}:Props) => {
    const {userProductList, addUserProduct, removeUserProduct} = useProductUserPersistStore();
    const [textButton, setTextButton] = useState('')
    const [addOrRemove, setAddOrRemove] = useState(true)

    useEffect(()=> {
        checkProductIsSelected(product.id)
    },[])

    const checkProductIsSelected = (id:number) => {
        const isInUserList = userProductList.filter( product =>(product.id === id));
        if (isInUserList.length) {
            setTextButton('Remove from my favorites');
            setAddOrRemove(false)
        }
        else {
            setTextButton('Add to my favorites')
            setAddOrRemove(true)
        }
    }

    const handlePressButton = () => {
        if( product!== undefined && addOrRemove) {
            addUserProduct(product)
            setTextButton('Remove from my favorites');
            setAddOrRemove(false)
        }
        else if (product!== undefined && !addOrRemove)  {
            removeUserProduct(product.id)
            setTextButton('Add to my favorites')
            setAddOrRemove(true)
        }
    }

    return (
        <Button title={textButton} onPress={handlePressButton} />
    )
}