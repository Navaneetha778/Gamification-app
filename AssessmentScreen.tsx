// AssessmentScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Screens for navigation
export type RootStackParamList = {
  Assessment: undefined;
  Scoreboard: undefined;
  Lessons: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Assessment">;

type Question = {
  question: string;
  options: string[];
  answer: string;
};

// -------------------- Pre-Assessments --------------------
const preAssessments: Question[][] = [
  [
    { question: "IPR stands for?", options: ["Intellectual Property Rights", "Internet Privacy Rules", "Innovative Product Research"], answer: "Intellectual Property Rights" },
    { question: "Which protects inventions?", options: ["Patent", "Trademark", "Copyright"], answer: "Patent" },
    { question: "Which protects brand logos?", options: ["Patent", "Trademark", "License"], answer: "Trademark" },
    { question: "Copyright protects?", options: ["Ideas", "Expression", "Brand"], answer: "Expression" },
    { question: "License allows?", options: ["Use legally", "Stealing", "Sharing freely"], answer: "Use legally" },
    { question: "IP infringement is?", options: ["Legal", "Illegal", "Optional"], answer: "Illegal" },
    { question: "IP awareness increases?", options: ["Innovation", "Confusion", "Copyright"], answer: "Innovation" },
    { question: "IPR importance?", options: ["Low", "High", "Medium"], answer: "High" },
    { question: "Trademark protects?", options: ["Expression", "Brand", "Idea"], answer: "Brand" },
    { question: "IPR helps?", options: ["Children", "Business", "Innovation"], answer: "Innovation" },
  ],
  [
    { question: "Which protects books?", options: ["Copyright", "Patent", "Trademark"], answer: "Copyright" },
    { question: "New inventions can be?", options: ["Copied", "Patented", "Ignored"], answer: "Patented" },
    { question: "IPR encourages?", options: ["Innovation", "Stealing", "Piracy"], answer: "Innovation" },
    { question: "Unauthorized use is?", options: ["Illegal", "Legal", "Optional"], answer: "Illegal" },
    { question: "IPR relates to?", options: ["Ideas", "Ownership", "Products"], answer: "Ownership" },
    { question: "IP helps?", options: ["Learning", "Sharing", "Innovation"], answer: "Innovation" },
    { question: "IP awareness prevents?", options: ["Theft", "Creativity", "Learning"], answer: "Theft" },
    { question: "IP rights belong to?", options: ["Everyone", "Owner", "Government"], answer: "Owner" },
    { question: "Patent duration?", options: ["10 years", "20 years", "5 years"], answer: "20 years" },
    { question: "IPR teaches?", options: ["Law", "Sharing", "Innovation"], answer: "Law" },
  ],
];

// -------------------- Post-Assessment --------------------
const postAssessment: Question[] = [
  { question: "What does a patent protect?", options: ["Invention", "Brand Logo", "Book", "Music"], answer: "Invention" },
  { question: "Which IPR protects artistic works?", options: ["Trademark", "Patent", "Copyright", "License"], answer: "Copyright" },
  { question: "A trademark protects:", options: ["Invention", "Brand name or symbol", "Literary work", "Idea"], answer: "Brand name or symbol" },
  { question: "IPR helps to?", options: ["Steal", "Copy", "Encourage creativity", "Ignore rules"], answer: "Encourage creativity" },
  { question: "Which IPR protects software?", options: ["Trademark", "Copyright", "Patent", "Design"], answer: "Copyright" },
  { question: "Which is illegal without permission?", options: ["Using patented invention", "Copying public domain work", "Using trademarked word in dictionary", "None"], answer: "Using patented invention" },
  { question: "Licensing allows:", options: ["Unauthorized use", "Legal use under conditions", "Copying freely", "Selling someone else’s invention"], answer: "Legal use under conditions" },
  { question: "IPR encourages?", options: ["Innovation", "Copying", "Piracy", "Nothing"], answer: "Innovation" },
  { question: "Infringement means:", options: ["Legal use", "Unauthorized violation", "Trademarking your name", "Licensing a work"], answer: "Unauthorized violation" },
  { question: "Trade secrets are protected by:", options: ["Patent law", "Contractual confidentiality", "Trademark law", "Copyright law"], answer: "Contractual confidentiality" },
];

// -------------------- Main Component --------------------
export default function AssessmentScreen({ navigation }: Props) {
  const [currentPre, setCurrentPre] = useState(0);
  const [preIndex, setPreIndex] = useState(0);
  const [preScore, setPreScore] = useState(0);
  const [postIndex, setPostIndex] = useState(0);
  const [postScore, setPostScore] = useState(0);
  const [showPost, setShowPost] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [assessmentFinished, setAssessmentFinished] = useState(false);

  const currentPreQuestion = preAssessments[currentPre]?.[preIndex];
  const currentPostQuestion = postAssessment[postIndex];

  // -------------------- Submit Handlers --------------------
  const handlePreSubmit = () => {
    if (!selectedOption || !currentPreQuestion) {
      Alert.alert("Please select an answer!");
      return;
    }
    const correct = selectedOption === currentPreQuestion.answer;
    setPreScore((p) => p + (correct ? 2 : -1));
    setSelectedOption(null);

    if (preIndex < preAssessments[currentPre].length - 1) setPreIndex(preIndex + 1);
    else if (currentPre < preAssessments.length - 1) {
      setCurrentPre(currentPre + 1);
      setPreIndex(0);
    } else setShowPost(true);
  };

  const handlePostSubmit = () => {
    if (!selectedOption || !currentPostQuestion) {
      Alert.alert("Please select an answer!");
      return;
    }
    const correct = selectedOption === currentPostQuestion.answer;
    setPostScore((p) => p + (correct ? 2 : -1));
    setSelectedOption(null);

    if (postIndex < postAssessment.length - 1) setPostIndex(postIndex + 1);
    else setAssessmentFinished(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!showPost ? (
        <>
          <Text style={styles.title}>Pre-Assessment {currentPre + 1}</Text>
          {currentPreQuestion && (
            <>
              <Text style={styles.question}>{currentPreQuestion.question}</Text>
              {currentPreQuestion.options.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.optionBtn, selectedOption === opt && styles.optionSelected]}
                  onPress={() => setSelectedOption(opt)}
                >
                  <Text style={styles.optionText}>{opt}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.submitBtn} onPress={handlePreSubmit}>
                <Text style={styles.submitBtnText}>Submit</Text>
              </TouchableOpacity>
              <Text style={styles.score}>Pre Score: {preScore}</Text>
            </>
          )}
        </>
      ) : !assessmentFinished ? (
        <>
          <Text style={styles.title}>Post-Assessment</Text>
          {currentPostQuestion && (
            <>
              <Text style={styles.question}>{currentPostQuestion.question}</Text>
              {currentPostQuestion.options.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.optionBtn, selectedOption === opt && styles.optionSelected]}
                  onPress={() => setSelectedOption(opt)}
                >
                  <Text style={styles.optionText}>{opt}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.submitBtn} onPress={handlePostSubmit}>
                <Text style={styles.submitBtnText}>Submit</Text>
              </TouchableOpacity>
              <Text style={styles.score}>Post Score: {postScore}</Text>
            </>
          )}
        </>
      ) : (
        <>
          <Text style={styles.title}>Assessment Completed!</Text>
          <Text style={styles.score}>Pre Score: {preScore}</Text>
          <Text style={styles.score}>Post Score: {postScore}</Text>
          <Text style={[styles.score, { fontSize: 20, marginTop: 10 }]}>
            Total Score: {preScore + postScore}
          </Text>
        </>
      )}
    </ScrollView>
  );
}

// -------------------- Styles --------------------
const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#f3fbff", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", color: "#0b6fb1", marginBottom: 12, textAlign: "center" },
  question: { fontSize: 18, fontWeight: "600", color: "#044f7c", marginBottom: 12, textAlign: "center" },
  optionBtn: { backgroundColor: "#fff", padding: 12, marginVertical: 6, width: "90%", borderRadius: 10, borderWidth: 1, borderColor: "#b7e0ff" },
  optionSelected: { backgroundColor: "#79c2ff", borderColor: "#2b98e6" },
  optionText: { fontSize: 16, color: "#033a57", textAlign: "center", fontWeight: "600" },
  submitBtn: { marginTop: 12, backgroundColor: "#1e88e5", paddingVertical: 12, borderRadius: 10, width: "50%", alignSelf: "center" },
  submitBtnText: { color: "#fff", fontSize: 16, fontWeight: "700", textAlign: "center" },
  score: { marginTop: 10, fontSize: 16, fontWeight: "600", color: "#034f7a" },
});
