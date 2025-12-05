// LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }: any) {
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const roles = ["Student", "Teacher", "Parent"];

  const handleLogin = async () => {
    if (!role) {
      Alert.alert("⚠️ Role Missing", "Please select your role first!");
      return;
    }
    if (!name.trim()) {
      Alert.alert("⚠️ Name Missing", "Please enter your name!");
      return;
    }
    if (!email || !password) {
      Alert.alert("⚠️ Empty Fields", "Please enter email and password!");
      return;
    }

    try {
      // Save logged-in user name to AsyncStorage (used in Scoreboard)
      await AsyncStorage.setItem("loggedInUser", name.trim());
      Alert.alert("✅ Login Success", `Welcome ${name}!`);
      navigation.navigate("Home");
    } catch (err) {
      console.warn("AsyncStorage error:", err);
      Alert.alert("Error", "Failed to save user data.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Animatable.View animation="bounceInDown" iterationCount={1}>
          <Image
            source={require("./assets/images/logo.png")}
            style={styles.logoImg}
          />
        </Animatable.View>

        <Animatable.Text
          animation="fadeInDown"
          iterationCount={1}
          style={styles.logoText}
        >
          MarkMaster
        </Animatable.Text>

        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          style={styles.subtitle}
        >
          Empowering kids with IP knowledge 💡
        </Animatable.Text>

        <Animatable.View animation="fadeInUp" delay={200} style={styles.card}>
          <Text style={styles.label}>Select Role:</Text>
          <View style={styles.roleContainer}>
            {roles.map((r) => (
              <TouchableOpacity
                key={r}
                style={[
                  styles.roleButton,
                  role === r && styles.roleButtonSelected,
                ]}
                onPress={() => setRole(r)}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === r && styles.roleTextSelected,
                  ]}
                >
                  {r}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#666"
          />

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
          />

          {/* Password Input with visibility toggle */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Enter your Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#666"
              selectionColor="#000"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#4fa1f0"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>🚀 Login</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E6F4FE",
  },
  logoImg: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#007acc",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#222",
    marginBottom: 25,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffffdd",
    borderRadius: 20,
    width: "100%",
    padding: 20,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#4fa1f0",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  roleButtonSelected: {
    backgroundColor: "#4fa1f0",
  },
  roleText: {
    color: "#4fa1f0",
    fontWeight: "600",
  },
  roleTextSelected: {
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    width: "100%",
    color: "#000", // black text
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    paddingRight: 10,
  },
  eyeIcon: {
    marginLeft: -35,
  },
  loginBtn: {
    backgroundColor: "#4fa1f0",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
