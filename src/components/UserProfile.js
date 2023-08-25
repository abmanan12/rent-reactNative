import { View, Text, Image } from 'react-native'
import React from 'react'
import { useProductContext } from '../contexts/ProductContext'
import { Avatar } from 'react-native-paper'

export default function UserProfile() {

    const { profileName, profileTime, profileImage } = useProductContext()

    return (
        <>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View>
                    {profileImage
                        ? <Image style={{ width: 74, height: 74, borderRadius: 37 }}
                            source={{ uri: profileImage }} />
                        : <Avatar.Text size={74} label="U" />
                    }
                </View>

                <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>{profileName}</Text>
                    <Text>Member Since {profileTime}</Text>
                </View>

            </View>

        </>
    )
}