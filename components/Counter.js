import { Pressable, StyleSheet, Text , View} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from './Button';
import { useDispatch, useSelector } from "react-redux";
import { increment , decrement , incrementByAmount } from '../Redux/counterSlice';


export default function Counter() {
    const { count } = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    console.log(count);

  return (
    <View>
        <Text style={{justifyContent:'center' , marginTop:30 , left:150}}>{count}</Text>
        <Pressable style={styles.iconButtons} onPress={()=>dispatch(increment())}>INCREMENT</Pressable>
        <Pressable style={styles.iconButtons} onPress={()=>dispatch(decrement())}>DECREMENT</Pressable>
        <Pressable style={styles.iconButtons} onPress={()=>dispatch(incrementByAmount(5))}>Add 5 </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black',
    color:'white',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});
