import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import VoiceHealthAssistant from '../components/voice-health-assistance';

export default function ConsultScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Consult</Text>
        <Text style={styles.subtitle}>Symptom checker, camera diagnosis, and voice assistant.</Text>
        <View style={{ marginTop: 16 }}>
          <VoiceHealthAssistant />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 6
  }
});


