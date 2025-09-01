import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DiaryScreen from '../screens/DiaryScreen';
import NewEntryScreen from '../screens/NewEntryScreen';
import EventsScreen from '../screens/EventsScreen';
import SermonsScreen from '../screens/SermonsScreen';
import PrayerScreen from '../screens/PrayerScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { Text } from 'react-native';
import { useAuth } from '../auth/AuthProvider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DiaryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DiaryList" component={DiaryScreen} options={{ title: 'Diary' }} />
      <Stack.Screen name="NewEntry" component={NewEntryScreen} options={{ title: 'New Entry' }} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Text>🏠</Text> }} />
      <Tab.Screen name="Diary" component={DiaryStack} options={{ tabBarIcon: () => <Text>📖</Text> }} />
      <Tab.Screen name="Events" component={EventsScreen} options={{ tabBarIcon: () => <Text>📅</Text> }} />
      <Tab.Screen name="Sermons" component={SermonsScreen} options={{ tabBarIcon: () => <Text>🎙️</Text> }} />
      <Tab.Screen name="Prayer" component={PrayerScreen} options={{ tabBarIcon: () => <Text>🙏</Text> }} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { user, initializing } = useAuth();

  // while initializing, you could return a splash screen
  if (initializing) {
    return null;
  }

  return user ? <MainTabs /> : <AuthStack />;
}