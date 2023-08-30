import { View, Text, Image } from 'react-native'

import colors from '../colors'
import Spinner from 'react-native-spinkit'

export default function Loader() {

    const LogoImage = () => {
        return <Image style={{ width: 200, height: 75, backgroundColor: 'transparent', }} source={require('../assets/images/logo1.png')} />
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <View>
                <LogoImage />
            </View>

            <View style={{top: 75}}>
                <Spinner isVisible={true} size={50} type="9CubeGrid" color={colors.info} />
            </View>

            <Text style={{ marginTop: 95, color: colors.info, fontSize: 14 }}>Loading...</Text>

        </View>
    )
}