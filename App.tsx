import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import LessonsScreen from "./LessonsScreen";
import GamesScreen from "./GamesScreen";
import QuizzesScreen from "./QuizzesScreen";
import PuzzlesScreen from "./PuzzlesScreen";
import AssessmentScreen from "./AssessmentScreen";
import ScoreboardScreen from "./ScoreboardScreen";
import IPFunFactsScreen from "./IPFunFactsScreen";
import CreativeStudioScreen from "./CreativeStudioScreen";
import AchievementsScreen from "./AchievementsScreen";
import DailyChallengesScreen from "./DailyChallengesScreen";
import IprVideosScreen from "./IprVideosScreen";

// Test Icon Component
import TestIcon from "./TestIcon";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Lessons: undefined;
  Games: undefined;
  Quizzes: undefined;
  Puzzles: undefined;
  Assessment: undefined;
  Scoreboard: undefined;
  IPFunFacts: undefined;
  CreativeStudio: undefined;
  Achievements: undefined;
  DailyChallenges: undefined;
  IprVideos: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* Home */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* Core Screens */}
        <Stack.Screen name="Lessons" component={LessonsScreen} />
        <Stack.Screen name="Games" component={GamesScreen} />
        <Stack.Screen name="Quizzes" component={QuizzesScreen} />
        <Stack.Screen name="Puzzles" component={PuzzlesScreen} />
        <Stack.Screen name="Assessment" component={AssessmentScreen} />
        <Stack.Screen name="Scoreboard" component={ScoreboardScreen} />

        {/* Additional Screens */}
        <Stack.Screen name="IPFunFacts" component={IPFunFactsScreen} />
        <Stack.Screen name="CreativeStudio" component={CreativeStudioScreen} />
        <Stack.Screen name="Achievements" component={AchievementsScreen} />
        <Stack.Screen name="DailyChallenges" component={DailyChallengesScreen} />
        <Stack.Screen name="IprVideos" component={IprVideosScreen} />
      </Stack.Navigator>

      {/* Test Icon at bottom */}
      <View style={styles.testIconContainer}>
        <TestIcon />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  testIconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
