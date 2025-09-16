 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";

export type HomeStackParams = {
  Home: undefined;
  // ProductDetail: { product: Product }
  //ProductDetail: { id: number }
  Profile: undefined

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
      {/* <Stack.Screen 
        name="ProductDetail" 
        component={ ProductDetailScreen }
      /> */}
      <Stack.Screen 
        name="Profile" 
        component={ ProfileScreen }
      />
    </Stack.Navigator>
  )
}