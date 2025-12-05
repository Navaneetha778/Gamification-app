import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";

type Puzzle = {
  type: string;
  questions: { scrambled: string; answer: string }[];
};

// 10 puzzle types, each 5 questions, all IPR-related
const puzzles: Puzzle[] = [
  {
    type: "IP Basics",
    questions: [
      { scrambled: "NTPAET", answer: "PATENT" },
      { scrambled: "OPYHCRGHTI", answer: "COPYRIGHT" },
      { scrambled: "MRRTEAADK", answer: "TRADEMARK" },
      { scrambled: "LIECNSSE", answer: "LICENSE" },
      { scrambled: "INNVETIO", answer: "INVENTION" },
    ],
  },
  {
    type: "IP Rights",
    questions: [
      { scrambled: "MORALRIGHTS", answer: "MORAL RIGHTS" },
      { scrambled: "PATNTEHOLD", answer: "PATENT HOLDER" },
      { scrambled: "COPYRIGHTS", answer: "COPYRIGHTS" },
      { scrambled: "BRANDLO", answer: "BRAND LOGO" },
      { scrambled: "IPLAW", answer: "IP LAW" },
    ],
  },
  {
    type: "Patents",
    questions: [
      { scrambled: "DESIGNPR", answer: "DESIGN PATENT" },
      { scrambled: "UTILITYP", answer: "UTILITY PATENT" },
      { scrambled: "PLANTP", answer: "PLANT PATENT" },
      { scrambled: "CLAIMSP", answer: "CLAIMS" },
      { scrambled: "PRIORITY", answer: "PRIORITY DATE" },
    ],
  },
  {
    type: "Copyrights",
    questions: [
      { scrambled: "ARTWORK", answer: "ARTWORK" },
      { scrambled: "MUSIC", answer: "MUSIC" },
      { scrambled: "LITERATURE", answer: "LITERATURE" },
      { scrambled: "FILM", answer: "FILM" },
      { scrambled: "SOFTWARE", answer: "SOFTWARE" },
    ],
  },
  {
    type: "Trademarks",
    questions: [
      { scrambled: "LOGO", answer: "LOGO" },
      { scrambled: "SYMBOL", answer: "SYMBOL" },
      { scrambled: "SLOGAN", answer: "SLOGAN" },
      { scrambled: "BRANDNAME", answer: "BRAND NAME" },
      { scrambled: "TRADEMARKS", answer: "TRADEMARKS" },
    ],
  },
  {
    type: "IP Licensing",
    questions: [
      { scrambled: "ROYALTY", answer: "ROYALTY" },
      { scrambled: "AGREEMENT", answer: "AGREEMENT" },
      { scrambled: "LICENSE", answer: "LICENSE" },
      { scrambled: "TERMS", answer: "TERMS" },
      { scrambled: "PERMISSION", answer: "PERMISSION" },
    ],
  },
  {
    type: "Infringement",
    questions: [
      { scrambled: "COPYING", answer: "COPYING" },
      { scrambled: "STEALING", answer: "STEALING" },
      { scrambled: "VIOLATION", answer: "VIOLATION" },
      { scrambled: "FAKEBRAND", answer: "FAKE BRAND" },
      { scrambled: "ILLEGAL", answer: "ILLEGAL" },
    ],
  },
  {
    type: "IP Strategy",
    questions: [
      { scrambled: "PROTECTION", answer: "PROTECTION" },
      { scrambled: "PORTFOLIO", answer: "PORTFOLIO" },
      { scrambled: "MANAGEMENT", answer: "MANAGEMENT" },
      { scrambled: "REGISTRATION", answer: "REGISTRATION" },
      { scrambled: "ENFORCEMENT", answer: "ENFORCEMENT" },
    ],
  },
  {
    type: "IP Careers",
    questions: [
      { scrambled: "IPLAWYER", answer: "IP LAWYER" },
      { scrambled: "PATENTAGENT", answer: "PATENT AGENT" },
      { scrambled: "COPYRIGHTEXPERT", answer: "COPYRIGHT EXPERT" },
      { scrambled: "BRANDCONSULTANT", answer: "BRAND CONSULTANT" },
      { scrambled: "TECHTRANSFER", answer: "TECH TRANSFER" },
    ],
  },
  {
    type: "IP Fun Facts",
    questions: [
      { scrambled: "LEGO", answer: "LEGO" },
      { scrambled: "MICROSOFT", answer: "MICROSOFT" },
      { scrambled: "APPLE", answer: "APPLE" },
      { scrambled: "DISNEY", answer: "DISNEY" },
      { scrambled: "NIKE", answer: "NIKE" },
    ],
  },
];

export default function PuzzlesScreen() {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);

  const currentPuzzle = puzzles[puzzleIndex];
  const currentQuestion = currentPuzzle.questions[questionIndex];

  const handleSubmit = () => {
    if (!input) {
      Alert.alert("⚠️ Enter your answer!");
      return;
    }

    const correct = input.trim().toUpperCase() === currentQuestion.answer.toUpperCase();
    if (correct) {
      setScore(score + 2);
      Alert.alert("✅ Correct!", `Answer: ${currentQuestion.answer}`);
    } else {
      setScore(score - 1);
      Alert.alert("❌ Wrong!", `Correct Answer: ${currentQuestion.answer}`);
    }

    setInput("");

    if (questionIndex < currentPuzzle.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (puzzleIndex < puzzles.length - 1) {
      setPuzzleIndex(puzzleIndex + 1);
      setQuestionIndex(0);
    } else {
      Alert.alert("🎉 All Puzzles Completed!", `Final Score: ${score}`);
      setPuzzleIndex(0);
      setQuestionIndex(0);
      setScore(0);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        🔤 IPR Word Puzzles
      </Animatable.Text>

      <Animatable.Text animation="zoomIn" style={styles.puzzleType}>
        {currentPuzzle.type}
      </Animatable.Text>

      <Animatable.Text animation="fadeInUp" style={styles.scrambledWord}>
        {currentQuestion.scrambled}
      </Animatable.Text>

      <TextInput
        style={styles.input}
        placeholder="Enter correct word"
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
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff8e1",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#ff6f00",
    textAlign: "center",
  },
  puzzleType: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    color: "#ff8f00",
  },
  scrambledWord: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 20,
    color: "#ffb300",
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
    backgroundColor: "#ffa000",
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
    marginTop: 20,
    color: "#ff6f00",
  },
});
