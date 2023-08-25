import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Card, TextInput, Button } from 'react-native-paper'

import auth from '@react-native-firebase/auth';
import colors from '../../colors';

export default function ForgotPassword({ navigation }) {

  const [state, setState] = useState({})

  const showToast = msg => {
    ToastAndroid.showWithGravityAndOffset(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
  }

  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }

  const handleSubmit = async () => {

    const { email } = state

    await auth().sendPasswordResetEmail(email)

      .then(() => {
        showToast(`Reset email sent to ${email}`)
        navigation.navigate('Login')
      })
      .catch(error => {
        if (error.code == 'auth/user-not-found') {
          showToast('User not found!')
        }
        else {
          showToast('Something went wrong')
        }
      })
  }

  return (
    <>

      <View style={[styles.flexCenter, styles.upperStyle]}>

        <Text style={styles.text}>Forgot Password</Text>
        <Text style={styles.upperText}>Enter your details to get access</Text>

      </View>

      <View style={[styles.flexCenter, { height: '70%' }]}>

        <Card style={styles.card}>

          <TextInput style={styles.textInput}
            label="Enter Email"
            keyboardType='email-address'
            onChangeText={val => handleChange('email', val)}
            right={<TextInput.Icon icon={'email'} />}
          />

          <Button icon="login" mode="contained" onPress={handleSubmit}
            style={styles.button}>Send Link</Button>

          <View style={styles.passwordText}>
            <Text style={styles.textColor} onPress={() => { navigation.navigate('Login') }}>
              Back to Login</Text>

            <Text style={styles.textColor} onPress={() => { navigation.navigate('Register') }}>
              Create new account ?</Text>
          </View>

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
    color: colors.light
  },
  card: {
    height: '110%',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'relative',
    // top: -16,
    marginHorizontal: 20,
    paddingTop: 45,
    marginTop: 20,
    backgroundColor: colors.light
  },
  text: {
    color: colors.light,
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    fontWeight: 'bold',
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
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textColor: {
    color: colors.info
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: colors.info,
    borderRadius: 10,
    marginTop: 25
  },
})