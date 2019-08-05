import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Colors, Images, Matrics } from '../Config';
var FloatingLabel = require('react-native-floating-labels');
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { getLoginRequest, getUserRoleRequest } from '../Redux/Actions'
import { connect } from 'react-redux';

class SplashScreen extends Component {
    state = {
        email: '',
        password: ''
    }
    componentWillMount() {
        console.log(this.props)
        if (this.props.auth.getUserLoginSuccess) {
            if (this.props.auth.data.status == 1) {
                setTimeout(() => {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'ChatList' })],
                    });
                    this.props.navigation.dispatch(resetAction);
                }, 2000);
            }
            else {
                // alert(nextProps.auth.data.message)
            }
        }
        else {
            this.props.navigation.navigate('Login')
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.auth.getUserLoginSuccess) {
            if (nextProps.auth.data.status == 1) {
                setTimeout(() => {
                    this.props.navigation.navigate('ChatList')
                }, 2000);
            }
            else {
                alert(nextProps.auth.data.message)
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center' }}>
                {/* <View style={{ height: 150, width: 150, borderRadius: 75, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center' }}> */}
                    <Image style={{ height: 340, width: 340 }} resizeMode={'contain'} source={Images.AppLogo} />
                {/* </View> */}
                <View style={{ height: 50, marginTop: 20 }}>
                    <Text style={{ color: Colors.WHITE, fontSize: 35, fontWeight: '600' }}>Narola Infotech</Text>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (res) => {
    console.log("Ressss", res);
    return {
        response: res.GetDataList,
        auth: res.Auth
    };
}
export default connect(mapStateToProps, { getLoginRequest, getUserRoleRequest })(SplashScreen);