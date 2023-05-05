import { useState } from 'react';
import {Text , View , StyleSheet , Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const validator = require('validator');

export default function Login(){
    const [username , setUsername] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');


        // function OnChangeUserName(event){
        //         setUsername(event.target.value);
        // }

        // function OnChangeEmail(event){
        //     setUsername(event.target.value);
        // }

        // function OnChangePassword(event){
        //     setUsername(event.target.value);
        // }
        function checkPassword(str)
        {
            var re =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            return re.test(str);
        }


        console.log(username , email , password);
    const Validation= (username , email , password) => {
        if(username.length < 4 ){
            alert('Username not Valid');
        }
        else if(!checkPassword(password)){
            alert('your password is not valid');
        }
        else if(!validator.isEmail(email))
        {
           alert('Your email is not valid');
        }
        else{
            alert('Login in Successful');
        }
    }



    return (
        <View>
            <Text style={{justifyContent:'center'}}>Login Form</Text>
            <Text>UserName : </Text>
            <TextInput style={styles.input}
                placeholder="Enter User Name"
                onChangeText={userName => setUsername(userName)}
                defaultValue=''
        ></TextInput>
            <Text>Email :</Text>
            <TextInput style={styles.input}
                placeholder="Enter Email"
                onChangeText={email => setEmail(email)}
                defaultValue=''
        ></TextInput>
        <Text>Password : </Text>
            <TextInput style={styles.input}
                placeholder="Enter your Password"
                onChangeText={pass => setPassword(pass)}
                defaultValue=''
        ></TextInput>
        <Button title="Submit" onPress={()=>{Validation(username , email , password)}} />
        </View>

    )


}




const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button:{
        width:100,
    }
  });