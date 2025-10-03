import React from 'react';
import RootNavigation from './navigation';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <StatusBar style="dark" />
        <RootNavigation />
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

