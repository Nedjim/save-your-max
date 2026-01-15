import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GREY } from '../constants/colors';
import Footer from '../containers/Footer';
import List from '../containers/List';

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <List />
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
    backgroundColor: GREY,
  },
});
