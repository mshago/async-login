import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';

export const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});