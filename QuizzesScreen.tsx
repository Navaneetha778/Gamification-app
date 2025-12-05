import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

type QuizType = {
  type: string;
  questions: Question[];
};

// 10 quiz types × 5 questions each (all IPR-related)
const quizzes: QuizType[] = [
  {
    type: "IP Basics",
    questions: [
      { question: "What does IP stand for?", options: ["Intellectual Property", "Internet Protocol", "International Patent"], answer: "Intellectual Property" },
      { question: "Which protects your inventions?", options: ["Copyright", "Patent", "Trademark"], answer: "Patent" },
      { question: "Which protects your brand logo?", options: ["Trademark", "Patent", "License"], answer: "Trademark" },
      { question: "Which protects books & music?", options: ["Patent", "Copyright", "Trademark"], answer: "Copyright" },
      { question: "IP is important for?", options: ["Business", "Innovation", "Both"], answer: "Both" },
    ],
  },
  {
    type: "Copyrights",
    questions: [
      { question: "Copyright protects?", options: ["Ideas", "Expression of ideas", "Facts"], answer: "Expression of ideas" },
      { question: "Which can be copyrighted?", options: ["Books", "Songs", "Both"], answer: "Both" },
      { question: "Copyright duration is usually?", options: ["50 years", "70 years", "100 years"], answer: "70 years" },
      { question: "Copyright owner can?", options: ["Reproduce", "Distribute", "Both"], answer: "Both" },
      { question: "Which symbol represents copyright?", options: ["©", "™", "®"], answer: "©" },
    ],
  },
  {
    type: "Patents",
    questions: [
      { question: "Patent protects?", options: ["Invention", "Brand", "Book"], answer: "Invention" },
      { question: "Patent owner can?", options: ["Stop copying", "Sell invention", "Both"], answer: "Both" },
      { question: "Types of patents?", options: ["Utility", "Design", "Both"], answer: "Both" },
      { question: "Patent duration is?", options: ["10 years", "20 years", "50 years"], answer: "20 years" },
      { question: "Invention must be?", options: ["New", "Useful", "Both"], answer: "Both" },
    ],
  },
  {
    type: "Trademarks",
    questions: [
      { question: "Trademark protects?", options: ["Logo", "Slogan", "Both"], answer: "Both" },
      { question: "Trademark symbol is?", options: ["™", "©", "®"], answer: "™" },
      { question: "Duration of trademark?", options: ["10 years", "20 years", "Indefinite"], answer: "Indefinite" },
      { question: "Can be renewed?", options: ["Yes", "No"], answer: "Yes" },
      { question: "Brand name is a?", options: ["Trademark", "Patent", "Copyright"], answer: "Trademark" },
    ],
  },
  {
    type: "Licensing",
    questions: [
      { question: "Licensing allows?", options: ["Use of IP", "Sell IP", "Destroy IP"], answer: "Use of IP" },
      { question: "License can be?", options: ["Exclusive", "Non-exclusive", "Both"], answer: "Both" },
      { question: "Royalties are?", options: ["Payment", "Invention", "Logo"], answer: "Payment" },
      { question: "License agreement is?", options: ["Written", "Verbal", "Both"], answer: "Both" },
      { question: "IP owner controls?", options: ["Who uses IP", "How it's used", "Both"], answer: "Both" },
    ],
  },
  {
    type: "Infringement",
    questions: [
      { question: "Using IP without permission is?", options: ["Legal", "Illegal", "Neutral"], answer: "Illegal" },
      { question: "Copying brand logo is?", options: ["Infringement", "Legal", "Optional"], answer: "Infringement" },
      { question: "IP theft is?", options: ["Wrong", "Correct"], answer: "Wrong" },
      { question: "Penalty for infringement?", options: ["Fine", "Jail", "Both"], answer: "Both" },
      { question: "Respect IP to?", options: ["Avoid fines", "Encourage creativity", "Both"], answer: "Both" },
    ],
  },
  {
    type: "IP Careers",
    questions: [
      { question: "Who works with patents?", options: ["Patent Agent", "Teacher", "Doctor"], answer: "Patent Agent" },
      { question: "Copyright expert handles?", options: ["Books", "Music", "Both"], answer: "Both" },
      { question: "Brand consultant works with?", options: ["Trademarks", "Patents", "Both"], answer: "Both" },
      { question: "IP lawyer advises?", options: ["Court cases", "Registration", "Both"], answer: "Both" },
      { question: "IP careers are?", options: ["Interesting", "Boring"], answer: "Interesting" },
    ],
  },
  {
    type: "IP Fun Facts",
    questions: [
      { question: "LEGO is protected by?", options: ["Patent", "Trademark", "Copyright"], answer: "Trademark" },
      { question: "Disney characters are?", options: ["Patent", "Copyright", "Trademark"], answer: "Copyright" },
      { question: "Nike logo is?", options: ["Trademark", "Copyright", "Patent"], answer: "Trademark" },
      { question: "Microsoft software?", options: ["Patent", "Copyright", "Trademark"], answer: "Copyright" },
      { question: "Apple inventions?", options: ["Patent", "Trademark", "Copyright"], answer: "Patent" },
    ],
  },
  {
    type: "IP Awareness",
    questions: [
      { question: "IP helps?", options: ["Innovation", "Creativity", "Both"], answer: "Both" },
      { question: "Protecting ideas encourages?", options: ["Stealing", "Innovation"], answer: "Innovation" },
      { question: "IP should be?", options: ["Respected", "Ignored"], answer: "Respected" },
      { question: "Learning IP helps?", options: ["Students", "Business", "Both"], answer: "Both" },
      { question: "IP awareness is?", options: ["Important", "Useless"], answer: "Important" },
    ],
  },
];

export default function QuizzesScreen() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [score, setScore] = useState(0);

  const currentQuiz = quizzes[quizIndex];
  const currentQuestion = currentQuiz.questions[questionIndex];

  const handleSubmit = () => {
    if (!selectedOption) {
      Alert.alert("⚠️ Select an option!");
      return;
    }

    const correct = selectedOption === currentQuestion.answer;
    if (correct) {
      setScore(score + 2);
      Alert.alert("✅ Correct!", `Answer: ${currentQuestion.answer}`);
    } else {
      setScore(score - 1);
      Alert.alert("❌ Wrong!", `Correct Answer: ${currentQuestion.answer}`);
    }

    setSelectedOption("");

    if (questionIndex < currentQuiz.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (quizIndex < quizzes.length - 1) {
      setQuizIndex(quizIndex + 1);
      setQuestionIndex(0);
    } else {
      Alert.alert("🎉 All Quizzes Completed!", `Final Score: ${score}`);
      setQuizIndex(0);
      setQuestionIndex(0);
      setScore(0);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        ❓ IPR Quizzes
      </Animatable.Text>

      <Animatable.Text animation="zoomIn" style={styles.quizType}>
        {currentQuiz.type}
      </Animatable.Text>

      <Animatable.Text animation="fadeInUp" style={styles.question}>
        {currentQuestion.question}
      </Animatable.Text>

      {currentQuestion.options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionBtn,
            selectedOption === option && { backgroundColor: "#ffa000" },
          ]}
          onPress={() => setSelectedOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

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
    backgroundColor: "#fff3e0",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ff6f00",
    marginBottom: 20,
  },
  quizType: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    color: "#ff8f00",
  },
  question: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 16,
  },
  optionBtn: {
    width: "80%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#ffcc80",
    marginVertical: 6,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "600",
  },
  submitBtn: {
    backgroundColor: "#ffa000",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
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
