 
import { Product } from "@/app/core/entities/product.entity";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { ProductDetailScreen } from "../screens/products/ProductDetailScreen";

export type HomeStackParams = {
  Home: undefined;
  ProductDetail: { product: Product }
}

const Stack = createNativeStackNavigator();

export const HomeStackNavigator = () => {

  // const navigator = useNavigation();

  // useEffect(() => {
  //   navigator.setOptions({ headerShown: false });
  // }, [])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Products" 
        component={ HomeScreen }
      />
      <Stack.Screen 
        name="ProductDetail"
        options={{ title: '', headerBackButtonDisplayMode: 'minimal'}} 
        component={ ProductDetailScreen }
      />
    </Stack.Navigator>
  )
}