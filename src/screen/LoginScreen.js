import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import {AuthContext} from '../context/authContext';

export const LoginScreen = () => {
  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <Button title="Press to Log In" onPress={() => signIn('Miguel Luna')} />
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
