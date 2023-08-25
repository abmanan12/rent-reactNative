import React, { useEffect, useState, useLayoutEffect } from 'react'
import { View, Text, Linking } from 'react-native'
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/Feather';

import { useAuthContext } from '../../contexts/AuthContext';
import firestore from '@react-native-firebase/firestore';
import colors from '../../colors';

export default function Chat({ navigation, route }) {

  const [messages, setMessages] = useState([]);
  const { image, user } = useAuthContext()

  const { uid, userName, userImage, phone } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.info }}>
        {userName}</Text>,
      headerRight: () => <Text> 
        <Icon name="phone" style={{ fontSize: 25, color: colors.info }} /></Text>,
      headerTintColor: colors.info
    })
    // onPress={() => { Linking.openURL(`tel: 0${phone}`) }}
  }, [navigation]);

  useEffect(() => {

    setMessages([])

    const docid = uid > user.uid ? user.uid + uid : uid + user.uid

    const unSubscribe = firestore().collection('Chatrooms')
      .doc(docid)
      .onSnapshot(documentSnapshot => {

        documentSnapshot.exists && setMessages(documentSnapshot.data().allMessage.filter((curElem) => {
            return curElem.sentTo > curElem.sentBy ? curElem.sentBy + curElem.sentTo
              : curElem.sentTo + curElem.sentBy == docid
          }).map((curElem) => {
            if (curElem.createdAt) {
              return {
                ...curElem,
                createdAt: curElem.createdAt.toDate()
              }
            }
            else {
              return {
                ...curElem,
                createdAt: new Date()
              }
            }
          }))
      })

    return () => {
      unSubscribe()
    }

  }, [user, uid])


  const onSend = (messageArray) => {

    const msg = messageArray[0]

    const mymsg = {
      ...msg,
      sentBy: user.uid,
      sentTo: uid,
      avatar: userImage,
      createdAt: new Date()
    }

    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))

    const docid = uid > user.uid ? user.uid + uid : uid + user.uid

    let idMessages = messages.filter((curElem) => {
      return curElem.sentTo > curElem.sentBy ? curElem.sentBy + curElem.sentTo
        : curElem.sentTo + curElem.sentBy == docid
    })

    let allMessages = idMessages
    allMessages.push(mymsg)

    firestore().collection('Chatrooms')
      .doc(docid)
      .set({ allMessage: allMessages })
  }

  return (

    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <GiftedChat
        alignTop
        showUserAvatar
        renderAvatarOnTop
        alwaysShowSend
        scrollToBottom
        inverted={false}
        messages={messages}
        bottomOffset={0}
        onSend={text => onSend(text)}
        user={{
          _id: user.uid,
          avatar: image
        }}

        renderBubble={(props) => {
          return <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: colors.info,

              }

            }}
          />
        }}

        renderInputToolbar={(props) => {
          return <InputToolbar {...props}
            containerStyle={{ borderTopColor: 'green' }}
            textInputStyle={{ color: "black" }}
          />
        }}

      />
    </View>

  )
}