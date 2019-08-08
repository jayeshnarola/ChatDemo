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

class ImageGallery extends React.Component {
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

    render() {
        return (
            <SafeAreaView style={styles.mainView}>
                <Image style={{ height: '50%', width: '100%' }} source={{ uri: this.props.navigation.state.params.imageURI }} />
            </SafeAreaView>
        )
    }
}
const styles = {
    mainView: {
        flex: 1, backgroundColor: Colors.BLACK,
        justifyContent:'center',alignItems:'center'
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
export default connect(mapStateToProps, { updateProfile })(ImageGallery);