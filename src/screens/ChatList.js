import React from 'react';
import { View, Text, FlatList, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Images } from '../Config';
import SocketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'

class ChatList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: global.userInfo,
            chatListUsers: [],
        }
        this.socket = SocketIOClient('http://192.168.1.155:3000');
        this.socket.emit('JoinSocket', { id: global.userInfo.id });
        global.socket = this.socket
        this.socket.on("ReceiveMessage", data => {
            this.getConversionList()
        });
    }

    renderHeader() {
        return (
            <View style={{ height: 55, flexDirection: 'row', width: '100%', backgroundColor: Colors.MATEBLACK }}>
                <View style={{ flex: 0.1 }}>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.8 }}>
                    <Text style={{ color: Colors.WHITE, fontSize: 20 }}>Chat List</Text>
                </View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddNewChat') }} style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 20, width: 20, tintColor: Colors.WHITE }} source={Images.AddButton} />
                </TouchableOpacity>
            </View>
        )
    }

    componentWillMount() {
        // AsyncStorage.clear()

    }
    componentDidMount() {
        // this.socket = SocketIOClient('http://192.168.1.155:3000');
        // AsyncStorage.getItem('userInfo').then(data => {

        //     this.setState({ userInfo: JSON.parse(data) })

        //     this.socket.emit('JoinSocket', { id: this.state.userInfo.id });

        this.getConversionList();

        // })
    }
    getConversionList() {
        params = {
            "device_token": "123456",
            "device_type": 1,
            "user_id": this.state.userInfo.id,
            "is_testdata": "1"
        }
        fetch("http://192.168.1.155/ChatDemoAPI/ChatApp.php?Service=GetConversationList", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then((responseJson) => {
                console.log("response", responseJson);
                if (responseJson.status == "1") {
                    this.setState({ chatListUsers: responseJson.data })
                }

            })
            .catch(error => console.log(error))
    }
    onRefresh() {
        this.getConversionList()
    }
    gotoChatRoom(item) {
        console.log(item, "item")
        this.props.navigation.navigate('ChatRoom', { ReceiverId: item.item.other_user_id, onRefresh: () => this.onRefresh(), otherUserDetails: item.item, ReceiverName: item.item.other_user_first_name + " " + item.item.other_user_last_name, following_status: item.item.following_status })
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
                        <Text style={{ color: Colors.WHITE, marginTop: 5, color: Colors.SIMPLEGRAY, fontSize: 13 }}>{item.item ? item.item.last_message : ''}</Text>
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
                        data={this.state.chatListUsers}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this.renderChatList}
                    />
                </ScrollView>

            </SafeAreaView>
        )
    }
}
export default ChatList