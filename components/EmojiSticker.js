import {View , Image } from 'react-native';

export default function EmojiSpicker({imageSize , stickerSource}){

        return (
            <View style ={{top: -350}}>
                <Image 
                    source={stickerSource}
                    sizeMode="contain"
                    style={{width:imageSize , height:imageSize}}
                />
            </View>
        );

}