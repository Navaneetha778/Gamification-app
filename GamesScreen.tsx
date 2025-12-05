import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";

// Question and Game types
type Question = { question: string; answer: string };
type Game = { type: string; levels: Question[][] };

// Full 10 IPR games
const games: Game[] = [
  {
    type: "IP Word Match",
    levels: [
      [{ question: "Scrambled: NTPAET", answer: "PATENT" }, { question: "Scrambled: MRRTEAADK", answer: "TRADEMARK" }],
      [{ question: "Scrambled: OPYHCRGHTI", answer: "COPYRIGHT" }, { question: "Scrambled: LIECNSSE", answer: "LICENSE" }],
      [{ question: "Scrambled: INNVETIO", answer: "INVENTION" }, { question: "Scrambled: IPLAW", answer: "IP LAW" }],
    ],
  },
  {
    type: "IP Quick Quiz",
    levels: [
      [{ question: "Patent protects?", answer: "Invention" }, { question: "Copyright protects?", answer: "Expression" }],
      [{ question: "Trademark protects?", answer: "Brand" }, { question: "License allows?", answer: "Use" }],
      [{ question: "IP should be?", answer: "Respected" }, { question: "Infringement is?", answer: "Illegal" }],
    ],
  },
  {
    type: "IP Fill in the Blanks",
    levels: [
      [{ question: "A ___ protects inventions.", answer: "Patent" }, { question: "A ___ protects logos.", answer: "Trademark" }],
      [{ question: "Books are protected by ___?", answer: "Copyright" }, { question: "IP law encourages ___?", answer: "Innovation" }],
      [{ question: "Unauthorized use is ___?", answer: "Illegal" }, { question: "Learning IP increases ___?", answer: "Awareness" }],
    ],
  },
  {
    type: "IP True/False",
    levels: [
      [{ question: "Copyright protects ideas.", answer: "False" }, { question: "Patent protects inventions.", answer: "True" }],
      [{ question: "Trademark protects brands.", answer: "True" }, { question: "License is not needed.", answer: "False" }],
      [{ question: "IP infringement is legal.", answer: "False" }, { question: "IPR awareness is important.", answer: "True" }],
    ],
  },
  {
    type: "IP Logo Match",
    levels: [
      [{ question: "Match logo: Apple", answer: "Apple" }, { question: "Match logo: Nike", answer: "Nike" }],
      [{ question: "Match logo: McDonald's", answer: "McDonald's" }, { question: "Match logo: Starbucks", answer: "Starbucks" }],
      [{ question: "Match logo: Twitter", answer: "Twitter" }, { question: "Match logo: Google", answer: "Google" }],
    ],
  },
  {
    type: "IP Crossword",
    levels: [
      [{ question: "Across: Protects inventions", answer: "PATENT" }, { question: "Down: Protects brand logo", answer: "TRADEMARK" }],
      [{ question: "Across: Protects books", answer: "COPYRIGHT" }, { question: "Down: Legal authorization", answer: "LICENSE" }],
      [{ question: "Across: Abbreviation for intellectual property", answer: "IPR" }, { question: "Down: Protectable creation", answer: "INVENTION" }],
    ],
  },
  {
    type: "IP Memory Game",
    levels: [
      [{ question: "Match PATENT with meaning", answer: "Invention" }, { question: "Match TRADEMARK with meaning", answer: "Brand" }],
      [{ question: "Match COPYRIGHT with meaning", answer: "Expression" }, { question: "Match LICENSE with meaning", answer: "Use" }],
      [{ question: "Match IPR with meaning", answer: "Protection" }, { question: "Match INNOVATION with meaning", answer: "New Ideas" }],
    ],
  },
  {
    type: "IP Riddle Game",
    levels: [
      [{ question: "I protect inventions and ideas, what am I?", answer: "Patent" }, { question: "I protect brand names?", answer: "Trademark" }],
      [{ question: "I protect artistic works?", answer: "Copyright" }, { question: "I allow legal use?", answer: "License" }],
      [{ question: "I stand for Intellectual Property?", answer: "IPR" }, { question: "I encourage new ideas?", answer: "Innovation" }],
    ],
  },
  {
    type: "IP Word Puzzle",
    levels: [
      [{ question: "Unscramble: NTPAET", answer: "PATENT" }, { question: "Unscramble: MRRTEAADK", answer: "TRADEMARK" }],
      [{ question: "Unscramble: OPYHCRGHTI", answer: "COPYRIGHT" }, { question: "Unscramble: LIECNSSE", answer: "LICENSE" }],
      [{ question: "Unscramble: INNVETIO", answer: "INVENTION" }, { question: "Unscramble: IPLAW", answer: "IP LAW" }],
    ],
  },
  {
    type: "IP Matching Quiz",
    levels: [
      [{ question: "Match Patent to", answer: "Invention" }, { question: "Match Trademark to", answer: "Brand" }],
      [{ question: "Match Copyright to", answer: "Expression" }, { question: "Match License to", answer: "Use" }],
      [{ question: "Match IPR to", answer: "Protection" }, { question: "Match Innovation to", answer: "New Ideas" }],
    ],
  },
];

export default function GamesScreen({ navigation }: any) {
  const [gameIndex, setGameIndex] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const currentGame = games[gameIndex];
  const currentLevel = currentGame.levels[levelIndex];
  const currentQuestion = currentLevel[questionIndex];

  // Timer for each question
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [questionIndex, levelIndex, gameIndex]);

  const handleSubmit = () => {
    if (input.trim().toUpperCase() === currentQuestion.answer.toUpperCase()) {
      setScore(score + 2);
      Alert.alert("✅ Correct!", `Answer: ${currentQuestion.answer}`);
    } else {
      setScore(score - 1);
      Alert.alert("❌ Wrong!", `Correct Answer: ${currentQuestion.answer}`);
    }
    setInput("");

    if (questionIndex < currentLevel.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setTimeLeft(60);
    } else if (levelIndex < currentGame.levels.length - 1) {
      setLevelIndex(levelIndex + 1);
      setQuestionIndex(0);
      setTimeLeft(60);
      Alert.alert("🎉 Level Complete!", "Moving to next level");
    } else if (gameIndex < games.length - 1) {
      setGameIndex(gameIndex + 1);
      setLevelIndex(0);
      setQuestionIndex(0);
      setTimeLeft(60);
      Alert.alert("🏆 Game Complete!", "Moving to next game");
    } else {
      Alert.alert("🏁 All Games Completed!", `Total Score: ${score}`);
      navigation.navigate("Scoreboard", { finalScore: score });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        🎮 {currentGame.type}
      </Animatable.Text>

      <Animatable.Text animation="zoomIn" style={styles.level}>
        Level {levelIndex + 1} | Time Left: {timeLeft}s
      </Animatable.Text>

      <Animatable.Text animation="fadeInUp" style={styles.question}>
        {currentQuestion.question}
      </Animatable.Text>

      <TextInput
        style={styles.input}
        placeholder="Enter answer"
        value={input}
        onChangeText={setInput}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>Submit Answer</Text>
      </TouchableOpacity>

      <Text style={styles.score}>⭐ Score: {score}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#e3f2fd",
    alignItems: "center",
  },title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#c2185b",
    marginBottom: 20,
    textAlign: "center",
  },
  level: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    color: "#ad1457",
  },
  question: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#880e4f",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
    padding: 12,
    textAlign: "center",
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 18,
  },
  submitBtn: {
    backgroundColor: "#e91e63",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 20,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  score: {
    fontSize: 22,
    fontWeight: "600",
    color: "#880e4f",
    marginTop: 20,
  },
});