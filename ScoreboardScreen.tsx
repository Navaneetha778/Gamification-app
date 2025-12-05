// ScoreboardScreen.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Player = {
  name: string;
  score: number;
};

const ScoreboardScreen: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [winner, setWinner] = useState<string>("");
  const [lowest, setLowest] = useState<string>("");
  const [rewardLabel, setRewardLabel] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<string>("You");

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        // Get logged-in user name
        const userName = await AsyncStorage.getItem("loggedInUser");
        const nameToUse = userName ?? "You";
        setLoggedUser(nameToUse);

        // Get saved scores
        const [rawGame, rawQuiz, rawPuzzle] = await Promise.all([
          AsyncStorage.getItem("gameScore"),
          AsyncStorage.getItem("quizScore"),
          AsyncStorage.getItem("puzzleScore"),
        ]);

        const toNumber = (val: string | null) => Number(val ?? 0);

        // Calculate total score (based on game, quiz, and puzzle only)
        const userTotal =
          toNumber(rawGame) + toNumber(rawQuiz) + toNumber(rawPuzzle);

        // Create dynamic player list (can add other demo players if needed)
        const playersList: Player[] = [
          { name: nameToUse, score: userTotal },
          { name: "Ava", score: 120 },
          { name: "Noah", score: 85 },
          { name: "Liam", score: 170 },
          { name: "Emma", score: 95 },
        ];

        // Sort players by score
        playersList.sort((a, b) => b.score - a.score);
        setPlayers(playersList);

        setWinner(playersList[0]?.name || "");
        setLowest(playersList[playersList.length - 1]?.name || "");

        const topScore = playersList[0]?.score || 0;

        // Reward based on top score
        if (topScore >= 200) setRewardLabel("🏆 Gold Star Champion!");
        else if (topScore >= 150) setRewardLabel("🥈 Silver Thinker!");
        else if (topScore >= 100) setRewardLabel("🥉 Bronze Learner!");
        else setRewardLabel("🌱 Keep Trying — Future Inventor!");
      } catch (err) {
        console.warn("Scoreboard init error:", err);
        Alert.alert("Error", "Failed to load scoreboard. Try restarting the app.");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const FileSystem = require("expo-file-system");
      const Sharing = require("expo-sharing");

      if (!FileSystem.documentDirectory) {
        Alert.alert("Error", "FileSystem is not available on this device.");
        setDownloading(false);
        return;
      }

      const fileUri = FileSystem.documentDirectory + "MarkMaster_Scoreboard.txt";

      let content = "🏆 MarkMaster Scoreboard 🏆\n\n";
      players.forEach((p, i) => {
        content += `${i + 1}. ${p.name} — ${p.score} pts\n`;
      });
      content += `\n👑 Winner: ${winner}\n`;
      content += `🐢 Lowest: ${lowest}\n`;
      content += `🎁 Reward: ${rewardLabel}\n`;
      content += `\nGenerated: ${new Date().toLocaleString()}\n`;

      await FileSystem.writeAsStringAsync(fileUri, content, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Saved", `Scoreboard saved to:\n${fileUri}`);
      }
    } catch (err) {
      console.warn("Download error:", err);
      Alert.alert(
        "Download failed",
        "Please install expo-file-system & expo-sharing and run in Expo Go."
      );
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#1e88e5" />
        <Text
          style={{ marginTop: 12, color: "#0d47a1", fontWeight: "700" }}
        >
          Loading scoreboard...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.header}>
        🧠 MarkMaster Scoreboard
      </Animatable.Text>

      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        style={styles.trophyBox}
      >
        <Text style={styles.trophyText}>🏆 Winner: {winner}</Text>
        <Text style={styles.rewardText}>🎁 {rewardLabel}</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.scoreListBox}>
        {players.map((player, index) => (
          <Animatable.View
            key={`${player.name}-${index}`}
            animation="bounceIn"
            delay={index * 120}
            style={[
              styles.playerBox,
              player.name === winner
                ? styles.winner
                : player.name === lowest
                ? styles.lowest
                : {},
            ]}
          >
            <Text style={styles.playerName}>
              {index + 1}. {player.name === loggedUser ? `${player.name} (You)` : player.name}
            </Text>
            <Text style={styles.playerScore}>{player.score} pts</Text>
          </Animatable.View>
        ))}
      </Animatable.View>

      <Animatable.View animation="zoomIn" style={styles.statsBox}>
        <Text style={styles.statText}>👑 Highest Scorer: {winner}</Text>
        <Text style={styles.statText}>🐢 Lowest Scorer: {lowest}</Text>
        <Text style={styles.statText}>Total Players: {players.length}</Text>
      </Animatable.View>

      <TouchableOpacity
        style={styles.downloadBtn}
        onPress={handleDownload}
        disabled={downloading}
      >
        <Animatable.Text
          animation="rubberBand"
          iterationCount="infinite"
          style={styles.downloadBtnText}
        >
          {downloading ? "⏳ Preparing..." : "⬇️ Download Scoreboard"}
        </Animatable.Text>
      </TouchableOpacity>

      <Animatable.Text
        animation="fadeInUpBig"
        iterationCount="infinite"
        style={styles.footerText}
      >
        Keep Playing, Keep Learning! 🚀
      </Animatable.Text>
    </ScrollView>
  );
};

export default ScoreboardScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#e3f2fd",
  },
  header: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0d47a1",
    marginBottom: 18,
    textAlign: "center",
  },
  trophyBox: {
    backgroundColor: "#bbdefb",
    padding: 16,
    borderRadius: 14,
    marginBottom: 18,
    alignItems: "center",
    width: "92%",
  },
  trophyText: { fontSize: 20, fontWeight: "800", color: "#1a237e" },
  rewardText: { fontSize: 16, fontWeight: "700", color: "#01579b", marginTop: 6 },
  scoreListBox: { width: "94%", marginVertical: 10 },
  playerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#bbdefb",
  },
  winner: { backgroundColor: "#dcedc8", borderColor: "#388e3c" },
  lowest: { backgroundColor: "#ffcdd2", borderColor: "#c62828" },
  playerName: { fontSize: 18, fontWeight: "700", color: "#0d47a1" },
  playerScore: { fontSize: 16, fontWeight: "700", color: "#1565c0" },
  statsBox: {
    backgroundColor: "#bbdefb",
    padding: 14,
    borderRadius: 12,
    width: "92%",
    alignItems: "center",
    marginTop: 12,
  },
  statText: { fontSize: 15, fontWeight: "700", color: "#0d47a1", marginBottom: 6 },
  downloadBtn: {
    marginTop: 18,
    backgroundColor: "#1e88e5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  downloadBtnText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
  },
  footerText: {
    fontSize: 15,
    color: "#01579b",
    marginTop: 22,
    textAlign: "center",
    fontWeight: "700",
  },
});
