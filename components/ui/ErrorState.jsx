import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export default function ErrorState({ title = 'Something went wrong', action }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  title: { color: colors.emergency, fontWeight: '700' }
});


