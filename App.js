
//Libraries
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState , useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';


//Components
import ImageViewer from './components/imageViewer';
import Button from './components/Button';
import CircleButton from './components/circleButton';
import IconButton from './components/iconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';


//Assests
const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
  const imageRef = useRef();

  //Save media on device
  // const onSaveImageAsync = async () => {
    
  // };

  //Uploading Image
  const [selectedImage , setSelectedImage] = useState(null);
  //Show Button Options
  const [showAppOptions , setShowAppOptions]=useState(false);
  const [isModalVisible , setIsModalVisible]=useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  //Permission for taking screenshots
  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async() => {
      let result =  await ImagePicker.launchImageLibraryAsync({
        allowsEditing:true,
        quality:1,
      });
      
      if(!result.canceled)
      {
        setSelectedImage(result.assets[0].uri);
        setShowAppOptions(true);
      }
      else{
        alert('You did not select any image.');
      }
    };

      //If onReset will Call it will turnon select choose a photo/use this photo buttons 
    const onReset = () => {
      setShowAppOptions(false);
    };

    //this options shows the sticker list 
    const onAddSticker = () => {
      setIsModalVisible(true);
      // we will implement this later
    };

    const onModalClose= () =>{
      setIsModalVisible(false);
    };
  
    //Save media on device
    const onSaveImageAsync = async () => {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
  
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    };



  return (
    <GestureHandlerRootView style={styles.container}>
    {/* <View style={styles.container}> */}
      <View  style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
          {pickedEmoji !==null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null }
        </View>
      </View>
      { showAppOptions ?
       (
        <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
        </View>
      ) 
      :(
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" onPress={()=> setShowAppOptions(true)} />
      </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
         <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    {/* </View> */}
    </GestureHandlerRootView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});