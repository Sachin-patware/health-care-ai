import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 1200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HealthCare AI</Text>
      <Text style={styles.subtitle}>Empowering community healthcare</Text>
      <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary
  },
  subtitle: {
    marginTop: 8,
    color: colors.textSecondary
  }
});


