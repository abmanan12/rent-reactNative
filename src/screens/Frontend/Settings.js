import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, RefreshControl } from 'react-native'

import { Avatar } from 'react-native-paper';
import colors from '../../colors';
import { useAuthContext } from '../../contexts/AuthContext';

import Dialog from "react-native-dialog";
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function Settings({ navigation }) {

  const { user, showToast, onRefresh, refreshing } = useAuthContext()
  const [userData, setUserData] = useState()
  const [image, setImage] = useState('')
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState()

  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)


  useEffect(() => {

    firestore()
      .collection('Users').where("uid", "==", user.uid)
      .get()
      .then(querySnapshot => {

        querySnapshot.forEach(documentSnapshot => {
          let data = documentSnapshot.data();
          setUserData(data)
          setImage(data.image)
        })
      })

  }, [])

  const selectFile = () => {

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    launchImageLibrary(options, (res) => {

      if (res.didCancel) {
        showToast("Image cancelled")
      } else if (res.error) {
        showToast(res.error)
      } else if (res.customButton) {
        showToast(res.customButton)
      } else {
        if (res.assets[0].fileSize > 1000124) {
          return showToast("Max image size should contain 1 MB")
        }
        setImage(res.assets[0].uri)
        changeImage(res.assets[0].uri)
      }

    })
  }

  const changeImage = async (img) => {

    var desertRef = storage().ref(`profileImages/${userData?.profileId}`)

    desertRef.delete().then(function () {
      // showToast('File deleted successfully')
      console.log('File deleted successfully');
    }).catch(function (error) {
      showToast('Something went wrong')
      console.log(error);
    })

    const imagesRef = storage().ref(`profileImages/${userData?.profileId}`)

    await imagesRef.putFile(img)

    const downloadURL = await imagesRef.getDownloadURL();

    let editObj = { ...userData, image: downloadURL }

    firestore()
      .collection('Users')
      .doc(userData?.uid)
      .update(editObj)
      .then(() => {
        showToast('Profile Image has been Updated!')
      })

  }


  const handleEmail = email => {
    setEmail(email)
  }

  const updateEmail = email => {

    user?.updateEmail(email).then(() => {
      showToast('Email Updated!')
    }).catch((error) => {
      showToast('Something went wrong')
      console.log(error);
    })

    setVisible1(false)

  }


  const handleChange = (name, value) => {
    setUserData(s => ({ ...s, [name]: value }))
  }

  const updateName = () => {

    let editData = { ...userData }

    firestore()
      .collection('Users')
      .doc(userData?.uid)
      .update(editData)
      .then(() => {
        showToast('Username updated!')
      })

    setVisible2(false)

  }


  const handlePassword = password => {
    setPassword(password)
  }

  const updatePassword = password => {

    user?.updatePassword(password).then(() => {
      showToast('Password Updated!')
    }).catch((error) => {
      console.log('An error occurred')
      console.log(error);
    })

    setVisible3(false)

  }

  return (
    <>

      <ScrollView style={{ paddingHorizontal: 30 }} refreshControl={<RefreshControl
        refreshing={refreshing} onRefresh={onRefresh} />}>

        <View style={styles.img}>
          {image
            ? <>
              <Image style={{ width: 74, height: 74, borderRadius: 37 }} source={{ uri: image }} />
              <Text style={[styles.h5, { marginTop: 16 }]} onPress={selectFile}>Change Image</Text>
            </>
            : <Avatar.Text size={74} label="U" />
          }
        </View>

        <Text style={styles.h4}>Email</Text>
        <View style={styles.txt}>
          <Text>{email}</Text>
          <Text style={styles.h5} onPress={() => { setVisible1(true) }}>Edit</Text>
        </View>

        <Text style={styles.h4}>Username</Text>
        <View style={styles.txt}>
          {/* <Text>{firstName + ' ' + lastName}</Text> */}
          <Text>{userData?.firstName + ' ' + userData?.lastName}</Text>
          <Text style={styles.h5} onPress={() => { setVisible2(true) }}>Edit</Text>
        </View>

        <Text style={styles.h4}>Password</Text>
        <View style={styles.txt}>
          <Text style={{ fontSize: 10 }}>........................</Text>
          <Text style={styles.h5} onPress={() => { setVisible3(true) }}>Edit</Text>
        </View>

      </ScrollView>

      {/* For Email */}
      <Dialog.Container visible={visible1}>
        <Dialog.Title>Change your Email</Dialog.Title>
        <Dialog.Input value={email} onChangeText={val => handleEmail(val)}></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={() => { setVisible1(false) }} />
        <Dialog.Button label="Save Changes" onPress={() => { updateEmail(email) }} />
      </Dialog.Container>

      {/* For UserName */}
      <Dialog.Container visible={visible2}>
        <Dialog.Title>Change your Username</Dialog.Title>
        <Dialog.Input value={userData?.firstName} onChangeText={val => handleChange('firstName', val)}></Dialog.Input>
        <Dialog.Input value={userData?.lastName} onChangeText={val => handleChange('lastName', val)}></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={() => { setVisible2(false) }} />
        <Dialog.Button label="Save Changes" onPress={updateName} />
      </Dialog.Container>

      {/* For Password */}
      <Dialog.Container visible={visible3}>
        <Dialog.Title>Change your Password</Dialog.Title>
        <Dialog.Input placeholder='Password' onChangeText={val => handlePassword(val)}></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={() => { setVisible3(false) }} />
        <Dialog.Button label="Save Changes" onPress={() => { updatePassword(password) }} />
      </Dialog.Container>

    </>
  )
}


const styles = StyleSheet.create({

  img: {
    marginTop: 40,
    marginBottom: 50,
    alignItems: 'center'
  },
  txt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30
  },
  h4: {
    paddingBottom: 5,
    color: colors.info,
    fontWeight: 'bold'
  },
  h5: {
    color: colors.info
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

})