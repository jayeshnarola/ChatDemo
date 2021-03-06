import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { Colors, Images, Matrics } from '../Config';
var FloatingLabel = require('react-native-floating-labels');
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { getLoginRequest, getUserRoleRequest } from '../Redux/Actions'
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class Login extends Component {
    state = {
        email: '',
        showPassword:false,
        password: ''
    }
    componentWillMount() {
        AsyncStorage.getItem('userInfo').then(data => {
            // if (data != null || data != undefined) {
            //     global.userInfo = JSON.parse(data)
            //     const resetAction = StackActions.reset({
            //         index: 0,
            //         actions: [NavigationActions.navigate({ routeName: 'ChatList' })],
            //     });
            //     this.props.navigation.dispatch(resetAction);
            // }
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.getUserLoginSuccess) {
            if (nextProps.auth.data.status == 1) {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'ChatList' })],
                });
                this.props.navigation.dispatch(resetAction);
            }
            else {
                alert(nextProps.auth.data.message)
            }
        }
    }
    onLogin() {
        this.props.getLoginRequest({
            "user_name_email": this.state.email,
            "password": this.state.password,
            "device_token": "1234567890",
            "device_type": "1",
            "is_testdata": "1"
        })
    }
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: Colors.MATEBLACK }}  keyboardShouldPersistTaps={'handled'}>
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} enableOnAndroid={true} enableAutomaticScroll={(Platform.OS === 'ios')} keyboardShouldPersistTaps={'handled'}>
                    <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: 120, width: 120, borderRadius: 60, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: 110, width: 110 }} resizeMode={'contain'} source={Images.AppLogo} />
                        </View>
                        <View style={{ height: 40, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, color: Colors.WHITE, fontWeight: 'bold' }}>Login</Text>
                        </View>
                    </View>
                    <View style={{ height: 230, backgroundColor: Colors.MATEBLACK, }}>
                        <View style={{ height: '100%', width: '93%', borderRadius: 25, alignSelf: 'center', backgroundColor: Colors.WHITE, shadowRadius: 15, shadowOffset: { width: 0, height: 0, }, shadowColor: Colors.BLACK, shadowOpacity: 1.0, }}>
                            <View style={{ width: '90%', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: Colors.SIMPLEGRAY, alignSelf: 'center' }}>
                                <View style={{ width: '90%' }}>
                                    <FloatingLabel
                                        labelStyle={{ color: Colors.LABELSTYLE, fontSize: 15 }}
                                        inputStyle={{ borderWidth: 0 }}
                                        style={{
                                            marginTop: 5,
                                        }}
                                        onChangeText={(text) => this.setState({ email: text })}
                                        value={this.state.email}
                                        onBlur={this.onBlur}
                                    >Your Email
                           </FloatingLabel>
                                </View>
                                <View style={{ width: '10%', alignSelf: 'flex-end', }}>
                                    <Image style={{ height: 20, width: 20, marginBottom: Matrics.ScaleValue(10) }} source={Images.Email} />
                                </View>
                            </View>

                            <View style={{ width: '90%', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: Colors.SIMPLEGRAY, alignSelf: 'center' }}>
                                <View style={{ width: '90%' }}>
                                    <FloatingLabel
                                        labelStyle={{ color: Colors.LABELSTYLE, fontSize: 15 }}
                                        password={!this.state.showPassword}
                                        inputStyle={{ borderWidth: 0 }}
                                        style={{
                                            marginTop: 5,
                                        }}
                                        onChangeText={(text) => this.setState({ password: text })}
                                        value={this.state.password}
                                        onBlur={this.onBlur}
                                    >Enter Password
                   </FloatingLabel>
                                </View>
                                <TouchableOpacity onPress={() => this.setState({ showPassword: !this.state.showPassword })} style={{ width: '10%', alignSelf: 'flex-end', }}>
                                    <Image style={{ height: 20, width: 20, tintColor: Colors.GRAY, marginBottom: Matrics.ScaleValue(10) }} source={Images.Eye} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 80, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.onLogin()} style={{ height: 45, width: 320, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 22.5, backgroundColor: Colors.MATEBLACK }}>
                                    <Text style={{ color: Colors.WHITE, fontWeight: '500' }}>Login</Text>
                                    <Image style={{ height: 10, width: 20, marginLeft: 10, tintColor: Colors.WHITE }} source={Images.RightArrow} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 100, flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                        <View style={{ height: 15 }}>
                            <Text style={{ color: Colors.WHITE }}>Dont have an account? </Text>
                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }} style={{ borderBottomColor: Colors.WHITE, borderBottomWidth: 1 }}>
                            <Text style={{ color: Colors.WHITE, fontWeight: '500' }}>sign up</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>

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
export default connect(mapStateToProps, { getLoginRequest, getUserRoleRequest })(Login);