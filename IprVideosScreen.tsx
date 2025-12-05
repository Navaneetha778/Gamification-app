import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Linking,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { WebView } from "react-native-webview";

type VideoItem = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
};

const videos: VideoItem[] = [
  {
    id: "1",
    title: "What is a trade mark?",
    description: "Episode 1 of 'Intellectual Property for Kids' explains trademarks in simple terms.",
    youtubeId: "WDZdgkToxUE",
  },
  {
    id: "2",
    title: "What is a patent?",
    description: "Episode 2 of 'Intellectual Property for Kids' explains patents.",
    youtubeId: "avSdoMz6OuA",
  },
  {
    id: "3",
    title: "What is Copyright?",
    description: "Episode 3 of 'Intellectual Property for Kids' explains copyright in kid-friendly way.",
    youtubeId: "hT41-IKVNCY",
  },
  {
    id: "4",
    title: "Respecting Intellectual Property (Digital Citizenship for Kids)",
    description: "A short lesson on how to respect IP and be a responsible digital creator.",
    youtubeId: "As8em5Y1tc0",
  },
  {
    id: "5",
    title: "What is Intellectual Property? (Simplified Explanation)",
    description: "A simple and friendly explanation of intellectual property for kids.",
    youtubeId: "UqZJPuyK9VY",
  },
];

export default function IPRKidsVideosScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.header}>
        🎬 Kid-Friendly IPR Videos
      </Animatable.Text>

      {videos.map((vid, idx) => (
        <Animatable.View
          key={vid.id}
          animation="fadeInUp"
          delay={idx * 150}
          style={styles.card}
        >
          <Text style={styles.title}>{vid.title}</Text>
          <Text style={styles.description}>{vid.description}</Text>

          <View style={styles.videoContainer}>
            <WebView
              source={{ uri: `https://www.youtube.com/embed/${vid.youtubeId}` }}
              style={styles.webview}
              javaScriptEnabled
              domStorageEnabled
              allowsFullscreenVideo
            />
          </View>

          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL(`https://www.youtube.com/watch?v=${vid.youtubeId}`)
            }
          >
            ▶️ Watch full on YouTube
          </Text>
        </Animatable.View>
      ))}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f5faff",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0b3d91",
    marginBottom: 14,
    textAlign: "center",
  },
  card: {
    width: "95%",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1a237e",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#404040",
    marginBottom: 10,
  },
  videoContainer: {
    width: "100%",
    height: Platform.OS === "web" ? 300 : 200,
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
  },
  webview: {
    flex: 1,
  },
  link: {
    color: "#1976d2",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    textDecorationLine: "underline",
  },
});
