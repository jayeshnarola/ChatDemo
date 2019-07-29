import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Colors, Images, Matrics } from '../Config';
var FloatingLabel = require('react-native-floating-labels');

class Register extends Component {
    state = {
        name:'',
        email: '',
        password: ''
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.MATEBLACK }}>
                <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ height: 80, width: 80, borderRadius: 40, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 60, width: 60 }} resizeMode={'contain'} source={Images.AppLogo} />
                    </View>
                    <View style={{ height: 40, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, color: Colors.WHITE, fontWeight: 'bold' }}>Sign Up</Text>
                    </View>
                </View>
                <View style={{ flex: 0.45, backgroundColor: Colors.MATEBLACK, }}>
                    <View style={{ height: '100%', width: '93%', borderRadius: 25, alignSelf: 'center', backgroundColor: Colors.WHITE, shadowRadius: 15, shadowOffset: { width: 0, height: 0, }, shadowColor: Colors.BLACK, shadowOpacity: 1.0, }}>
                    <View style={{ width: '90%', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', alignSelf: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <FloatingLabel
                                    labelStyle={{ color: '#aaa', fontSize: 15 }}
                                    inputStyle={{ borderWidth: 0 }}
                                    style={{
                                        marginTop: 5,
                                    }}
                                    value={this.state.name}
                                    onBlur={this.onBlur}
                                >Your Name
                        </FloatingLabel>
                            </View>
                            <View style={{ width: '10%', alignSelf: 'flex-end', }}>
                                <Image style={{ height: 20, width: 20,tintColor:'gray', marginBottom: Matrics.ScaleValue(10) }} source={Images.User} />
                            </View>
                        </View>
                        <View style={{ width: '90%', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', alignSelf: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <FloatingLabel
                                    labelStyle={{ color: '#aaa', fontSize: 15 }}
                                    inputStyle={{ borderWidth: 0 }}
                                    style={{
                                        marginTop: 5,
                                    }}
                                    value={this.state.email}
                                    onBlur={this.onBlur}
                                >Your Email
                        </FloatingLabel>
                            </View>
                            <View style={{ width: '10%', alignSelf: 'flex-end', }}>
                                <Image style={{ height: 20, width: 20, marginBottom: Matrics.ScaleValue(10) }} source={Images.Email} />
                            </View>
                        </View>

                        <View style={{ width: '90%', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', alignSelf: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <FloatingLabel
                                    labelStyle={{ color: '#aaa', fontSize: 15 }}
                                    password={true}
                                    inputStyle={{ borderWidth: 0 }}
                                    style={{
                                        marginTop: 5,
                                    }}
                                    value={this.state.password}
                                    onBlur={this.onBlur}
                                >Enter Password
                        </FloatingLabel>
                            </View>
                            <View style={{ width: '10%', alignSelf: 'flex-end', }}>
                                <Image style={{ height: 20, width: 20, tintColor: 'gray', marginBottom: Matrics.ScaleValue(10) }} source={Images.Eye} />
                            </View>
                        </View>

                        <View style={{ height: 80, justifyContent:'flex-end',alignItems:'center' }}>
                            <TouchableOpacity style={{height:45,width:320,flexDirection:'row', justifyContent:'center',alignItems:'center', borderRadius:22.5, backgroundColor:Colors.MATEBLACK}}>
                                    <Text style={{color:Colors.WHITE,fontWeight:'500'}}>Sign Up</Text>
                                    <Image style={{height:10,width:20,marginLeft:10, tintColor:Colors.WHITE}} source={Images.RightArrow} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flex:0.15,flexDirection:'row', justifyContent:"center",alignItems:'center'}}>
                    <View style={{height:15}}>
                            <Text style={{color:Colors.WHITE}}>Already have an account? </Text>
                    </View>
                    <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Login') }} style={{borderBottomColor:Colors.WHITE,borderBottomWidth:1}}>
                        <Text style={{color:Colors.WHITE,fontWeight:'500'}}>login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Register