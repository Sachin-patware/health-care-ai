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

export default function EducationScreen({ navigation }) {
  // Example handlers (replace with your navigation or feature logic)
  const handleTips = () => {
    // navigation.navigate('HealthTips');
    alert("Health Tips feature coming soon!");
  };
  const handleArticles = () => {
    // navigation.navigate('Articles');
    alert("Articles feature coming soon!");
  };
  const handleAudio = () => {
    // navigation.navigate('AudioLessons');
    alert("Audio Lessons feature coming soon!");
  };
  const handleQuiz = () => {
    // navigation.navigate('Quizzes');
    alert("Quizzes feature coming soon!");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Education</Text>
        <Text style={styles.subtitle}>Tips, articles, audio, and quizzes.</Text>

        <View style={styles.toolsContainer}>
          <TouchableOpacity style={styles.card} onPress={handleTips}>
            <Ionicons name="bulb-outline" size={36} color={colors.primary} />
            <Text style={styles.cardTitle}>Health Tips</Text>
            <Text style={styles.cardDesc}>Daily tips for better health.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleArticles}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={36}
              color={colors.primary}
            />
            <Text style={styles.cardTitle}>Articles</Text>
            <Text style={styles.cardDesc}>Read trusted health articles.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleAudio}>
            <Ionicons name="headset-outline" size={36} color={colors.primary} />
            <Text style={styles.cardTitle}>Audio Lessons</Text>
            <Text style={styles.cardDesc}>Listen to health education.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={handleQuiz}>
            <FontAwesome5
              name="question-circle"
              size={34}
              color={colors.primary}
            />
            <Text style={styles.cardTitle}>Quizzes</Text>
            <Text style={styles.cardDesc}>Test your health knowledge.</Text>
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
