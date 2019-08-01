import React from 'react';
import { View, Text, SafeAreaView, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Images, Matrics } from '../Config';
import SocketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import { getSearchUser } from '../Redux/Actions'
import { connect } from 'react-redux';

class AddNewChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: props.auth && props.auth.data && props.auth.data.data && props.auth.data.data.User,
            userList: props.Chat && props.Chat.searchUserList && props.Chat.searchUserList.data && props.Chat.searchUserList.data.user_listing,
        }
        console.log(props)
    }

    renderHeader() {
        return (
            <View style={{ height: 55, flexDirection: 'row', width: '100%', backgroundColor: Colors.MATEBLACK }}>
                <TouchableOpacity onPress={() => { this.props.navigation.pop() }} style={styles.backView}>
                    <Image style={styles.backImage} source={Images.LeftArrow} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.8 }}>
                    <Text style={{ color: Colors.WHITE, fontSize: 20 }}>Chat List</Text>
                </View>
            </View>
        )
    }
    componentWillMount() {
        this.getSearchUserAPI()
    }
    componentWillReceiveProps(nextProps) {
        this.searchUserListSuccess()

    }
    searchUserListSuccess() {
        if (this.props.Chat.getSearchUserSuccess) {
            if (this.props.Chat.data.status == 1) {
                if (this.props.Chat && this.props.Chat.searchUserList && this.props.Chat.searchUserList.data && this.props.Chat.searchUserList.data.user_listing) {
                    this.setState({ chatListUsers: this.props.Chat.searchUserList.data.user_listing })
                }
            }
            else {
                // alert(this.props.Chat.data.message)
            }
        }
    }
    componentDidMount() {
        this.socket = SocketIOClient('http://192.168.1.155:3000');
    }
    getSearchUserAPI() {
        this.props.getSearchUser({
            "is_testdata": "1",
            "user_id": this.state.userInfo.id,
            "offset": "0"
        })
    }
    gotoChatRoom(item) {
        let obj = {
            conversion_id: 0,
            following_status: item.following_status,
            other_user_first_name: item.firstname,
            other_user_id: item.user_id,
            other_user_last_name: item.lastname,
            other_user_profile_pic: item.profilepic,
            user_id: this.state.userInfo.user_id
        }
        this.props.navigation.navigate('ChatRoom', { otherUserDetails: obj })
    }
    renderChat = (item) => {
        return (
            <TouchableOpacity onPress={() => this.gotoChatRoom(item.item && item.item)} style={{ height: 70, width: '100%', flexDirection: 'row' }}>
                <View style={{ flex: 0.18, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 40, width: 40, borderRadius: 25 }} source={Images.ChatUser1} />
                </View>
                <View style={{ flex: 0.70, justifyContent: 'center' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: Colors.WHITE }}>{item.item ? item.item.firstname : ''} {item.item ? item.item.lastname : ''}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MATEBLACK }}>
                {this.renderHeader()}
                <ScrollView>
                    <FlatList
                        data={this.props.Chat && this.props.Chat.searchUserList && this.props.Chat.searchUserList.data && this.props.Chat.searchUserList.data.user_listing}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this.renderChat}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const styles = {
    backView: {
        flex: 0.1, justifyContent: 'center', alignItems: 'center'
    },
    backImage: {
        height: Matrics.ScaleValue(20), width: Matrics.ScaleValue(20), tintColor: Colors.WHITE
    },
}

const mapStateToProps = (res) => {
    console.log("Ressss", res);
    return {
        response: res.GetDataList,
        auth: res.Auth,
        Chat: res.Chat
    };
}
export default connect(mapStateToProps, { getSearchUser })(AddNewChat);