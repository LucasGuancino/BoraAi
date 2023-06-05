import { StatusBar, SafeAreaView, StyleSheet, Text } from 'react-native';
import Footer from "./Comps/Footer"
import React from 'react';
import PainelCarona from './src/PainelCarona';
import Avaliacao from './src/Avaliacao';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});