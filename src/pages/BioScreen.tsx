/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Text,
} from 'react-native';
import {
  PanGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import * as GestureHandler from 'react-native-gesture-handler';
// import Animated, {Easing} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const fullyColapsedBottomSheetHeight = 90;
const containerHeight = height - 84;
const TOP_SNAP = 0;
const MIDDLE_SNAP = 0.2 * containerHeight;
const BOTTOM_SNAP = containerHeight - fullyColapsedBottomSheetHeight;
const TOP_TEXT_POSITION = containerHeight * 0.15;

export const BioScreen = () => {
  const dragY = useRef(new Animated.Value(0)).current;
  const translateYOffset = useRef(new Animated.Value(BOTTOM_SNAP)).current;
  const translateY = Animated.add(translateYOffset, dragY).interpolate({
    inputRange: [TOP_SNAP, BOTTOM_SNAP],
    outputRange: [TOP_SNAP, BOTTOM_SNAP],
    extrapolate: 'clamp',
  });
  const downArrowOpacity = translateY.interpolate({
    inputRange: [MIDDLE_SNAP, MIDDLE_SNAP + 10, BOTTOM_SNAP - 10, BOTTOM_SNAP],
    outputRange: [0, 1, 1, 0],
    extrapolate: 'clamp',
  });
  const upArrowOpacity = translateY.interpolate({
    inputRange: [MIDDLE_SNAP, BOTTOM_SNAP - 10, BOTTOM_SNAP],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  const dragEndTextOpacity = translateY.interpolate({
    inputRange: [MIDDLE_SNAP, MIDDLE_SNAP + 10, BOTTOM_SNAP],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  //Views behind the bottom sheet
  const visibleFromBottomOpacity = translateY.interpolate({
    inputRange: [MIDDLE_SNAP, MIDDLE_SNAP + 10, BOTTOM_SNAP],
    outputRange: [0, 1, 1],
  });
  const visibleFromTopOpacity = translateY.interpolate({
    inputRange: [MIDDLE_SNAP, MIDDLE_SNAP + 10, BOTTOM_SNAP],
    outputRange: [1, 0, 0],
  });

  const [snap, setSnap] = useState(BOTTOM_SNAP);

  const _onPanGestureEvent = Animated.event(
    [{nativeEvent: {translationY: dragY}}],
    {
      useNativeDriver: true,
    },
  );

  const _onHandlerStateChange = (
    event: GestureHandler.PanGestureHandlerStateChangeEvent,
  ) => {
    const {velocityY, oldState, translationY} = event.nativeEvent;
    if (oldState === GestureHandler.State.ACTIVE) {
      translateYOffset.extractOffset();
      translateYOffset.setValue(translationY);
      translateYOffset.flattenOffset();
      dragY.setValue(0);

      Animated.spring(translateYOffset, {
        velocity: velocityY,
        // tension: 68,
        // friction: 12,
        bounciness: 5,
        toValue: MIDDLE_SNAP,
        useNativeDriver: true,
      }).start();
      setSnap(MIDDLE_SNAP);
    }
  };

  const goTo = (value: number) => {
    setSnap(value);
    Animated.timing(translateYOffset, {
      toValue: value,
      duration: 400,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 10,
          width: 10,
          left: 0,
          backgroundColor: 'white',
          position: 'absolute',
          top: TOP_SNAP,
        }}
      />
      <View
        style={{
          height: 10,
          width: 10,
          left: 0,
          backgroundColor: 'white',
          position: 'absolute',
          top: MIDDLE_SNAP,
        }}
      />
      <View
        style={{
          height: 10,
          width: 10,
          left: 0,
          backgroundColor: 'white',
          position: 'absolute',
          top: BOTTOM_SNAP,
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 20,
          backgroundColor: '#616771',
          height: 200,
          width: '100%',
          opacity: visibleFromBottomOpacity,
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 50,
            height: 20,
            width: 50,
            backgroundColor: '#FF4500',
          }}
        />
      </Animated.View>
      <Animated.Text
        style={{
          color: 'white',
          position: 'absolute',
          top: TOP_TEXT_POSITION,
          opacity: visibleFromTopOpacity,
        }}>
        Foundation Week 1 of 3
      </Animated.Text>
      <Animated.Text
        style={{
          color: 'white',
          position: 'absolute',
          top: (height - 84) / 3,
        }}>
        Foundation Week 1 of 3
      </Animated.Text>
      <PanGestureHandler
        onHandlerStateChange={_onHandlerStateChange}
        onGestureEvent={_onPanGestureEvent}>
        <Animated.View
          style={{
            backgroundColor: 'white',
            height: containerHeight,
            width: '100%',
            position: 'absolute',
            right: 0,
            left: 0,
            top: 0,
            transform: [
              {
                translateY: translateY,
              },
            ],
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width,
              alignItems: 'center',
              justifyContent: 'center',
              height: 80,
            }}
            onPress={() => {
              goTo(snap === BOTTOM_SNAP ? MIDDLE_SNAP : BOTTOM_SNAP);
            }}>
            <Animated.Text
              style={{
                opacity: downArrowOpacity,
                color: 'black',
                fontSize: 18,
                position: 'absolute',
              }}>
              ▼
            </Animated.Text>
            <Animated.Text
              style={{
                color: 'black',
                fontSize: 18,
                position: 'absolute',
                opacity: upArrowOpacity,
              }}>
              ▲
            </Animated.Text>
            <Animated.Text
              style={{
                color: 'black',
                position: 'absolute',
                opacity: dragEndTextOpacity,
              }}>
              {' Day1   Day2   Day3'}
            </Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              borderRadius: 5,
              backgroundColor: '#FF4500',
              height: 50,
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 17}}>Start Workout</Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 100,
            }}>
            <Text style={{color: 'green'}}>91% Sets completed</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1F262A',
  },
  text: {
    position: 'absolute',
    color: 'white',
  },
});
