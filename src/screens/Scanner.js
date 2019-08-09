import React from 'react';
import { View, Text, ImageEditor, SafeAreaView, Image, ScrollView, Modal, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { Colors, Images } from '../Config';
import { updateProfile } from '../Redux/Actions'
import { connect } from 'react-redux';
import { RNCamera, FaceDetector } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import FaceDetection from './FaceDetector';
import Camera from './Camera';
import TextDetection from './TextDetection';
import VoiceRecognize from './VoiceRecognize';

class Scanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: props.auth && props.auth.data && props.auth.data.data && props.auth.data.data.User,
            selectedTab: 4
        }
    }
    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {

    }
    renderTab() {
        return (
            <View style={{ backgroundColor: Colors.MATEBLACK, flexDirection: 'row', alignItems: 'center', height: 55 }}>
                <ScrollView showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }} horizontal={true}>
                    <TouchableOpacity onPress={() => this.setState({ selectedTab: 4 })} style={[styles.tabStyle, this.state.selectedTab == 4 ? styles.activeTabStyle : { borderBottomColor: Colors.MATEBLACK }]}>
                        <Text style={[styles.tabTextStyle, this.state.selectedTab == 4 ? { color: Colors.WHITE } : { color: Colors.GRAY }]}>Voice Recognize</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ selectedTab: 0 })} style={[styles.tabStyle, this.state.selectedTab == 0 ? styles.activeTabStyle : { borderBottomColor: Colors.MATEBLACK }]}>
                        <Text style={[styles.tabTextStyle, this.state.selectedTab == 0 ? { color: Colors.WHITE } : { color: Colors.GRAY }]}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ selectedTab: 1 })} style={[styles.tabStyle, this.state.selectedTab == 1 ? styles.activeTabStyle : { borderBottomColor: Colors.MATEBLACK }]}>
                        <Text style={[styles.tabTextStyle, this.state.selectedTab == 1 ? { color: Colors.WHITE } : { color: Colors.GRAY }]}>Barcode Scanner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ selectedTab: 2 })} style={[styles.tabStyle, this.state.selectedTab == 2 ? styles.activeTabStyle : { borderBottomColor: Colors.MATEBLACK }]}>
                        <Text style={[styles.tabTextStyle, this.state.selectedTab == 2 ? { color: Colors.WHITE } : { color: Colors.GRAY }]}>Face Detection</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ selectedTab: 3 })} style={[styles.tabStyle, this.state.selectedTab == 3 ? styles.activeTabStyle : { borderBottomColor: Colors.MATEBLACK }]}>
                        <Text style={[styles.tabTextStyle, this.state.selectedTab == 3 ? { color: Colors.WHITE } : { color: Colors.GRAY }]}>Text Recognize</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.mainView}>
                {this.renderTab()}
                {this.state.selectedTab == 0 && <Camera navigation={this.props.navigation} />}
                {this.state.selectedTab == 1 &&
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <RNCamera
                            style={{ height: '80%' }}
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
                            <BarcodeMask width={250} height={250} edgeBorderWidth={1} />
                            <View style={{ width: 360 }}>
                            </View>
                        </RNCamera>
                        <View style={{ height: '20%', borderTopColor: Colors.WHITE, flex: 1, justifyContent: 'center', alignItems: 'center', borderTopWidth: 2, width: '100%' }}>
                            <Text style={{ color: Colors.WHITE, fontSize: 20 }}>{this.state.scanData}</Text>
                        </View>
                    </View>
                }
                {this.state.selectedTab == 2 && <FaceDetection navigation={this.props.navigation} />}
                {this.state.selectedTab == 3 && <TextDetection navigation={this.props.navigation} />}
                {this.state.selectedTab == 4 && <VoiceRecognize navigation={this.props.navigation} />}
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
export default connect(mapStateToProps, { updateProfile })(Scanner);