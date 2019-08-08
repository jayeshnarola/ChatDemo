import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Modal, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { Colors, Images } from '../Config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import { updateProfile } from '../Redux/Actions'
import { connect } from 'react-redux';
import { PROFILE_IMAGEPATH } from '../Config/Constant';
import { RNCamera, FaceDetector } from 'react-native-camera';

class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: props.auth && props.auth.data && props.auth.data.data && props.auth.data.data.User,
            selectedTab: 1,
            latestImagePath: ''
        }
    }
    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {

    }
    takePicture = async function () {
        if (this.camera) {
            this.camera.takePictureAsync().then(data => {
                console.log('data: ', data);
                this.setState({ latestImagePath: data.uri })
            });
        }
    };


    render() {
        return (
            <SafeAreaView style={styles.mainView}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{ height: '100%', justifyContent: 'flex-end' }}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        onBarCodeRead={(barcode) => {
                            console.log(barcode)
                            this.setState({ scanData: barcode.data })
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                    >
                        <View style={{ width: 360, height: 100, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ flex: 0.2 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ImageGallery', { imageURI: this.state.latestImagePath })}>
                                    <Image source={{ uri: this.state.latestImagePath }} style={{ height: 45, width: 45 }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={this.takePicture.bind(this)} style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 2, padding: 10, borderRadius: 50 }}>
                                <Image source={Images.Camera1} style={{ height: 30, width: 30, tintColor: 'black' }} />
                            </TouchableOpacity>
                            <View style={{ flex: 0.2 }}>
                                {/* <Image source={{ uri: this.state.latestImagePath }} style={{ height: 35, width: 35 }} /> */}
                            </View>
                        </View>
                    </RNCamera>
                </View>

            </SafeAreaView>
        )
    }
}
const styles = {
    mainView: {
        flex: 1, backgroundColor: Colors.BLACK
    },
    tabStyle: {
        borderBottomWidth: 2, flex: 0.5, justifyContent: 'center', alignItems: 'center', width: 150, height: 50
    },
    tabTextStyle: {
        fontSize: 18
    },
    activeTabStyle: {
        borderBottomColor: Colors.WHITE
    }
}

const mapStateToProps = (res) => {
    return {
        auth: res.Auth
    };
}
export default connect(mapStateToProps, { updateProfile })(Camera);