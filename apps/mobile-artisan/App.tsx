import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Screws Up Partner</Text>
        <Text style={styles.badge}>JOURNEYMAN ELECTRICIAN</Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>₹1,760</Text>
          <Text style={styles.statLabel}>Today (88% Split)</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>96.4%</Text>
          <Text style={styles.statLabel}>30-Day FTR</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>78.5</Text>
          <Text style={styles.statLabel}>MFSS Score</Text>
        </View>
      </View>

      <View style={styles.actionCard}>
        <Text style={styles.actionTitle}>FairParts Barcode Scanner</Text>
        <Text style={styles.actionDesc}>
          Scan OEM packaging in front of customer for verified wholesale rates.
        </Text>
        <TouchableOpacity style={styles.scanButton}>
          <Text style={styles.scanButtonText}>📷 Open Barcode Scanner</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.offlineStatus}>
        <Text style={styles.offlineText}>🟢 Local SQLite Sync: Online</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    fontSize: 26,
    fontWeight: "900",
    color: "#f59e0b",
  },
  badge: {
    fontSize: 12,
    color: "#34d399",
    fontWeight: "700",
    marginTop: 4,
    letterSpacing: 1,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
  },
  statLabel: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 4,
  },
  actionCard: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f8fafc",
    marginBottom: 6,
  },
  actionDesc: {
    fontSize: 13,
    color: "#94a3b8",
    lineHeight: 18,
    marginBottom: 16,
  },
  scanButton: {
    backgroundColor: "#d97706",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  scanButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
  offlineStatus: {
    marginTop: "auto",
    alignItems: "center",
    marginBottom: 16,
  },
  offlineText: {
    color: "#64748b",
    fontSize: 13,
  },
});
