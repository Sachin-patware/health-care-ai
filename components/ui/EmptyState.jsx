import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export default function EmptyState({ title = 'Nothing here yet', subtitle = 'Try adding something to get started.' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  title: { color: colors.text, fontWeight: '700' },
  subtitle: { color: colors.textSecondary, marginTop: 6 }
});


