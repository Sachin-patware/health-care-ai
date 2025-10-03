import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function MyHealthScreen() {
  // Example handlers (replace with navigation or logic)
  const handleRecords = () => alert("Health Records feature coming soon!");
  const handleHistory = () => alert("Medical History feature coming soon!");
  const handleExport = () => alert("Export Data feature coming soon!");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>My Health</Text>
        <Text style={styles.subtitle}>Records, history, and exports.</Text>

        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card} onPress={handleRecords}>
            <Ionicons
              name="document-text-outline"
              size={36}
              color={colors.primary}
            />
            <Text style={styles.cardTitle}>Health Records</Text>
            <Text style={styles.cardDesc}>
              View your health records and reports.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleHistory}>
            <MaterialCommunityIcons
              name="history"
              size={36}
              color={colors.primary}
            />
            <Text style={styles.cardTitle}>Medical History</Text>
            <Text style={styles.cardDesc}>
              See your past visits and treatments.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleExport}>
            <FontAwesome5 name="file-export" size={32} color={colors.primary} />
            <Text style={styles.cardTitle}>Export Data</Text>
            <Text style={styles.cardDesc}>
              Download or share your health data.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 18,
  },
  cardsContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    marginTop: 10,
    marginBottom: 4,
    textAlign: "center",
  },
  cardDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
