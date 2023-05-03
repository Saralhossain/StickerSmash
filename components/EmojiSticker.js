import {View , Image } from 'react-native';
// import Animated from 'react-native-reanimated';
import { TapGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
// import {  , TapGestureHandler} from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';



const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

export default function EmojiSpicker({imageSize , stickerSource}){
    //initial posi of sticker
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);


    const scaleImage = useSharedValue(imageSize);

    //increase the size of sticker when On tap
    const onDoubleTap = useAnimatedGestureHandler({
        onActive: () => {
          if (scaleImage.value) {
            scaleImage.value = scaleImage.value * 1.5;
          }
        },
      });

      //initialize size of sticker
      const imageStyle = useAnimatedStyle(() => {
        return {
          width: withSpring(scaleImage.value),
          height: withSpring(scaleImage.value),
        };
      });

      //After onLongPress the value of x,y position of sticker will be stored
      const onDrag = useAnimatedGestureHandler({
        //Starting Value
        onStart: (event, context) => {
          context.translateX = translateX.value;
          context.translateY = translateY.value;
        },
        //Onactive callback the value x,y , moving position of sticker
        onActive: (event, context) => {
          translateX.value = event.translationX + context.translateX;
          translateY.value = event.translationY + context.translateY;
        },
      });
      

      //change the sticker's position when the gesture is active.
      const containerStyle = useAnimatedStyle(() => {
        return {
          transform: [
            {
              translateX: translateX.value,
            },
            {
              translateY: translateY.value,
            },
          ],
        };
      });
      
        return (
            <PanGestureHandler onGestureEvent={onDrag}>
                <AnimatedView style ={[containerStyle , {top: -250 , left:100}]} >
                <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
                    <AnimatedImage
                        source={stickerSource}
                        sizeMode="contain"
                        style={[imageStyle, { width: imageSize, height: imageSize }]}
                    />
                    </TapGestureHandler>
                </AnimatedView>
            </PanGestureHandler>
        );

}