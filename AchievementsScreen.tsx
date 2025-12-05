import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";

const STORAGE = "mm_achievements_v2";

const defaultAchievements = [
  { id: "a1", title: "First Steps", desc: "Completed your first lesson 🎯", earned: false },
  { id: "a2", title: "Quiz Starter", desc: "Finished your first quiz 🧠", earned: false },
  { id: "a3", title: "Puzzle Solver", desc: "Solved 5 brain puzzles 🧩", earned: false },
  { id: "a4", title: "Game Player", desc: "Played 3 learning games 🎮", earned: false },
  { id: "a5", title: "IP Champion", desc: "Reached 200 total points 🏅", earned: false },
];

const funnyRewards = ["😂", "😎", "🤩", "🎉", "🥳", "🤖", "🦄", "🐱‍👓"];

export default function AchievementsScreen() {
  const [items, setItems] = useState<typeof defaultAchievements>(defaultAchievements);
  const [name, setName] = useState("Learner");
  const [highScore, setHighScore] = useState(0);
  const [emoji, setEmoji] = useState("🥳");

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE);
        if (raw) {
          const parsed = JSON.parse(raw);
          setItems(parsed.items || defaultAchievements);
          setName(parsed.name || "Learner");
          setHighScore(parsed.highScore || 0);
          setEmoji(parsed.emoji || "🥳");
        }
      } catch (e) {
        console.log("Load error", e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE, JSON.stringify({ items, name, highScore, emoji })).catch(() => {});
  }, [items, name, highScore, emoji]);

  const toggleEarned = (id: string) => {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, earned: !it.earned } : it)));
  };

  const simulateScore = () => {
    // Fake score logic for demo
    const newScore = Math.floor(Math.random() * 100);
    setHighScore(newScore);

    if (newScore > 80) setEmoji("🤩");
    else if (newScore > 60) setEmoji("😎");
    else if (newScore > 40) setEmoji("😂");
    else setEmoji("🤖");

    Speech.speak(`Congratulations ${name}! You scored ${newScore} points! Great job!`);
  };

  const congratulate = () => {
    Speech.speak(`Hey ${name}! You’re doing amazing! Keep earning those badges!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.Text animation="bounceInDown" style={styles.title}>
        🏆 Achievements
      </Animatable.Text>
      <Text style={styles.intro}>
        Collect badges and unlock funny rewards for your learning journey!
      </Text>

      {items.map((ach, i) => (
        <Animatable.View
          key={ach.id}
          animation="fadeInUp"
          delay={i * 150}
          style={[styles.card, ach.earned ? styles.earned : {}]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.achTitle}>{ach.title}</Text>
            <Text style={styles.achDesc}>{ach.desc}</Text>
          </View>
          <TouchableOpacity
            style={styles.badgeBtn}
            onPress={() => toggleEarned(ach.id)}
          >
            <Text style={styles.badgeText}>
              {ach.earned ? "✅ Earned" : "Mark Earned"}
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      ))}

      <Animatable.View animation="bounceIn" delay={800} style={styles.rewardCard}>
        <Text style={styles.rewardTitle}>🎯 Score Achievements</Text>
        <Text style={styles.scoreText}>Highest Score: {highScore}</Text>

        <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.emoji}>
          {emoji}
        </Animatable.Text>

        <Text style={styles.nameText}>{name}</Text>

        <TouchableOpacity style={styles.congratsBtn} onPress={simulateScore}>
          <Text style={styles.congratsText}>🎮 Update & Celebrate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.voiceBtn} onPress={congratulate}>
          <Text style={styles.voiceText}>🔊 Speak Congrats</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 18,
    backgroundColor: "#fffaf0",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 8,
    color: "#ff8f00",
  },
  intro: { color: "#444", marginBottom: 16, fontSize: 15, textAlign: "center" },
  card: {
    width: "94%",
    backgroundColor: "#fff3e0",
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  earned: { backgroundColor: "#e8f5e9" },
  achTitle: { fontWeight: "800", fontSize: 16 },
  achDesc: { marginTop: 4, color: "#555" },
  badgeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ff8f00",
    borderRadius: 8,
  },
  badgeText: { color: "#fff", fontWeight: "700" },

  rewardCard: {
    marginTop: 25,
    width: "95%",
    backgroundColor: "#e3f2fd",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },
  rewardTitle: { fontSize: 20, fontWeight: "800", color: "#1976d2" },
  scoreText: { fontSize: 18, marginVertical: 8, fontWeight: "600" },
  emoji: {
    fontSize: 70,
    textAlign: "center",
    marginVertical: 10,
  },
  nameText: { fontSize: 18, fontWeight: "700", color: "#444", marginBottom: 10 },
  congratsBtn: {
    backgroundColor: "#1976d2",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginVertical: 6,
  },
  congratsText: { color: "#fff", fontWeight: "800" },
  voiceBtn: {
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  voiceText: { color: "#fff", fontWeight: "700" },
});
