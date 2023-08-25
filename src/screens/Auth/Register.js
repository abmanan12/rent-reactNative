import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ToastAndroid, ScrollView } from 'react-native'
import { Card, TextInput, Button } from 'react-native-paper'

import { launchImageLibrary } from 'react-native-image-picker';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import moment from 'moment';
import colors from '../../colors';


export default function Register({ navigation }) {

  const [image, setImage] = useState()
  const [state, setState] = useState({})
  const [isPasswordSecure, setIsPasswordSecure] = useState(true)

  const getRandomId = () => Math.random().toString(36).slice(2)

  const showToast = msg => {
    ToastAndroid.showWithGravityAndOffset(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
  }

  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }

  const selectFile = () => {

    let options = {

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },

    }

    launchImageLibrary(options, (res) => {

      if (res.didCancel) {
        showToast("User cancelled image picker")

      } else if (res.error) {
        showToast(res.error)

      } else if (res.customButton) {
        showToast(res.customButton)

        alert(res.customButton);
      } else {
        if (res.assets[0].fileSize > 1000124) {
          return showToast("Max image size should contain 1 MB")
        }
        setImage(res.assets[0].uri)
      }

    })

  }

  const handleSubmit = () => {

    const { firstName, lastName, email, password, confirmPassword } = state

    if (password !== confirmPassword) {
      return showToast("Password must match")
    }

    if (!firstName) {
      return showToast('Enter your First Name')
    }

    if (!lastName) {
      return showToast('Enter your last Name')
    }

    if (!image) {
      return showToast('Select your Image')
    }

    if (password.length < 5) {
      return showToast('Password min length should 6')
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {

        handleUpload(userCredential.user.uid)

        navigation.navigate('Login')
        showToast("User account created !")

      })
      .catch(error => {

        if (error.code === 'auth/email-already-in-use') {
          showToast("That email address is already in use !")
        }

        if (error.code === 'auth/invalid-email') {
          showToast("That email address is invalid !")
        }

      })

  }


  const handleUpload = async (uid) => {

    let randomId = getRandomId()

    const imagesRef = storage().ref(`profileImages/${randomId}`)

    await imagesRef.putFile(image)

    const downloadURL = await imagesRef.getDownloadURL();

    const { firstName, lastName } = state

    firestore()
      .collection('Users')
      .doc(uid)
      .set({
        firstName,
        lastName,
        image: downloadURL,
        profileId: randomId,
        createdAt: moment().format('MMMM YYYY'),
        uid: uid
      })
      .then(() => {
        // showToast("User added !")
        console.log('user added');
      });

  }


  return (
    <>

      <View style={[styles.flexCenter, styles.upperStyle]}>

        <Text style={styles.text}>Register</Text>
        <Text style={styles.upperText}>Create your account to get full access</Text>

      </View>

      <ScrollView style={{ height: '70%' }}>

        <Card style={styles.card}>

          <View style={{ flexDirection: 'row', marginHorizontal: 20, marginBottom: 6 }}>

            <TextInput style={{ width: '49%', backgroundColor: 'transparent', marginRight: '2%' }}
              label="First Name" onChangeText={val => handleChange('firstName', val)}
            />

            <TextInput style={{ width: '49%', backgroundColor: 'transparent' }}
              label="Last Name" onChangeText={val => handleChange('lastName', val)}
            />

          </View>

          <TextInput style={styles.textInput}
            label="Email"
            keyboardType='email-address'
            onChangeText={val => handleChange('email', val)}
            right={<TextInput.Icon icon={'email'} />}
          />

          <TextInput style={styles.textInput}
            label="Password"
            placeholder='Enter Your Password'
            secureTextEntry={isPasswordSecure}
            onChangeText={val => handleChange('password', val)}
            right={<TextInput.Icon icon={isPasswordSecure ? "eye-off" : "eye"}
              onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
            />}
          />

          <TextInput style={styles.textInput}
            label="Confirm Password"
            secureTextEntry={isPasswordSecure}
            onChangeText={val => handleChange('confirmPassword', val)}
            right={<TextInput.Icon icon={isPasswordSecure ? "eye-off" : "eye"}
              onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
            />}
          />

          <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
            <Button style={{ marginTop: 15, alignItems: 'flex-start' }}
              icon="camera" mode="text" onPress={selectFile}>Choose Image</Button>

            {image && <Image source={{ uri: image }} style={{ width: 50, height: 50, marginTop: 10 }} />}
          </View>

          <Button icon="login" mode="contained" onPress={handleSubmit}
            style={styles.button}>Register</Button>


          <Text style={styles.textBelow}>Already have an account ? <Text style={styles.register}
            onPress={() => { navigation.navigate('Login') }}>Login</Text> here</Text>

        </Card>

      </ScrollView>

    </>
  )
}


const styles = StyleSheet.create({
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperStyle: {
    height: '30%',
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
    // top: -26,
    paddingTop: 30,
    backgroundColor: colors.light
  },
  text: {
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.light
  },
  textInput: {
    marginBottom: 6,
    marginHorizontal: 20,
    backgroundColor: 'transparent'
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: colors.info,
    borderRadius: 10,
    marginTop: 25
  },
  textBelow: {
    marginHorizontal: 20,
    marginTop: 10
  },
  register: {
    fontSize: 15,
    color: colors.info
  }

})