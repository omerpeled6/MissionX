import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "userMission";

export default function App() {
  const [mission, setMission] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      setMission(value || "");
    })();
  }, []);

  const save = async () => {
    const t = (text || "").trim();
    if (!t) return;
    await AsyncStorage.setItem(STORAGE_KEY, t);
    setMission(t);
    setText("");
    Keyboard.dismiss();
  };

  const clear = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setMission("");
    setText("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>One Mission</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your mission..."
        value={text}
        onChangeText={setText}
        returnKeyType="done"
        onSubmitEditing={save}
      />

      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={save}>
          <Text style={styles.btnText}>Save</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.clear]} onPress={clear}>
          <Text style={styles.btnText}>Clear</Text>
        </Pressable>
      </View>

      <View style={styles.savedCard}>
        {mission ? (
          <>
            <Text style={styles.savedLabel}>Your mission</Text>
            <Text style={styles.savedMission}>{mission}</Text>
          </>
        ) : (
          <Text style={styles.noSaved}>No saved mission</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 14,
    color: "#0a84ff",
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 14,
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", width: "100%", justifyContent: "space-between" },
  btn: {
    flex: 1,
    padding: 14,
    backgroundColor: "#0a84ff",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 6,
  },
  clear: { backgroundColor: "#ff3b30" },
  btnText: { color: "#fff", fontWeight: "600" },
  savedCard: {
    marginTop: 20,
    width: "100%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f3f8ff",
    alignItems: "center",
  },
  savedLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  savedMission: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1b4fbe",
    textAlign: "center",
  },
  noSaved: { fontSize: 16, color: "#9ca3af" },
});
