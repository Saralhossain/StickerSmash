import React from 'react';
import { Button, View, Text } from 'react-native';


export default function NavigateScreen({ route, navigation }){

    const {id , title , completed} = route?.params;
    console.log(id , title , completed);

  return (
    <View style={{justifyContent:'center' , flex:1}}>
        <Text>WellCome to Details Screen</Text>
            <Text>{id}</Text>
            <Text>{title}</Text>
            <Text>{completed}</Text>
    </View>
  )
}
