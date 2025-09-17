import { useState } from "react";
import {
    FlatList, Image,
    LayoutChangeEvent,
    StyleSheet, View
} from "react-native";

type ImageList = {
    imageList: string[];
}

export function CarouselImg (props: ImageList) {
    const [containerWidth, setContainerWidth] = useState(0);

	const handleLayout = (event: LayoutChangeEvent) => {
    	const { width } = event.nativeEvent.layout;
    	if (width !== containerWidth) {
      		setContainerWidth(width);
    	}
  	};

    const renderItem = ({item}:any) => (
        <View style={[styles.imageContainer, 
			{ width: containerWidth,
			  height: containerWidth 
			}]} >
            <Image source={{ uri: item }} 
				style={styles.image} 
				resizeMode="cover"/>
        </View>
    );
	
	if (containerWidth === 0) {
    	return <View onLayout={handleLayout} style={{ flex: 1 }} />;
  	}

    return (
        <FlatList
            data={props.imageList}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={true}
            keyExtractor={(item, index) => `${index.toString()}-${item}`}
            snapToInterval={containerWidth} 
            decelerationRate="fast"
        />
  );

}

const styles = StyleSheet.create({
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
        borderRadius: 8
	},
});