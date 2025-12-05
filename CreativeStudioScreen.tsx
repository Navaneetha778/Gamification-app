// CreativeStudioScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "creative_studio_projects_v1";

export default function CreativeStudioScreen() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [savedProjects, setSavedProjects] = useState<{ id: string; title: string; notes: string }[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setSavedProjects(JSON.parse(raw));
      } catch (e) {
        console.warn(e);
      }
    })();
  }, []);

  const saveProject = async () => {
    if (!title.trim()) {
      Alert.alert("Please add a project title");
      return;
    }
    const newProj = { id: Date.now().toString(), title: title.trim(), notes: notes.trim() };
    const next = [newProj, ...savedProjects].slice(0, 20); // keep latest 20
    setSavedProjects(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setTitle("");
    setNotes("");
    Alert.alert("Saved", "Project saved locally!");
  };

  const deleteProject = async (id: string) => {
    const next = savedProjects.filter((p) => p.id !== id);
    setSavedProjects(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>🎨 Creative Studio</Animatable.Text>

      <View style={styles.card}>
        <Text style={styles.label}>Project Title</Text>
        <TextInput value={title} onChangeText={setTitle} placeholder="My cool logo idea" style={styles.input} />

        <Text style={styles.label}>Quick Notes / Description</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Describe your idea..."
          style={[styles.input, { height: 100 }]}
          multiline
        />

        <TouchableOpacity style={styles.btn} onPress={saveProject}>
          <Text style={styles.btnText}>Save Project</Text>
        </TouchableOpacity>
      </View>

      <Animatable.Text animation="fadeIn" style={styles.subTitle}>Saved Projects</Animatable.Text>

      {savedProjects.length === 0 ? (
        <Text style={styles.empty}>No saved projects yet — create one!</Text>
      ) : (
        savedProjects.map((p) => (
          <Animatable.View key={p.id} animation="fadeInUp" style={styles.projectBox}>
            <View style={{ flex: 1 }}>
              <Text style={styles.projectTitle}>{p.title}</Text>
              <Text style={styles.projectNotes}>{p.notes || "—"}</Text>
            </View>
            <TouchableOpacity style={styles.delBtn} onPress={() => deleteProject(p.id)}>
              <Text style={styles.delText}>Delete</Text>
            </TouchableOpacity>
          </Animatable.View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 18, backgroundColor: "#f7fff7", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "800", color: "#2e7d32", marginBottom: 12 },
  card: { width: "94%", backgroundColor: "#ffffff", padding: 14, borderRadius: 12, marginBottom: 16 },
  label: { fontWeight: "700", marginTop: 8, color: "#2e7d32" },
  input: { borderWidth: 1, borderColor: "#c8e6c9", borderRadius: 8, padding: 10, marginTop: 6 },
  btn: { marginTop: 12, backgroundColor: "#2e7d32", padding: 12, borderRadius: 10, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" },
  subTitle: { fontSize: 20, fontWeight: "700", marginTop: 6, color: "#2e7d32" },
  empty: { marginTop: 12, color: "#666" },
  projectBox: { width: "94%", backgroundColor: "#e8f5e9", padding: 12, borderRadius: 10, marginTop: 10, flexDirection: "row", alignItems: "center" },
  projectTitle: { fontWeight: "800", fontSize: 16 },
  projectNotes: { color: "#333", marginTop: 4 },
  delBtn: { marginLeft: 12, padding: 8, backgroundColor: "#c62828", borderRadius: 8 },
  delText: { color: "#fff", fontWeight: "700" },
});
