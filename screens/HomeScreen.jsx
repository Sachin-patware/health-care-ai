import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors, shadows } from '../theme/colors';
import { spacing } from '../theme/spacing';
// Emergency FAB is now global in navigation

const Card = ({ title, subtitle, color, onPress, icon }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[styles.card, shadows.card]}>
    <View style={[styles.cardIcon, { backgroundColor: color }]}>
      {icon}
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.greeting}>Hello 👋</Text>
        <Text style={styles.summary}>Your health at a glance</Text>

        <View style={styles.quickRow}>
          <Card title="Symptom Check" subtitle="Describe issues" color={colors.accent} onPress={() => {}} />
          <Card title="Camera" subtitle="Analyze photo" color={colors.primary} onPress={() => {}} />
        </View>
        <View style={styles.quickRow}>
          <Card title="Emergency" subtitle="Send alert" color={colors.emergency} onPress={() => {}} />
          <Card title="My Health" subtitle="Records & history" color={colors.success} onPress={() => {}} />
        </View>

        <Text style={styles.sectionTitle}>Health Tips</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
          {[1,2,3].map((i) => (
            <View key={i} style={[styles.tipCard, shadows.card]}>
              <Image source={{ uri: `https://placehold.co/300x160?text=Tip+${i}` }} style={styles.tipImage} />
              <Text style={styles.tipText}>Stay hydrated and take a short walk today.</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={[styles.activityCard, shadows.card]}>
          <Text style={styles.activityText}>No recent consults. Start a new checkup.</Text>
        </View>
      </ScrollView>

      {/* Global Emergency FAB is rendered in navigation layout */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text
  },
  summary: {
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.xl
  },
  quickRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTitle: {
    color: colors.text,
    fontWeight: '700'
  },
  cardSubtitle: {
    color: colors.textSecondary,
    marginTop: 2
  },
  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    color: colors.text,
    fontWeight: '700',
    fontSize: 18
  },
  tipCard: {
    width: 260,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden'
  },
  tipImage: {
    width: '100%',
    height: 120
  },
  tipText: {
    padding: 12,
    color: colors.text
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16
  },
  activityText: {
    color: colors.textSecondary
  }
});

