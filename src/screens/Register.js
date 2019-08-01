import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Images, Matrics } from '../Config';
var FloatingLabel = require('react-native-floating-labels');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { registrationRequest } from '../Redux/Actions'
import { connect } from 'react-redux';


class Register extends Component {
    state = {
        fname: '',
        lname: '',
        email: '',
        password: ''
    }
    registerUser() {
        this.props.registrationRequest({
            "first_name": this.state.fname,
            "last_name": this.state.lname,
            "email_id": this.state.email,
            "password": this.state.password,
            "device_type": "1",
            "is_testdata": "1"
        })
        // fetch("http://192.168.1.155/ChatDemoAPI/ChatApp.php?Service=Register", {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     method: "post",
        //     body: JSON.stringify(params)
        // })
        //     .then(response => response.json())
        //     .then((responseJson) => {
        //         console.log("response", responseJson);
        //         if (responseJson.status == '1') {
        //             this.props.navigation.navigate('Login')
        //         }

        //     })
        //     .catch(error => console.log(error))
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps, "Registration Response")
        if (nextProps.auth.getUserRegistrationSuccess) {
            if (nextProps.auth.data.status == 1) {
                this.props.navigation.navigate('Login')
            }
            else {
                alert(nextProps.auth.data.message)
            }
        }
    }
    render() {
        return (

            <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: Colors.MATEBLACK }}>
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} enableOnAndroid={true} enableAutomaticScroll={(Platform.OS === 'ios')} >
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: 80, width: 80, borderRadius: 40, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: 60, width: 60 }} resizeMode={'contain'} source={Images.AppLogo} />
                        </View>
                        <View style={{ height: 40, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontSize: 25, color: Colors.WHITE, fontWeight: 'bold' }}>Sign Up</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.55, backgroundColor: Colors.MATEBLACK, }}>
                        <View style={{ height: '100%', width: '93%', borderRadius: 25, alignSelf: 'center', backgroundColor: Colors.WHITE, shadowRadius: 15, shadowOffset: { width: 0, height: 0, }, shadowColor: Colors.BLACK, shadowOpacity: 1.0, }}>
                            <View style={{ width: '90%', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: Colors.SIMPLEGRAY, alignSelf: 'center' }}>

                                <View style={{ width: '90%' }}>
                                    <FloatingLabel
                                        labelStyle={{ color: Colors.LABELSTYLE, fontSize: 15 }}
                                        inputStyle={{ borderWidth: 0 }}
                                        style={{
                                            marginTop: 5,
                                        }}
                                        onChangeText={(text) => this.setState({ fname: text })}
                                        value={this.state.fname}
                                        onBlur={this.onBlur}
                                    >Your First Name
                                </FloatingLabel>
                                </View>

                                <View style={{ width: '10%', alignSelf: 'flex-end', }}>
                                    <Image style={{ height: 20, width: 20, tintColor: Colors.GRAY, marginBottom: Matrics.ScaleValue(10) }} source={Images.User} />
                                </View>
                            </View>
                            <View style={{ width: '90%', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: Colors.SIMPLEGRAY, alignSelf: 'center' }}>

                                <View style={{ width: '90%' }}>
                                    <FloatingLabel
                                        labelStyle={{ color: Colors.LABELSTYLE, fontSize: 15 }}
                                        inputStyle={{ borderWidth: 0 }}
                                        style={{
                                            marginTop: 5,
                                        }}
                                        onChangeText={(text) => this.setState({ lname: text })}
                                        value={this.state.lname}
                                        onBlur={this.onBlur}
                                    >Your Last Name
                                    </FloatingLabel>
                                </View>

                                <View style={{ width: '10%', alignSelf: 'flex-end', }}>
                                    <Image style={{ height: 20, width: 20, tintColor: Colors.GRAY, marginBottom: Matrics.ScaleValue(10) }} source={Images.User} />
                                </View>
                            </View>
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
                                        password={true}
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

                                <View style={{ width: '10%', alignSelf: 'flex-end', }}>
                                    <Image style={{ height: 20, width: 20, tintColor: Colors.GRAY, marginBottom: Matrics.ScaleValue(10) }} source={Images.Eye} />
                                </View>
                            </View>
                            <View style={{ height: 80, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.registerUser()} style={{ height: 45, width: 320, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 22.5, backgroundColor: Colors.MATEBLACK }}>
                                    <Text style={{ color: Colors.WHITE, fontWeight: '500' }}>Sign Up</Text>
                                    <Image style={{ height: 10, width: 20, marginLeft: 10, tintColor: Colors.WHITE }} source={Images.RightArrow} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.15, flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
                        <View style={{ height: 15 }}>
                            <Text style={{ color: Colors.WHITE }}>Already have an account? </Text>
                        </View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }} style={{ borderBottomColor: Colors.WHITE, borderBottomWidth: 1 }}>
                            <Text style={{ color: Colors.WHITE, fontWeight: '500' }}>login</Text>
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
        auth: res.Auth
    };
}
export default connect(mapStateToProps, { registrationRequest })(Register);