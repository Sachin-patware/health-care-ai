import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from './auth';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import ConsultScreen from '../screens/ConsultScreen';
import MyHealthScreen from '../screens/MyHealthScreen';
import CHWToolsScreen from '../screens/CHWToolsScreen';
import EducationScreen from '../screens/EducationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EmergencyFAB from '../components/EmergencyFAB';
import EmergencyModal from '../components/EmergencyModal';
import { colors } from '../theme/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    text: colors.text,
    card: '#ffffff',
    border: '#e2e8f0'
  }
};

// Auth context moved to navigation/auth

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: '#fff', paddingBottom: 6, height: 60 },
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            Home: 'home',
            Consult: 'medkit',
            MyHealth: 'reader',
            CHWTools: 'construct',
            Education: 'book',
            Profile: 'person'
          };
          const name = iconMap[route.name] || 'ellipse';
          return <Ionicons name={name} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Consult" component={ConsultScreen} />
      <Tab.Screen name="MyHealth" component={MyHealthScreen} />
      <Tab.Screen name="CHWTools" component={CHWToolsScreen} />
      <Tab.Screen name="Education" component={EducationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function InnerNavigator() {
  const { isAuthenticated } = useAuth();
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [bootStage, setBootStage] = useState('splash'); // 'splash' | 'onboarding' | 'ready'

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {bootStage === 'splash' && (
          <Stack.Screen name="Splash" children={() => (
            <SplashScreen onDone={() => setBootStage('onboarding')} />
          )} />
        )}
        {bootStage === 'onboarding' && (
          <Stack.Screen name="Onboarding" children={() => (
            <OnboardingScreen onDone={() => setBootStage('ready')} />
          )} />
        )}
        {bootStage === 'ready' && (
          isAuthenticated ? (
            <Stack.Screen name="Main" children={() => (
              <>
                <AppTabs />
                <EmergencyFAB onPress={() => setIsEmergencyOpen(true)} />
                <EmergencyModal visible={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />
              </>
            )} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function RootNavigation() {
  return (
    <AuthProvider>
      <InnerNavigator />
    </AuthProvider>
  );
}

