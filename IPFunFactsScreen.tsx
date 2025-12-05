// IPFunFactsScreen.tsx
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

const facts = [
  "LEGO once sued (and defended) to protect its brick design — IP matters in toys!",
  "Disney fiercely protects characters and copyrights for decades.",
  "Nike's Swoosh is a famous trademark recognized worldwide.",
  "Patents give inventors limited-time exclusive rights — usually 20 years.",
  "Creative Commons licenses let creators share work with rules attached.",
  "Trade secrets (like recipes) have value as long as secrecy is kept.",
  "Trademarks can last indefinitely if renewed and used.",
  "Copyright protects expression (books, music) not mere ideas.",
  "Open-source code can be used commercially if license terms are followed.",
  "Geographical Indications (like Darjeeling tea) protect origin-based products."
];

export default function IPFunFactsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        💡 IP Fun Facts
      </Animatable.Text>

      {facts.map((f, i) => (
        <Animatable.View key={i} animation="fadeInUp" delay={i * 80} style={styles.card}>
          <Text style={styles.fact}>{`${i + 1}. ${f}`}</Text>
        </Animatable.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 18,
    backgroundColor: "#fffef6",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 12,
    color: "#6a1b9a",
  },
  card: {
    width: "94%",
    backgroundColor: "#f3e5f5",
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
  },
  fact: {
    fontSize: 16,
    color: "#3e0b4d",
  },
});
