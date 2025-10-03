import React from 'react';
import RootNavigation from './navigation';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <RootNavigation />
    </>
  );
}

