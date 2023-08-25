import React, { useState } from 'react'
import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import { Card, TextInput, Button } from 'react-native-paper'

import auth from '@react-native-firebase/auth';
import colors from '../../colors';

export default function Login({ navigation }) {

  const [state, setState] = useState({})
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }

  const handleLogin = () => {

    const { email, password } = state

    const showToast = msg => {
      ToastAndroid.showWithGravityAndOffset(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Root')
        showToast('User signed in!')
      })
      .catch(error => {

        if (error.code === 'auth/user-not-found') {
          showToast('User not found')
        }

        if (error.code === 'auth/wrong-password') {
          showToast('wrong password')
        }

      })

  }


  return (
    <>

      <View style={[styles.flexCenter, styles.upperStyle]}>

        <Text style={styles.text}>Login</Text>
        <Text style={styles.upperText}>Enter Login details to get access</Text>

      </View>

      <View style={[styles.flexCenter, { height: '70%',  }]}>

        <Card style={styles.card}>

          <TextInput style={styles.textInput}
            label="Email"
            keyboardType='email-address'
            onChangeText={val => handleChange('email', val)}
            right={<TextInput.Icon icon={'email'} />}
          />

          <TextInput style={styles.textInput}
            label="Password"
            secureTextEntry={isPasswordSecure}
            onChangeText={val => handleChange('password', val)}
            right={<TextInput.Icon icon={isPasswordSecure ? "eye-off" : "eye"}
              onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
            />}
          />

          <View style={styles.passwordText}>
            <Text style={styles.textColor}>Show Password</Text>

            <Text style={styles.textColor} onPress={() => { navigation.navigate('ForgotPassword') }}>
              Forgot Password ?</Text>
          </View>

          <Button icon="login" mode="contained" onPress={handleLogin}
            style={styles.button}>Login</Button>

          <Text style={styles.textBelow}>Don't have an account ? <Text style={styles.register}
            onPress={() => { navigation.navigate('Register') }}>Register</Text> here</Text>

        </Card>

      </View>

    </>
  )
}


const styles = StyleSheet.create({

  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperStyle: {
    height: '35%',
    backgroundColor: colors.info,
  },
  upperText: {
    color: colors.light,
  },
  card: {
    height: '110%',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'relative',
    marginHorizontal: 20,
    paddingTop: 30,
    backgroundColor: colors.light
  },
  text: {
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: 'bold',
    color: colors.light,
    fontSize: 30
  },
  textInput: {
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: 'transparent'
  },
  passwordText: {
    color: colors.info,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textColor: {
    color: colors.info,
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: colors.info,
    borderRadius: 10,
    marginTop: 40
  },
  textBelow: {
    marginHorizontal: 20,
    marginTop: 20
  },
  register: {
    color: colors.info,
    fontSize: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20
  }

})