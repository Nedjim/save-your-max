import React, { useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { BACKGROUND } from "../constants/colors";
import List from "../containers/List";
import Footer from "../containers/Footer";
import { DATA } from "../services";

export default function Index() {
  const data = DATA;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <List
          data={data}
        />
        <Footer />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: BACKGROUND,
  },
});
