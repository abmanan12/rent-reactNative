import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'

import firestore from '@react-native-firebase/firestore';

import { useAuthContext } from '../../contexts/AuthContext';
// import { FAB } from 'react-native-paper';

export default function PrevChat({ navigation }) {

    const [users, setUsers] = useState(null)
    const { user } = useAuthContext()

    const getUsers = async () => {
        const querySanp = await firestore().collection('Users').where('uid', '!=', user.uid).get()
        const allusers = querySanp.docs.map(docSnap => docSnap.data())
        setUsers(allusers)
    }

    useEffect(() => {
        getUsers()
    }, [])

    const RenderCard = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Chat', {
                uid: item.uid, userName: item.firstName + ' ' + item.lastName,
                userImage: item.image
                // status: typeof (item.status) == "string" ? item.status : item.status.toDate().toString()
            })}>
                <View style={styles.mycard}>
                    <Image source={{ uri: item.image }} style={styles.img} />
                    <View>
                        <Text style={styles.text}>
                            {item.firstName} {item.lastName}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>

            <View style={{ flex: 1, margin: 5 }}>
                <FlatList
                    data={users}
                    renderItem={({ item }) => { return <RenderCard item={item} /> }}
                    keyExtractor={(item) => item.uid}
                />

                {/* <FAB
                    style={styles.fab}
                    icon="usb"
                    color="black"
                    onPress={() => navigation.navigate("Chat", { uid: user.uid })}
                /> */}

            </View>

        </>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        marginHorizontal: 20
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "green"
    },
    text: {
        fontSize: 18,
        marginLeft: 15,
    },
    mycard: {
        flexDirection: "row",
        margin: 3,
        padding: 4,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    // fab: {
    //     position: 'absolute',
    //     margin: 16,
    //     right: 0,
    //     bottom: 0,
    //     backgroundColor: "white"
    // },
})