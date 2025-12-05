// DailyChallengesScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import * as Animatable from "react-native-animatable";

const levels = [
  { id: "l1", title: "Level 1 — Basics", description: "3 quick MCQs about IP basics" },
  { id: "l2", title: "Level 2 — Copyrights", description: "3 questions about copyright" },
  { id: "l3", title: "Level 3 — Trademarks", description: "3 questions about trademarks" },
  { id: "l4", title: "Level 4 — Patents", description: "3 questions about patents" },
  { id: "l5", title: "Level 5 — Challenge", description: "A mixed tough challenge" },
];

export default function DailyChallengesScreen({ navigation }: any) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const startLevel = (lvl: typeof levels[number]) => {
    // For demo: show alert. In real app navigate to an assessment/quiz screen with that level’s questions.
    Alert.alert(lvl.title, lvl.description);
    // mark completed toggled for demo
    setCompleted((s) => ({ ...s, [lvl.id]: !s[lvl.id] }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>⚡ Daily Challenges</Animatable.Text>
      <Text style={styles.intro}>Small, daily IPR tasks to build habit and knowledge—complete levels for rewards!</Text>

      {levels.map((lvl, idx) => (
        <Animatable.View key={lvl.id} animation="fadeInUp" delay={idx * 80} style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.lvlTitle}>{lvl.title}</Text>
            <Text style={styles.lvlDesc}>{lvl.description}</Text>
          </View>
          <TouchableOpacity style={[styles.playBtn, completed[lvl.id] && styles.playCompleted]} onPress={() => startLevel(lvl)}>
            <Text style={styles.playText}>{completed[lvl.id] ? "Done ✓" : "Start"}</Text>
          </TouchableOpacity>
        </Animatable.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 18, backgroundColor: "#f0f4c3", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 6, color: "#827717" },
  intro: { color: "#555", marginBottom: 12, textAlign: "center" },
  card: { width: "94%", backgroundColor: "#fff9c4", padding: 12, borderRadius: 12, marginTop: 8, flexDirection: "row", alignItems: "center" },
  lvlTitle: { fontWeight: "800" },
  lvlDesc: { color: "#444", marginTop: 4 },
  playBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#f57f17", borderRadius: 8 },
  playCompleted: { backgroundColor: "#66bb6a" },
  playText: { color: "#fff", fontWeight: "700" },
});
