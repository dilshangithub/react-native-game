import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Form,
  Image,
  FormLabel,
  StyledInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessButton from '../../components/buttons/successbutton';
import UrlButton from '../../components/buttons/urlbutton';
import {FONTS} from '../../components/theme';
import icons from '../../components/icons';
import UpperNavBar from '../../components/upperNavBar';
import images from '../../components/images';
import textInputValidateUtil from '../../utils/textInputValidateUtil';
import soundEffectsUtil from '../../utils/soundEffectsUtil';
import firebaseAuthUtil from '../../utils/firebaseAuthUtil';

KeepAwake.activate();

const SignupScreen = ({navigation}) => {
  useEffect(() => {}, []);

  const [errorFlag, setErrorFlag] = React.useState({});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUser] = useState(null);
  const [loaderVisible, setLoaderVisible] = useState(false);

  const [showPassword, setshowPassword] = useState(false);

  const signupMe = async () => {
    let topScore = 0;
    const error = textInputValidateUtil.validateSignupForm(
      email,
      password,
      firstName,
      lastName,
    );

    if (error) {
      setErrorFlag(error);
      return;
    }

    setErrorFlag({});
    setLoaderVisible(true);

    setUser(
      await firebaseAuthUtil.createUser(email, password, firstName, lastName),
    );
  };

  useEffect(() => {
    console.log(user);
    if (user != null) {
      setLoaderVisible(false);
      navigation.navigate('LoginScreen');
    } else {
      setLoaderVisible(false);
    }
  }, [user !== null]);

  function rendersignupView() {
    return (
      <View>
        {loaderVisible ? (
          <ActivityIndicator size="large" color="#977746" />
        ) : null}

        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: '#ddedea'}}>
            {/* Body */}
            <View style={{flex: 1}}>
              <Text style={{...FONTS.header1, marginTop: 25, color: '#ff6600'}}>
                Create your account!
              </Text>
              <View style={{marginTop: 15}}>
                <UrlButton
                  title="Already have an account? Log in"
                  customClick={() => {
                    navigation.navigate('LoginScreen'),
                      soundEffectsUtil.touchableButtonSound();
                  }}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  marginTop: 40,
                  marginLeft: 30,
                  marginRight: 30,
                }}>
                <Text
                  style={{
                    marginLeft: 20,
                    marginBottom: 5,
                    ...FONTS.header3,
                  }}>
                  Email
                </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    onChangeText={value => setEmail(value)}
                  />
                </View>
                <View
                  style={{marginTop: -20, marginBottom: 15, marginLeft: 20}}>
                  {Boolean(errorFlag.emailError) && (
                    <Text style={{color: 'red'}}>{errorFlag.emailError}</Text>
                  )}
                </View>

                <Text
                  style={{
                    marginLeft: 20,
                    marginBottom: 5,
                    ...FONTS.header3,
                  }}>
                  Password
                </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    secureTextEntry={!showPassword}
                    onChangeText={value => setPassword(value)}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 10,
                      bottom: 5,
                      height: 30,
                      width: 30,
                    }}
                    onPress={() => setshowPassword(!showPassword)}>
                    <Image
                      source={
                        showPassword ? icons.disable_eye : icons.enable_eye
                      }
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: '#7a7a52',
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{marginTop: -20, marginBottom: 15, marginLeft: 20}}>
                  {Boolean(errorFlag.passwordError) && (
                    <Text style={{color: 'red'}}>
                      {errorFlag.passwordError}
                    </Text>
                  )}
                </View>

                <Text
                  style={{
                    marginLeft: 20,
                    marginBottom: 5,
                    ...FONTS.header3,
                  }}>
                  Firsr Name
                </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    onChangeText={value => setFirstName(value)}
                  />
                </View>

                <View
                  style={{marginTop: -20, marginBottom: 15, marginLeft: 20}}>
                  {Boolean(errorFlag.firstNameError) && (
                    <Text style={{color: 'red'}}>
                      {errorFlag.firstNameError}
                    </Text>
                  )}
                </View>

                <Text
                  style={{
                    marginLeft: 20,
                    marginBottom: 5,
                    ...FONTS.header3,
                  }}>
                  Last Name
                </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    onChangeText={value => setLastName(value)}
                  />
                </View>

                <View
                  style={{marginTop: -20, marginBottom: 15, marginLeft: 20}}>
                  {Boolean(errorFlag.lastNameError) && (
                    <Text style={{color: 'red'}}>
                      {errorFlag.lastNameError}
                    </Text>
                  )}
                </View>

                <View style={{marginTop: 20}}>
                  <SuccessButton
                    title="Sign Up"
                    customClick={() => {
                      signupMe(), soundEffectsUtil.touchableButtonSound();
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.android === 'android' ? 'padding' : null}
      style={{flex: 1}}>
      <UpperNavBar navigation={navigation} />

      <LinearGradient colors={['#ddedea', '#ddedea']} style={{flex: 1}}>
        <ScrollView>{rendersignupView()}</ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderColor: '#7a7a52',
    borderWidth: 2,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
});

export default SignupScreen;
