import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export const LoginScreen = () => {
  const LoginForm = () => {
    const navigation = useNavigation();
    const onLoginPress = () => {
      navigation.navigate('Bio');
    };
    const onRegisterPress = () => {
      navigation.navigate('Register');
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          justifyContent: 'flex-end',
          flex: 0.2,
        }}>
        <View style={[styles.inputContainer, {marginBottom: 15}]}>
          <TextInput
            style={styles.textInput}
            textContentType={'emailAddress'}
            placeholder={'Username'}
            placeholderTextColor={'#989898'}
          />

          <SimpleLineIcons name={'user'} size={18} color={'#989898'} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            textContentType={'password'}
            placeholder={'Pass'}
            secureTextEntry={true}
            style={styles.textInput}
            placeholderTextColor={'#989898'}
          />

          <TouchableOpacity>
            <SimpleLineIcons name={'lock'} size={18} color={'#989898'} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onRegisterPress}>
            <Text
              style={{
                marginLeft: 30,
                color: '#989898',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              SIGN UP
            </Text>
          </TouchableOpacity>
          <KeyboardAvoidingView>
            <TouchableOpacity onPress={onLoginPress}>
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
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS === 'android' ? 0 : 30,
        }}
        keyboardShouldPersistTaps="handled">
        <ImageBackground
          source={require('../../assets/images/bgLogin2.png')}
          imageStyle={{
            borderBottomRightRadius: 400,
            backgroundColor: 'transparent',
          }}
          style={[styles.bgImage]}>
          <LinearGradient
            colors={['transparent', 'rgba(219,0,255,0.1)', '#00d399']}
            locations={[0, 0.65, 1]}
            style={[StyleSheet.absoluteFill, {borderBottomRightRadius: 400}]}>
            <Text style={styles.nxt}>
              NXT{'\n'} {'  '}LVL
            </Text>
            <Text style={styles.tattoo}>Tattoo</Text>
            <Text style={styles.studio}>Studio</Text>
          </LinearGradient>
          <View
            style={{
              flex: 1,
              flexDirection: 'column-reverse',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.login}>LOGIN</Text>
          </View>
        </ImageBackground>
        <LoginForm />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  bgImage: {
    flex: 1,
    top: Platform.OS === 'android' ? 0 : 44,
  },
  nxt: {
    marginTop: 40,
    color: 'white',
    fontSize: 50,
    lineHeight: 50,
    letterSpacing: -3,
    fontWeight: '800',
    fontStyle: 'italic',
    marginStart: 25,
  },
  tattoo: {
    fontWeight: '800',
    marginStart: 25,
    fontSize: 18,
    fontStyle: 'italic',
    color: 'white',
  },
  studio: {
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'white',
    marginStart: 25,
  },
  login: {
    color: 'rgba(0,0,0,0.2)',
    marginRight: 25,
    fontStyle: 'italic',
    letterSpacing: -3,
    fontWeight: '800',
    fontSize: 42,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingHorizontal: 40,
    marginHorizontal: 25,
  },
  textInput: {
    width: '100%',
    fontSize: 13,
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
});
