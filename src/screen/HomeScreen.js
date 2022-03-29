import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { AuthContext } from '../context/authContext';

export const HomeScreen = () => {

  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="Press to Log Out" onPress={() => signOut()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:20
  }
})