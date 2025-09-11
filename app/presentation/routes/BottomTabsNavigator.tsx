import { globalColors } from "@/app/config/app-theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CustomHeader } from "../components/header/CustomHeader";
import { IonIcon } from "../components/shared/IonIcon";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { HomeStackNavigator } from "./HomeStackNavigator";

const Tab = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: globalColors.accent
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={ HomeStackNavigator }
        options={{ 
          title: 'Home tab', 
          tabBarIcon: ({ color }) => ( <IonIcon name="home-outline" color={ color } /> ), 
          header: () => (<CustomHeader image='home-outline' />)
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ ProfileScreen }
        options={{ 
          title: 'Profile tab', 
          tabBarIcon: ({ color }) => ( <IonIcon name="person-outline" color={ color } /> ),
          header: () => (<CustomHeader image='person-outline' />)
        }} 
      />
    </Tab.Navigator>
  );
}