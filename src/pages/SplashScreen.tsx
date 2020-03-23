import React, {useEffect} from 'react';
import {View, ImageBackground, StyleSheet, Text, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

export const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    let timeout = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#e7e7e7',
        paddingBottom: Platform.OS === 'android' ? 0 : 30,
      }}>
      <ImageBackground
        source={require('../../assets/images/Splash.png')}
        style={[
          {
            height: '100%',
            overflow: 'hidden',
            flex: 0.9,
            borderBottomRightRadius: 400,
            backgroundColor: 'transparent',
          },
        ]}>
        <LinearGradient
          colors={['transparent', 'rgba(200,109,215,1)']}
          locations={[0.65, 1]}
          style={[StyleSheet.absoluteFill]}>
          <Text style={styles.nxt}>
            NXT{'\n'} {'  '}LVL
          </Text>
        </LinearGradient>
      </ImageBackground>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 0.1,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.tattoo}>Tattoo</Text>
          <Text style={styles.studio}>Studio</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={[
              styles.triangle,
              {
                backgroundColor: 'transparent',
                overflow: 'hidden',
              },
            ]}
          />
          <Icon
            name={'right'}
            size={20}
            color={'white'}
            style={{right: 25, position: 'absolute'}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nxt: {
    marginTop: Platform.OS === 'android' ? 40 : 84,
    color: 'white',
    fontSize: 50,
    lineHeight: 50,
    letterSpacing: -3,
    fontWeight: '800',
    fontStyle: 'italic',
    marginStart: 25,
  },
  triangle: {
    borderLeftWidth: 45,
    borderRightWidth: 45,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#D24175',
    transform: [{rotate: '-90deg'}],
  },
  tattoo: {
    fontWeight: '800',
    marginStart: 25,
    fontSize: 18,
    fontStyle: 'italic',
    color: '#4a4a4a',
  },
  studio: {
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'italic',
    color: '#4a4a4a',
    marginStart: 2,
  },
});
