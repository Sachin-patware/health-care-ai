import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function CHWToolsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>CHW Tools</Text>
        <Text style={styles.subtitle}>
          Patient management, quick consults, analytics.
        </Text>

        <View style={styles.toolsContainer}>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="people-circle" size={36} color={colors.primary} />
            <Text style={styles.cardTitle}>Patient List</Text>
            <Text style={styles.cardDesc}>View and manage your patients.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialIcons
              name="medical-services"
              size={36}
              color={colors.primary}
            />
            <Text style={styles.cardTitle}>Quick Consult</Text>
            <Text style={styles.cardDesc}>Start a new consult quickly.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <FontAwesome5 name="chart-bar" size={32} color={colors.primary} />
            <Text style={styles.cardTitle}>Analytics</Text>
            <Text style={styles.cardDesc}>See trends and reports.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Ionicons name="book-outline" size={36} color={colors.primary} />
            <Text style={styles.cardTitle}>Resources</Text>
            <Text style={styles.cardDesc}>Access guides and protocols.</Text>
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
    marginBottom: 4,
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: 18,
  },
  toolsContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
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
