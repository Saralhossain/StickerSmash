import { useState,useEffect,useCallback } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar , Button , Modal , Image} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useMediaLibraryPermissions } from "expo-image-picker";
import { userData } from "../Redux/userReducer";
import axios from 'axios';

export default function NetworkCall({navigation})
{
    const { usersData } = useSelector((state) => state.userDataSet);
    const dispatch = useDispatch();

    const [users , setUsers] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData,setModalData]=useState({});
    const [emoji] = useState([
      require('../assets/images/emoji1.png'),
      require('../assets/images/emoji2.png'),
      require('../assets/images/emoji3.png'),
      require('../assets/images/emoji4.png'),
      require('../assets/images/emoji5.png'),
      require('../assets/images/emoji6.png'),
  ]);
      
  useFocusEffect(
    useCallback(()=>{
        axios({
            method: 'get',
            url: `https://jsonplaceholder.typicode.com/todos`,
          }).then((response) => {
            // setUsers(response.data);
            dispatch(userData(response.data));
            // usersData = response.data;
          });
      },[])
  )


      console.log("Here is my user Data in my NetworkCall : " , usersData);

      // // console.log(users); 
      // useEffect(()=>{
      //   axios({
      //       method: 'get',
      //       url: `https://jsonplaceholder.typicode.com/todos`,
      //     }).then((response) => {
      //       setUsers(response.data);
      //     });
      // },[])

    const ShowList=(userId , title , completed)=>{
      setModalData({
        userId,
        title,
        completed
      });
      setModalVisible(true);
    }

      const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.userid}>{item.userId}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.Status}>{item.completed}</Text>
            <Button style={styles.button} title="Show" onPress={()=>{ShowList(item.userId , item.title , item.completed)}}></Button>
        </View>
      );
 
  return(
              <View style={styles.container}>
                  <Text style={{left:100}}>Hello wellcome to my ToDo_List</Text>
                  <FlatList
                    data={usersData}
                    renderItem={renderItem}
                    keyExtractor={usersData => usersData.id}
                    ListEmptyComponent={renderEmpty}
                  />
                  <Modal
                    animationType="slide"
                    visible={modalVisible}
                    style={styles.modalView}
                  >
                    <View style={styles.modalView}>
                          <Text style={styles._id}>{modalData.userId}</Text>
                          <Text style={styles.title}>{modalData.title}</Text>
                          <Text style={styles.Status}>{modalData.completed}</Text>
                          <Button style={styles.button} title="close" onPress={() => setModalVisible(!modalVisible)}></Button>
                          <Button style={styles.button}
                            title="Go to details"
                            onPress={() => {
                              navigation.navigate('navigateScreen', {
                                itemId: modalData.userId,
                                title:modalData.title,
                                completed:modalData.completed,
                              });
                            }}
                          />
                    </View>
                  </Modal>
              </View>
  )
}


const renderEmpty = () => (
  <View style={styles.item}>
      <Text style={styles.title}>Nothing to display</Text>
  </View>
);


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
  _id:{
    fontSize: 20,
    color:`#fff8dc`,
    left:0,
    top:-50,
    fontWeight:"bold",
  },
  userid:{
    fontSize: 20,
    color:`#fff8dc`,
    // left:10,
    fontWeight:"bold",
  },
  title: {
    fontSize: 20,
    color:`#fff8dc`,
    left:15,
    top:-25,
  },
  Status:{
    fontSize:10,
    color:`#fffaf0`,
  },
  tinyLogo:{
    justifyContent:'center',
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin:20,
  },
  modalView: {
    backgroundColor:'#000000',
    marginLeft: 50,
    margin:20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    height:20,
    width:300,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // justifyContent:"center",
  },
});