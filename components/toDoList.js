import { useState,useEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar , Button , Modal} from "react-native";
import axios from 'axios';
// import { Modal } from "react-native-web";


export default function NetworkCall({item}){
  

const renderEmpty = () => (
    <View style={styles.item}>
        <Text style={styles.title}>Nothing to display</Text>
    </View>
  );
  
      
  return(
    <Modal >
        <View style={styles.item}>
                <Text style={styles.userid}>{item.userId}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.Status}>{item.completed}</Text>
                <Button style={styles.button} title="Show"></Button>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20
  },
  item: {
    backgroundColor: '#000000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  userid:{
    fontSize: 20,
    color:`#fff8dc`,
    left:13,
    fontWeight:"bold",
  },
  title: {
    fontSize: 20,
    color:`#fff8dc`,
    left:35,
    top:-25,
  },
  Status:{
    fontSize:10,
    top:-20,
    color:`#fffaf0`,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});