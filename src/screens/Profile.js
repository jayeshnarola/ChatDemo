import React from 'react';
import { View, Text, SafeAreaView, Image, Modal, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { Colors, Images } from '../Config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { updateProfile } from '../Redux/Actions'
import { connect } from 'react-redux';
import { PROFILE_IMAGEPATH } from '../Config/Constant';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameEditModal: false,
            userInfo: props.auth && props.auth.data && props.auth.data.data && props.auth.data.data.User,
            imageName: '',
            profileImage: '',
            lastName:'',
            firstName:'',
            base64String:'',
            email:'',
            userId:''
        }  
    }
    componentWillMount() {
        let userData = this.state.userInfo
        this.setState({ firstName: userData.firstname, lastName: userData.lastname,profileImage: PROFILE_IMAGEPATH +  userData.profilepic, email: userData.email, userId: userData.id })

    }
    async componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.auth && nextProps.auth.data && nextProps.auth.data.data && nextProps.auth.data.data.User){
            let userData = nextProps.auth.data.data.User
            this.setState({ firstName: userData.firstname, lastName: userData.lastname,profileImage: PROFILE_IMAGEPATH +  userData.profilepic, email: userData.email, userId: userData.id, nameEditModal:false })
        }
    }
    doLogout() {
        AsyncStorage.removeItem('persist:root');
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
        this.props.navigation.dispatch(resetAction);
    }
    openCamera() {
        ImagePicker.showImagePicker((response) => {
            // console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({ base64String:response.data });
                this.updateProfile();
            }
        });
    }
    updateProfile(){
        this.props.updateProfile({
        "user_id":this.state.userId,
        "first_name": this.state.firstName,
        "last_name": this.state.lastName,
        "email_id": this.state.email,
        "is_testdata": "1",
        "profile_image": this.state.base64String
        })
    }
    renderHeader() {
        return (
            <View style={{ height: 55, width: '100%', backgroundColor: Colors.MATEBLACK, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.WHITE, fontSize: 20 }}>Profile</Text>
            </View>
        )
    }
    cancel(){
        let userData =this.props.auth && this.props.auth.data && this.props.auth.data.data && this.props.auth.data.data.User
        this.setState({ firstName: userData.firstname, lastName: userData.lastname,nameEditModal:false })
    }
    renderNameEditModal() {
        return (
            <Modal visible={this.state.nameEditModal} transparent={true} animationType="fade" onRequestClose={() => this.setState({ nameEditModal: false })} >
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor: Colors.TRANSPARENT, justifyContent: 'flex-end' }}>
                        <View style={{ height: 240, backgroundColor: Colors.WHITE, borderTopStartRadius: 8, borderTopRightRadius: 8, }}>
                            <View style={{ height: 20, marginTop: 20 }}>
                                <Text style={{ paddingLeft: 20 }}>Enter your first name</Text>
                            </View>
                            <View contentContainerStyle={{ height: 40, width: '90%', alignSelf: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 40, width: '90%', alignSelf: 'center', borderBottomColor: Colors.GRAY, borderBottomWidth: 1 }}
                                    onChangeText={(text) => this.setState({ firstName: text })}
                                    autoFocus={true}
                                    value={this.state.firstName}
                                />
                            </View>
                            <View style={{ height: 20, marginTop: 20 }}>
                                <Text style={{ paddingLeft: 20 }}>Enter your last name</Text>
                            </View>
                            <View contentContainerStyle={{ height: 40, width: '90%', alignSelf: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 40, width: '90%', alignSelf: 'center', borderBottomColor: Colors.GRAY, borderBottomWidth: 1 }}
                                    onChangeText={(text) => this.setState({ lastName: text })}
                                    autoFocus={true}
                                    value={this.state.lastName}
                                />
                            </View>
                            <View style={{ height: 45, width: '90%', alignSelf: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.cancel()} style={{ height: 30, width: 80, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: Colors.MATEBLACK }}>CANCEL</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.updateProfile()} style={{ height: 30, width: 80, justifyContent: 'center', alignItems: 'center', marginLeft: 15 }}>
                                    <Text style={{ color: Colors.MATEBLACK }}>SAVE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Modal>
        )
    }
    render() {

        return (
            <SafeAreaView style={styles.mainView}>
                {this.renderHeader()}
                <View style={styles.userImageView}>
                    <ImageBackground style={styles.imgaeBgView} imageStyle={{ borderRadius: 75, borderWidth: 3, borderColor: Colors.WHITE, }} source={this.state.profileImage ? {uri:this.state.profileImage} : Images.ChatUser2} >
                        <TouchableOpacity onPress={() => this.openCamera()} style={styles.cameraView}>
                            <Image style={styles.cameraImage} resizeMode={'contain'} source={Images.Camera}></Image>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={styles.nameView}>
                    <View style={styles.nameView1}>
                        <View style={styles.nameView2}>
                            <Text style={styles.nameText}>{this.state.firstName + ' ' + this.state.lastName}</Text>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.setState({ nameEditModal: true })} style={styles.pencilView}>
                                <Image style={styles.pencilImage} resizeMode={'contain'} source={Images.PencilButton} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.logoutView}>
                    <TouchableOpacity onPress={() => this.doLogout()} style={styles.logoutView1}>
                        <Text style={{ color: Colors.WHITE }}>Logout</Text>
                    </TouchableOpacity>
                </View>
                {this.renderNameEditModal()}
            </SafeAreaView>
        )
    }
}
const styles = {
    mainView: {
        flex: 1, backgroundColor: Colors.BLACK
    },
    userImageView: {
        height: 200, justifyContent: 'center', alignItems: 'center'
    },
    imgaeBgView: {
        height: 125, width: 125, shadowColor: Colors.WHITE, shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.44, shadowRadius: 15, elevation: 16, justifyContent: 'flex-end', alignItems: 'flex-end'
    },
    cameraView: {
        justifyContent: 'center', alignItems: 'center', height: 45, width: 45, borderRadius: 22.5, backgroundColor: Colors.MATEBLACK
    },
    cameraImage: {
        height: 20, width: 30, tintColor: Colors.WHITE
    },
    nameView: {
        height: 30, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },
    nameView1: {
        flex: 1,
        alignItems: 'center', justifyContent: 'center',
        flexDirection: 'row',
    },
    nameView2: {
        justifyContent: 'center', alignItems: 'flex-end'
    },
    nameText: {
        fontSize: 22, color: Colors.WHITE
    },
    pencilView: {
        // height: 25, 
        width: 30,
        // backgroundColor: 'red',
        justifyContent: 'center', alignItems: 'center'
    },
    pencilImage: {
        height: 20, width: 20, tintColor: Colors.WHITE
    },
    logoutView: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    logoutView1: {
        height: 45, width: 150, backgroundColor: Colors.MATEBLACK, alignSelf: 'center', borderColor: Colors.WHITE, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center'
    }
}

const mapStateToProps = (res) => {
    
    console.log("ResssSAs", res);
    return {
        auth: res.Auth,
        // updatedData : res.Chat.updateProfile
    };
}
export default connect(mapStateToProps, { updateProfile })(Profile);