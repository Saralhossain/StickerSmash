import {View , Image } from 'react-native';
// import Animated from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';



const AnimatedImage = Animated.createAnimatedComponent(Image);


export default function EmojiSpicker({imageSize , stickerSource}){
    const scaleImage = useSharedValue(imageSize);


    const onDoubleTap = useAnimatedGestureHandler({
        onActive: () => {
          if (scaleImage.value) {
            scaleImage.value = scaleImage.value * 1.5;
          }
        },
      });

      const imageStyle = useAnimatedStyle(() => {
        return {
          width: withSpring(scaleImage.value),
          height: withSpring(scaleImage.value),
        };
      });
      
        return (
            <View style ={{top: -250 , left:100}}>
            <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
                <AnimatedImage
                    source={stickerSource}
                    sizeMode="contain"
                    style={[imageStyle, { width: imageSize, height: imageSize }]}
                />
                </TapGestureHandler>
            </View>
        );

}