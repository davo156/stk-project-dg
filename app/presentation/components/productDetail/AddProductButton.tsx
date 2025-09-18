import { globalColors } from '@/app/config/app-theme';
import { Product } from '@/app/core/entities/product.entity';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
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
        <Pressable
            style={ styles.button }
            onPress={ handlePressButton }
        >
            <Text style={ styles.txtButton }>{ textButton }</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: globalColors.accent,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})