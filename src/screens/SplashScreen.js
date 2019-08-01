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
            <View style={{ flex: 1, backgroundColor: Colors.MATEBLACK }}>

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