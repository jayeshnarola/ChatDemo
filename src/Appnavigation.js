import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import Login from './screens/Login'
import React from "react";
import { Image } from 'react-native';
import Register from './screens/Register'
import ChatList from "./screens/ChatList";
import Profile from "./screens/Profile";
import ChatRoom from "./screens/ChatRoom";
import AddNewChat from "./screens/AddNewChat";
import { Images } from "./Config";
import SplashScreen from "./screens/SplashScreen";
import Scanner from "./screens/Scanner";
import ImageGallery from "./screens/ImageGallery";

const TabNavigator = createBottomTabNavigator({
    Scanner: Scanner,
    ChatList: ChatList,
    Profile: Profile,
},

    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'GroupChat') {
                    return <Image style={{ height: 30, width: 30, tintColor }} source={Images.Camera1} />
                } else if (routeName === 'ChatList') {
                    return <Image style={{ height: 25, width: 25, tintColor }} source={Images.Chat} />
                } else if (routeName === 'Profile') {
                    return <Image style={{ height: 25, width: 25, tintColor }} source={Images.Profile} />
                }
            },
            tabBarOnPress: (scene, jumpToIndex) => {
                navigation.navigate(scene.navigation.state.key, { change: true });
            }
        }),
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'grey',
            showLabel: false,
            style: {
                backgroundColor: '#3e3e3e',
                paddingTop: 10,
            }
        },
    },
);

const AppNavigator = createStackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    ChatList: {
        screen: TabNavigator,
        navigationOptions: {
            header: null
        }
    },
    ChatRoom: {
        screen: ChatRoom,
        navigationOptions: {
            header: null
        }
    },
    AddNewChat: {
        screen: AddNewChat,
        navigationOptions: {
            header: null
        }
    },
    Scanner: {
        screen: Scanner,
        navigationOptions: {
            header: null
        }
    },
    ImageGallery: {
        screen: ImageGallery,
        navigationOptions: {
            header: null
        }
    },
    
},
    {
        initialRouteName: 'Scanner'
    }
);

export default createAppContainer(AppNavigator);