import React from 'react';
import { Image } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import StoreScreen from '../screens/StoreScreen';
import BrowseScreen from '../screens/BrowseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {COLORS} from '../theme/colors';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: 70,
          paddingTop: 14,
          width: '100%',          // Add this to control width
          marginHorizontal: 0,    // Add this to remove any margins
          position: 'absolute',   // Add this to ensure full width
          left: 0,               // Add this to align to left edge
          right: 0,              // Add this to align to right edge
          bottom: 0,
        },
        tabBarActiveTintColor: COLORS.background.primary,
        tabBarInactiveTintColor: COLORS.text.secondary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/home.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? COLORS.background.primary : COLORS.navbaricons
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/briefcase.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? COLORS.background.primary : COLORS.navbaricons
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/compass.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? COLORS.background.primary : COLORS.navbaricons
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/settings.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? COLORS.background.primary : COLORS.navbaricons
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
