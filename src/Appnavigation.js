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

const TabNavigator = createBottomTabNavigator({
    ChatList: ChatList,
    Profile: Profile,
},

    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'ChatList') {
                    return <Image style={{ height: 20, width: 20, tintColor }} source={Images.Chat} />
                } else if (routeName === 'Profile') {
                    return <Image style={{ height: 20, width: 20, tintColor }} source={Images.Profile} />
                }
            },
            tabBarOnPress: (scene, jumpToIndex) => {
                navigation.navigate(scene.navigation.state.key, { change: true });
            }
        }),
        tabBarOptions: {
            activeTintColor: 'gray',
            inactiveTintColor: 'white',
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
    Profile: {
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
},
    {
        initialRouteName: 'SplashScreen'
    }
);

export default createAppContainer(AppNavigator);