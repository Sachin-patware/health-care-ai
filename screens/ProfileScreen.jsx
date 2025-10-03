import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function ProfileScreen({ navigation }) {
  // Example handlers (replace with your navigation or logic)
  const handleEditProfile = () => alert("Edit Profile feature coming soon!");
  const handleLanguage = () => alert("Language selection coming soon!");
  const handleSettings = () => alert("Settings feature coming soon!");
  const handleAbout = () => alert("About App feature coming soon!");
  const handleLogout = () => {
    // Navigate to LoginScreen and reset navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://ui-avatars.com/api/?name=John+Doe&background=eee&color=007AFF&size=128",
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>johndoe@email.com</Text>
        </View>

        <View style={styles.options}>
          <TouchableOpacity style={styles.option} onPress={handleEditProfile}>
            <Ionicons
              name="person-circle-outline"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleLanguage}>
            <Ionicons
              name="language-outline"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.optionText}>Language</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleSettings}>
            <Ionicons
              name="settings-outline"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleAbout}>
            <MaterialIcons
              name="info-outline"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.optionText}>About App</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, styles.logout]}
            onPress={handleLogout}
          >
            <FontAwesome5 name="sign-out-alt" size={22} color="#FF3B30" />
            <Text style={[styles.optionText, { color: "#FF3B30" }]}>
              Logout
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
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  options: {
    marginTop: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
    fontWeight: "500",
  },
  logout: {
    backgroundColor: "#fff0f0",
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
});
