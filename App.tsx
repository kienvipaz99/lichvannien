import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import Container from './src/container/Container';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Container />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
