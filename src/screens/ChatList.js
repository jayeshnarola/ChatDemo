import React from 'react';
import { View, Text, FlatList, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Images } from '../Config';
import SocketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'
import { connect } from 'react-redux';
import { getConversionRequest } from '../Redux/Actions'
import { StackActions, NavigationActions } from 'react-navigation';

class ChatList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: props.auth && props.auth.data && props.auth.data.data && props.auth.data.data.User,
            chatListUsers: props.Chat && props.Chat.data && props.Chat.data.data,
        }
        this.socket = SocketIOClient('http://192.168.1.155:3000');
        this.socket.emit('JoinSocket', { id: this.state.userInfo.id });
        global.socket = this.socket
        this.socket.on("ReceiveMessage", data => {
            this.callGetConversation()
        });
    }

    componentWillMount() {

    }
    componentDidMount() {
        this.callGetConversation()
    }
    componentWillReceiveProps(nextProps) {
        this.getConversationSuccess()
    }
    getConversationSuccess() {
        if (this.props.Chat.getUserRegistrationSuccess) {
            if (this.props.Chat.data.status == 1) {
                if (this.props.Chat && this.props.Chat.data && this.props.Chat.data.data) {
                    console.log(this.props)
                    this.setState({ chatListUsers: this.props.Chat.data.data })
                }
            }
            else {
                // alert(this.props.Chat.data.message)
            }
        }
    }
    callGetConversation() {
        this.props.getConversionRequest({
            "device_token": "123456",
            "device_type": 1,
            "user_id": this.state.userInfo.id,
            "is_testdata": "1"
        })
    }
    onRefresh() {
        this.callGetConversation()

    }
    gotoChatRoom(item) {
        console.log(item, "item")
        this.props.navigation.navigate('ChatRoom', { onRefresh: () => this.onRefresh(), otherUserDetails: item.item })
    }
    renderHeader() {
        return (
            <View style={{ height: 55, flexDirection: 'row', width: '100%', backgroundColor: Colors.MATEBLACK }}>
                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Text style={{ color: Colors.WHITE }}>LogOut</Text> */}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.8 }}>
                    <Text style={{ color: Colors.WHITE, fontSize: 20 }}>Chat List</Text>
                </View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddNewChat') }} style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 20, width: 20, tintColor: Colors.WHITE }} source={Images.AddButton} />
                </TouchableOpacity>
            </View>
        )
    }
    renderChatList = (item) => {
        return (
            <TouchableOpacity onPress={() => this.gotoChatRoom(item)} style={{ height: 70, width: '100%', flexDirection: 'row' }}>
                <View style={{ flex: 0.18, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 40, width: 40, borderRadius: 25 }} source={Images.ChatUser1} />
                </View>
                <View style={{ flex: 0.65, justifyContent: 'center' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: Colors.WHITE }}>{item.item ? item.item.other_user_first_name : ''} {item.item ? item.item.other_user_last_name : ''}</Text>
                    </View>
                    <View>
                        <Text numberOfLines={1} style={{ color: Colors.WHITE, marginTop: 5, color: Colors.SIMPLEGRAY, fontSize: 13 }}>{item.item ? item.item.last_message : ''}</Text>
                    </View>
                </View>

                <View style={{ flex: 0.17, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={{ color: Colors.WHITE, color: Colors.SIMPLEGRAY, fontSize: 10 }}>{item.item ? moment.utc(item.item.created_date).fromNow() : ''}</Text>
                    </View>
                    {
                        item.item && item.item.un_read_counter > 0 &&
                        <View style={{ alignSelf: 'flex-end' }}>
                            <View style={{ height: 8, width: 8, borderRadius: 4, marginTop: 8, marginRight: 10, backgroundColor: Colors.ONLINEDOTCOLOR }}></View>
                        </View>
                    }
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
                        data={this.props.Chat && this.props.Chat.data && this.props.Chat.data.data}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this.renderChatList}
                    />
                </ScrollView>
                {/* <View style={{ height: 45, width: 45, alignSelf: 'flex-end', marginVertical: 10, marginHorizontal: 10, borderRadius: 22.5, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddNewChat') }} style={{ height: 45, width: 45, borderColor: Colors.WHITE, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 22.5, backgroundColor: Colors.WHITE }}>
                        <Image style={{ height: 22, width: 22, tintColor: Colors.BLACK }} source={Images.AddButton}></Image>
                    </TouchableOpacity>
                </View> */}
            </SafeAreaView>
        )
    }
}
const mapStateToProps = (res) => {
    console.log("Ressss", res);
    return {
        response: res.GetDataList,
        auth: res.Auth,
        Chat: res.Chat
    };
}
export default connect(mapStateToProps, { getConversionRequest })(ChatList);