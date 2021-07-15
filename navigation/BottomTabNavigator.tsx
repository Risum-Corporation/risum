/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

 import { Ionicons } from '@expo/vector-icons';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { createStackNavigator } from '@react-navigation/stack';
 import * as React from 'react';
 
 import Colors from '../constants/Colors';
 import useColorScheme from '../hooks/useColorScheme';
 
 import Feed from '../screens/Feed';
 import HypeTrain from '../screens/HypeTrain';
 import WolfPack from '../screens/WolfPack';
 import AddMeme from '../screens/AddMeme';
 
 
 import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
 
 const BottomTab = createBottomTabNavigator<BottomTabParamList>();
 
 export default function BottomTabNavigator() {
   const colorScheme = useColorScheme();
 
   return (
     <BottomTab.Navigator
       initialRouteName="Feed"
       tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
       <BottomTab.Screen
         name="Feed"
         component={TabOneNavigator}
         options={{
           tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
         }}
       />
       <BottomTab.Screen
         name="HypeTrain"
         component={TabTwoNavigator}
         options={{
           tabBarIcon: ({ color }) => <TabBarIcon name="ios-train-sharp" color={color} />,
         }}
       />
 
       <BottomTab.Screen
         name="Alcateia"
         component={WolfPack}
         options={{
           tabBarIcon: ({ color }) => <TabBarIcon name="ios-people" color={color} />,
         }}
       />
 
       <BottomTab.Screen
         name="Postar"
         component={AddMeme}
         options={{
           tabBarIcon: ({ color }) => <TabBarIcon name="ios-add-circle" color={color} />,
         }}
       />
     </BottomTab.Navigator>
   );
 }
 
 // You can explore the built-in icon families and icons on the web at:
 // https://icons.expo.fyi/
 function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
   return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
 }
 
 // Each tab has its own navigation stack, you can read more about this pattern here:
 // https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
 const TabOneStack = createStackNavigator<TabOneParamList>();
 
 function TabOneNavigator() {
   return (
     <TabOneStack.Navigator>
 
       <TabOneStack.Screen
         name="Feed"
         component={Feed}
         options={{ headerTitle: 'Feed' }}
       />
       <>
       </>
     </TabOneStack.Navigator>
   );
 }
 
 const TabTwoStack = createStackNavigator<TabTwoParamList>();
 
 function TabTwoNavigator() {
   return (
 
     
     <TabTwoStack.Navigator>
       <TabTwoStack.Screen
         name="HypeTrain"
         component={HypeTrain}
         options={{ headerTitle: 'Player Here' }}
       />
     </TabTwoStack.Navigator>
   );
 }
 