// HomeScreen.tsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const features: {
    title: string;
    description: string;
    navigateTo: keyof RootStackParamList;
  }[] = [
    { title: "Lessons", description: "Learn IP concepts easily", navigateTo: "Lessons" },
    { title: "Games", description: "Play IP-based games", navigateTo: "Games" },
    { title: "Quizzes", description: "Test your IP knowledge", navigateTo: "Quizzes" },
    { title: "Puzzles", description: "Solve fun word puzzles", navigateTo: "Puzzles" },
    { title: "Assessments", description: "Take IP skill tests", navigateTo: "Assessment" },
    { title: "Scoreboard", description: "Track your progress", navigateTo: "Scoreboard" },
    { title: "IP Fun Facts", description: "Explore IP trivia & facts", navigateTo: "IPFunFacts" },
    { title: "Creative Studio", description: "Create your own IP ideas", navigateTo: "CreativeStudio" },
    { title: "Achievements", description: "Earn badges & rewards", navigateTo: "Achievements" },
    { title: "Daily Challenges", description: "New challenge each day", navigateTo: "DailyChallenges" },
    { title: "IPR Videos", description: "Watch IP learning videos", navigateTo: "IprVideos" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        🎓 MarkMaster - IP Awareness
      </Animatable.Text>

      <View style={styles.grid}>
        {features.map((feature, index) => (
          <Animatable.View
            key={index}
            animation={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
            delay={index * 150}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>{feature.title}</Text>
            <Text style={styles.cardDesc}>{feature.description}</Text>

            <TouchableOpacity
              style={styles.playButton}
              onPress={() => navigation.navigate(feature.navigateTo)}
            >
              <Text style={styles.playButtonText}>Open</Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f0f9ff", // ✅ solid light blue background
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0277bd",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  card: {
    width: "45%",
    backgroundColor: "#4fc3f7",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  cardDesc: {
    fontSize: 13,
    color: "#e1f5fe",
    textAlign: "center",
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: "#0288d1",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
