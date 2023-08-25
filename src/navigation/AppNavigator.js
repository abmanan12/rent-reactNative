import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerToggleButton }
    from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

import Hero from '../screens/Frontend/Home/Hero';
import Products from '../screens/Frontend/Products';
import MyAds from '../screens/Frontend/MyAds';
import ListItems from '../screens/Frontend/ListItems';
import Cart from '../screens/Frontend/Cart';
import Chat from '../screens/Frontend/Chat';
import Settings from '../screens/Frontend/Settings';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import { Avatar } from 'react-native-paper';
import SingalProduct from '../components/SingalProduct';
import Product from '../components/Product';
import ListAds from '../components/ListAds';
import ProductsCategory from '../components/ProductsCategory';
import { useAuthContext } from '../contexts/AuthContext';
import { useCartContext } from '../contexts/CartContext';
import PrevChat from '../screens/Frontend/PrevChat';
import colors from '../colors';
import Loader from '../components/Loader';

export default function AppNavigator() {

    const { cart } = useCartContext()
    const [isLoading, setIsLoading] = useState(true);
    const { name, image, handleLogout, isAuthenticated, user } = useAuthContext()

    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

    }, []);

    if (isLoading) {
        return <Loader />
    }

    let uidCart = cart?.filter((curElem) => {
        return curElem.uid === user?.uid
    })

    const LogoImage = () => {
        return <Image style={{ width: 100, height: 40, backgroundColor: 'transparent' }} source={require('../assets/images/logoo.png')} />
    }

    const MyTabs = () => {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: colors.info
                }}
            >

                <Tab.Screen name='Hero' component={Hero}
                    options={{
                        // headerTitle: 'My Home',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home" color={color} size={size} />
                        )
                    }}
                />

                <Tab.Screen name='Products' component={Products}
                    options={{
                        tabBarLabel: 'Groups',
                        tabBarIcon: ({ color, size }) => (
                            <EntypoIcon name="shop" color={color} size={size} />
                        ),
                    }}
                />

                <Tab.Screen name='Cart' component={Cart}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="cart-arrow-down" color={color} size={size} />
                        ), tabBarBadge: uidCart.length,
                        tabBarBadgeStyle: {
                            color: 'white',
                            backgroundColor: colors.info,
                        }
                    }}
                />

            </Tab.Navigator>
        )
    }

    const CustomDrawerContent = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                <View style={{
                    height: 160, marginBottom: 24, paddingBottom: 10,
                    justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1
                }}>

                    {image
                        ? <>
                            <Image style={{ width: 74, height: 74, borderRadius: 37 }}
                                source={{ uri: image }} />

                            <Text style={{ marginTop: 16, fontSize: 20, fontWeight: 'bold', color: colors.info }}>{name}</Text>
                        </>
                        : <>
                            <Avatar.Text size={74} label="U" />
                            <Text style={{ marginTop: 16, fontSize: 20, fontWeight: 'bold', color: colors.info }}>User Name!</Text>
                        </>
                    }
                </View>

                <DrawerItemList {...props} />

                {isAuthenticated
                    && <DrawerItem
                        label="Logout"
                        style={{ paddingLeft: 3 }}
                        icon={({ color, size }) => <Icon color={color} size={size} name={'sign-out'} />}
                        onPress={handleLogout}
                    />
                }
            </DrawerContentScrollView>
        );
    }

    const MyDrawer = () => {
        return (
            <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerTitle: '',
                    headerRight: () => <DrawerToggleButton tintColor='white' />,
                    headerLeft: () => <LogoImage />,
                    headerLeftContainerStyle: {
                        marginLeft: 10
                    },
                    headerRightContainerStyle: {
                        marginRight: 10
                    },
                    headerShadowVisible: false,
                    drawerActiveTintColor: colors.info,
                    headerTitleStyle: { fontWeight: 'bold', color: colors.info },
                    drawerStyle: {
                        width: 240,
                    },
                    headerStyle: { backgroundColor: colors.info },
                }}>

                <Drawer.Screen name="RootDrawer" component={MyTabs}
                    options={{
                        headerLeft: () => <LogoImage />,
                        drawerLabel: 'Home',
                        drawerIcon: ({ color, size }) => (
                            <Icon name="home" color={color} size={size} />
                        ),
                    }}
                />

                <Drawer.Screen name="Cart" component={isAuthenticated ? Cart : Login}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="cart-arrow-down" color={color} size={size} />
                        )
                    }}
                />

                <Drawer.Screen name="PrevChat" component={isAuthenticated ? PrevChat : Login}
                    options={{
                        drawerLabel: 'Chat',
                        headerTitle: 'All Messages',
                        drawerIcon: ({ color, size }) => (
                            <Octicons name="comment-discussion" color={color} size={size} />
                        )
                    }}
                />

                <Drawer.Screen name="List Items" component={isAuthenticated ? ListItems : Login}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <EntypoIcon name="add-to-list" color={color} size={size} />
                        )
                    }}
                />

                <Drawer.Screen name="My Ads" component={isAuthenticated ? MyAds : Login}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <EntypoIcon name="list" color={color} size={size} />
                        )
                    }}
                />

                <Drawer.Screen name="Settings" component={isAuthenticated ? Settings : Login}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="settings" color={color} size={size} />
                        )
                    }}
                />

                {!isAuthenticated
                    && <Drawer.Screen name="Login" component={Login}
                        options={{
                            headerShown: false,
                            drawerLabel: 'Login/Register',
                            drawerIcon: ({ color, size }) => (
                                <Icon name="user-circle" color={color} size={size} />
                            )
                        }}
                    />
                }

            </Drawer.Navigator>
        );
    }

    return (
        <>

            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='Root'>

                    <Stack.Group>
                        <Stack.Screen name="Root" component={MyDrawer}
                            options={{
                                // headerTitle: 'My Home',
                                headerShown: false
                            }}
                        />

                        <Stack.Screen name="Product" component={Product} />

                        <Stack.Screen name="Products" component={Products} />

                        <Stack.Screen name="SingalProduct" component={SingalProduct}
                            options={{
                                headerTitle: 'Product Details',
                                headerTintColor: colors.info
                            }} />

                        <Stack.Screen name="ListAds" component={ListAds}
                            options={{
                                headerTitle: 'Other Ads',
                                headerTintColor: colors.info
                            }} />

                        <Stack.Screen name="ProductsCategory" component={ProductsCategory}
                            options={{
                                headerTitle: 'Category Type Products',
                                headerTintColor: colors.info
                            }} />

                        <Stack.Screen name="Chat" component={isAuthenticated ? Chat : Login} />

                    </Stack.Group>

                    <Stack.Group
                        screenOptions={{
                            headerShown: false
                        }}>

                        <Stack.Screen name="Login" component={Login} />

                        <Stack.Screen name="Register" component={Register} />

                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />


                    </Stack.Group>

                </Stack.Navigator>
            </NavigationContainer>

        </>
    )
}
