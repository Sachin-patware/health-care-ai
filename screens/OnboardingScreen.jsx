import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import PrimaryButton from '../components/PrimaryButton';

export default function OnboardingScreen({ onDone }) {
  const [role, setRole] = useState('Patient');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Choose your language and role</Text>

      <View style={styles.row}>
        {['Patient', 'CHW', 'Specialist'].map(r => (
          <TouchableOpacity key={r} onPress={() => setRole(r)} style={[styles.chip, role===r && styles.chipActive]}>
            <Text style={[styles.chipText, role===r && styles.chipTextActive]}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <PrimaryButton title="Continue" onPress={onDone} style={{ marginTop: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 8,
    color: colors.textSecondary,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 24
  },
  chip: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  chipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent
  },
  chipText: {
    color: colors.text
  },
  chipTextActive: {
    color: 'white',
    fontWeight: '700'
  }
});


