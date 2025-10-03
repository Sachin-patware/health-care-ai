import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, shadows } from "../theme/colors";
import { spacing } from "../theme/spacing";

const userName = "John";
const avatarUrl =
  "https://ui-avatars.com/api/?name=John&background=E3F0FF&color=007AFF&size=128";

const quickActions = [
  {
    key: "symptom",
    label: "Symptom Check",
    icon: (
      <MaterialCommunityIcons
        name="stethoscope"
        size={28}
        color={colors.primary}
      />
    ),
    color: "#E3F0FF",
    onPress: () => {},
  },
  {
    key: "camera",
    label: "Camera Diagnosis",
    icon: <Ionicons name="camera-outline" size={28} color={colors.success} />,
    color: "#E6F7F1",
    onPress: () => {},
  },
  {
    key: "emergency",
    label: "Emergency Alert",
    icon: <Ionicons name="alert-circle" size={28} color="#fff" />,
    color: colors.emergency,
    onPress: () => {},
    isEmergency: true,
  },
];

const healthTips = [
  {
    key: "tip1",
    image: "https://placehold.co/300x160/DEF6FF/007AFF?text=Drink+Water",
    text: "Stay hydrated! Drink at least 8 glasses of water daily.",
  },
  {
    key: "tip2",
    image: "https://placehold.co/300x160/E6F7F1/00C48C?text=Walk+Daily",
    text: "Take a 20-minute walk to boost your mood and health.",
  },
  {
    key: "tip3",
    image: "https://placehold.co/300x160/FFF9E3/FFB300?text=Eat+Fruits",
    text: "Add fresh fruits to your breakfast for vitamins.",
  },
];

const recentActivity = [
  {
    key: "1",
    icon: (
      <MaterialCommunityIcons name="doctor" size={20} color={colors.primary} />
    ),
    title: "Consulted Dr. Smith",
    date: "Today, 9:00 AM",
  },
  {
    key: "2",
    icon: <Ionicons name="medkit-outline" size={20} color={colors.success} />,
    title: "Blood Pressure Check",
    date: "Yesterday, 6:30 PM",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: spacing.lg }}
    >
      {/* Greeting and Avatar */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.name}>{userName}</Text>
        </View>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      </View>

      {/* Health Status Summary */}
      <View style={[styles.statusCard, shadows.card]}>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <Ionicons name="heart" size={22} color={colors.primary} />
            <Text style={styles.statusValue}>72</Text>
            <Text style={styles.statusLabel}>BPM</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="water" size={22} color={colors.success} />
            <Text style={styles.statusValue}>98%</Text>
            <Text style={styles.statusLabel}>SpO₂</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="thermometer" size={22} color={colors.accent} />
            <Text style={styles.statusValue}>36.6°C</Text>
            <Text style={styles.statusLabel}>Temp</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.key}
            style={[
              styles.quickCard,
              { backgroundColor: action.color },
              action.isEmergency && styles.emergencyCard,
            ]}
            activeOpacity={0.85}
            onPress={action.onPress}
          >
            <View
              style={[
                styles.quickIcon,
                action.isEmergency && { backgroundColor: "#fff" },
              ]}
            >
              {action.icon}
            </View>
            <Text
              style={[
                styles.quickLabel,
                action.isEmergency && { color: "#fff", fontWeight: "700" },
              ]}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Health Tips Carousel */}
      <Text style={styles.sectionTitle}>Health Tips</Text>
      <FlatList
        data={healthTips}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 14 }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={[styles.tipCard, shadows.card]}>
            <Image source={{ uri: item.image }} style={styles.tipImage} />
            <Text style={styles.tipText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityList}>
        {recentActivity.map((act) => (
          <View key={act.key} style={[styles.activityItem, shadows.card]}>
            <View style={styles.activityIcon}>{act.icon}</View>
            <View>
              <Text style={styles.activityTitle}>{act.title}</Text>
              <Text style={styles.activityDate}>{act.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  greeting: {
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: "400",
    marginBottom: 2,
  },
  name: {
    fontSize: 22,
    color: colors.text,
    fontWeight: "700",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E3F0FF",
  },
  statusCard: {
    backgroundColor: "#F7FBFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: spacing.lg,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusItem: {
    alignItems: "center",
    flex: 1,
  },
  statusValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginTop: 4,
  },
  statusLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  quickGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
    gap: 12,
  },
  quickCard: {
    flex: 1,
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 18,
    marginHorizontal: 2,
    minWidth: 100,
  },
  quickIcon: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  quickLabel: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "500",
    textAlign: "center",
  },
  emergencyCard: {
    backgroundColor: colors.emergency,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: colors.emergency,
    shadowOpacity: 0.15,
  },
  sectionTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    color: colors.text,
    fontWeight: "700",
    fontSize: 18,
  },
  tipCard: {
    width: 240,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
  tipImage: {
    width: "100%",
    height: 100,
    backgroundColor: "#E3F0FF",
  },
  tipText: {
    padding: 12,
    color: colors.text,
    fontSize: 14,
  },
  activityList: {
    marginTop: 2,
    gap: 10,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 6,
  },
  activityIcon: {
    marginRight: 14,
    backgroundColor: "#E3F0FF",
    borderRadius: 8,
    padding: 6,
  },
  activityTitle: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "600",
  },
  activityDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
