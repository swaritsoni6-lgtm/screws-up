import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Screws Up</Text>
        <Text style={styles.subtitle}>Direct Artisan Cooperative</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Show the Problem</Text>
        <Text style={styles.cardDescription}>
          Snap a quick photo or 15s video of the fault. A nearby certified artisan reviews it and arrives with genuine OEM parts.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Capture Photo / Video</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sosContainer}>
        <TouchableOpacity style={styles.sosButton}>
          <Text style={styles.sosText}>🚨 1-Tap Emergency SOS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 24,
  },
  logo: {
    fontSize: 28,
    fontWeight: "900",
    color: "#d97706",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0f172a",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
  sosContainer: {
    marginTop: "auto",
    marginBottom: 20,
  },
  sosButton: {
    backgroundColor: "#dc2626",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  sosText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16,
  },
});
