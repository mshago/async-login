import { SafeAreaView, Text, StyleSheet, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

const axios = require('axios')

const Item = ({name}) => {
  return (<View style={styles.itemContainer}>
    <Text style={styles.title}>{name}</Text>
  </View>)
}

export const FetchApi = () => {

  const [data,setData] = useState()


  useEffect( () => {
    const fetchPokemon = async (url) => {
      try {
        const {data} = await axios.get(url)
        setData(data.results)
      } catch (err) {
        return false
      }
    }
    fetchPokemon('https://pokeapi.co/api/v2/pokemon/')
    console.log("Ahora si alv ",data)
  },[])

  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={data}
      renderItem={({item}) => <Item name={item.name}/>}
      keyExtractor={({name}) => String(name)}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'stretch'
  },
  itemContainer:{
    borderWidth:1,
    borderColor:'tomato',
    borderRadius:5,
    backgroundColor:'tomato',
    paddingVertical:15,
    paddingHorizontal:20,
    marginVertical:10,
    marginHorizontal:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
  },
  title:{
    textTransform:'capitalize',
    fontSize:18,
    color:'white',
  }
})
