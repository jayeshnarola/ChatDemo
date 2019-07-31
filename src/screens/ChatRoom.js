import React, { Component } from 'react';
import { View, Text, FlatList, SafeAreaView, Platform, TextInput, Keyboard, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Images, Matrics } from '../Config';
import LinearGradient from 'react-native-linear-gradient';
import SocketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';

export default class ChatRoom extends Component {

    state = {
        padding: 0,
        message: '',
        userInfo: {},
        messageList: [],
        accStatus: '',
        following_status: this.props.navigation.state.params.following_status,
        receiverName: this.props.navigation.state.params.ReceiverName
    }
    constructor(props) {
        super(props)
        this.socket = global.socket
        this.socket.on("ReceiveMessage", data => {
            console.log(data, "socket response")
            let arr = this.state.messageList;
            arr['me'] = 1
            this.getMessageList()
            this.readMessage()
            this.props.navigation.state.params.onRefresh()
        });

    }
    readMessage() {
        const readObject = { coversation_id: this.props.navigation.state.params.otherUserDetails.conversion_id, receiver_id: global.userInfo.id };
        this.socket.emit("ReadMessage", readObject);
        setTimeout(() => {
            this.props.navigation.state.params.onRefresh()
        }, 500);

    }
    componentWillMount() {
        this.readMessage()
        AsyncStorage.getItem('userInfo').then(data => {
            console.log(data, this.props)
            this.setState({ userInfo: JSON.parse(data) })
            this.getMessageList();

        })

    }
    componentDidMount() {

        // this.socket.on('ReceiveMessage',data=>{
        //     console.log("Socket",data);
        //     msgList.push(data)
        //     this.setState({messageList:msgList})
        // })


        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidChangeFrame", this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
        setTimeout(() => {
            this.scrollToEnd(true);
        }, 500);
    }
    _keyboardDidShow = e => {
        var keyboardHeight = e.endCoordinates.height;
        this.setState({ padding: keyboardHeight });
        setTimeout(() => {
            this.scrollToEnd(true);
        }, 500);
    };
    _keyboardDidHide = e => {
        this.setState({ padding: 0 });
    };
    setRef = c => {
        this.listRef = c;
    };

    scrollToEnd = animated => {
        this.listRef && this.listRef.scrollToEnd({ animated });
    };
    renderHeader() {
        return (
            <View style={styles.mainHeaderView}>
                <TouchableOpacity onPress={() => { this.props.navigation.pop() }} style={styles.backView}>
                    <Image style={styles.backImage} source={Images.LeftArrow} />
                </TouchableOpacity>
                <View style={styles.middleView}>
                    <View>
                        <Text style={styles.nameText}>{this.state.receiverName}</Text>
                    </View>
                    <View>
                        {/* <Text style={styles.statusText}>Online now</Text> */}
                    </View>
                </View>
                <TouchableOpacity style={styles.callView}>
                    <Image style={styles.callText} source={Images.PhoneCall} />
                </TouchableOpacity>
            </View>
        )
    }
    getMessageList() {
        params = {
            "device_token": "123456",
            "device_type": 1,
            "user_id": this.state.userInfo.id,
            "other_user_id": this.props.navigation.state.params.ReceiverId,
            "is_testdata": "0"
        }
        console.log(params)
        fetch("http://192.168.1.155/ChatDemoAPI/ChatApp.php?Service=GetMessageList", {
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
                    this.setState({ messageList: responseJson.chat_list.reverse() })
                    setTimeout(() => {
                        this.scrollToEnd(true);
                    }, 500);
                }

            })
            .catch(error => console.log(error))
    }
    sendMessage() {
        // this.socket.emit('channel1', this.state.message);
        const dataObj = {
            conversion_id: 0,
            sender_id: this.state.userInfo.id,
            receiver_id: this.props.navigation.state.params.ReceiverId,
            message: this.state.message,
            message_type: "TEXT",
            media_name: "",
            me: 1,
            is_testdata: 0
        };
        console.log(dataObj);

        this.socket.emit("SendNewMessage", dataObj);
        let arr = this.state.messageList
        arr.push(dataObj)
        setTimeout(() => {
            this.scrollToEnd(true);
        }, 500);
        this.setState({ message: '' })
    }
    followUser() {
        params = {
            "self_user_id": this.state.userInfo.id,
            "other_user_id": this.props.navigation.state.params.ReceiverId,
            "device_type": 1,
            "is_testdata": "1"
        }
        // console.log("params", params);

        fetch("http://192.168.1.155/ChatDemoAPI/ChatApp.php?Service=FollowUnfollowUser", {
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
                    if (responseJson.data.user_account == 'PRIVATE') {

                        this.setState({ accStatus: responseJson.data.user_account })
                    }
                    else {
                        this.setState({ following_status: 1 })
                    }
                }

            })
            .catch(error => console.log(error))
    }
    renderMessages = (item) => {
        return (
            <View style={styles.pd12}>
                {
                    item.item && item.item.me == 0 ?
                        <View style={styles.rowDir}>
                            <View style={styles.userImageView}>
                                <Image style={styles.userImage} source={Images.ChatUser3} />
                            </View>
                            <LinearGradient colors={['#303030', '#393939', '#424242']} style={styles.gradientView}>
                                <View style={{ width: '85%' }}>
                                    <Text style={styles.messageText}>{item.item ? item.item.message : ''}</Text>
                                    <Text style={styles.timeText}>17:45</Text>
                                </View>
                            </LinearGradient>
                        </View>
                        :
                        <View>
                            <LinearGradient colors={['#2875be', '#1579d7', '#047cec']} style={styles.senderView}>
                                <View style={{ width: '95%' }}>
                                    <Text style={styles.messageText}>{item.item ? item.item.message : ''}</Text>
                                    <Text style={styles.senderTimeText}>17:45</Text>
                                </View>
                            </LinearGradient>
                        </View>
                }
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BLACK, marginBottom: Platform.OS === "ios" ? Matrics.ScaleValue(this.state.padding) : 0 }}>
                {this.renderHeader()}
                {/* {
                    this.state.following_status == 1 ? */}
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={this.setRef}
                        data={this.state.messageList}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this.renderMessages}
                    />
                    <View style={styles.input}>
                        <View style={styles.inputView}>
                            <TextInput
                                onChangeText={text => this.setState({ message: text })}
                                value={this.state.message}
                                style={{ color: Colors.SIMPLEGRAY }}
                                placeholder={'Type your message'}
                                autoCorrect={false}
                                placeholderTextColor={Colors.SIMPLEGRAY}
                                underlineColorAndroid='transparent'>
                            </TextInput>
                        </View>
                        <View style={styles.sendButtonView}>
                            <TouchableOpacity style={styles.sendTouchView} onPress={() => this.sendMessage()}>
                                <Image style={styles.sendImage} source={Images.SendButton} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* <View style={{ flex: 1, backgroundColor: Colors.BLACK, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ height: 200, width: '80%', borderRadius: 15, alignItems: 'center', backgroundColor: Colors.WHITE, justifyContent: 'flex-end', alignSelf: 'center' }}>
                                {
                                    this.state.following_status == 0 &&
                                    <TouchableOpacity onPress={() => this.followUser()} style={{ height: 45, borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: '70%', marginBottom: 15, backgroundColor: Colors.MATEBLACK }}>
                                        <Text style={{ color: Colors.WHITE }}>Follow</Text>
                                    </TouchableOpacity>
                                }
                                {
                                    this.state.following_status == 3 &&
                                    <TouchableOpacity disabled={true} style={{ height: 45, borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: '70%', marginBottom: 15, backgroundColor: Colors.MATEBLACK }}>
                                        <Text style={{ color: Colors.WHITE }}>REQUESTED</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View> */}


            </SafeAreaView>
        )
    }
}
const styles = {
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        paddingLeft: Matrics.ScaleValue(25)
    },
    input: {
        backgroundColor: '#2b2b2b',
        width: '93%',
        // justifyContent:'center',
        alignSelf: 'center',
        flexDirection: 'row',
        paddingLeft: Matrics.ScaleValue(15),
        borderRadius: Matrics.ScaleValue(22.5),
        height: Matrics.ScaleValue(45),
        // color: '#ffffff'
    },
    image: {
        width: Matrics.ScaleValue(40),
        height: Matrics.ScaleValue(40)
    },
    mainHeaderView: {
        height: Matrics.ScaleValue(60), backgroundColor: Colors.CHATROOMHEADER, flexDirection: 'row'
    },
    backView: {
        flex: 0.1, justifyContent: 'center', alignItems: 'center'
    },
    backImage: {
        height: Matrics.ScaleValue(20), width: Matrics.ScaleValue(20), tintColor: Colors.WHITE
    },
    middleView: {
        flex: 0.8, justifyContent: 'center', alignItems: 'center'
    },
    nameText: {
        fontSize: Matrics.ScaleValue(15), fontWeight: 'bold', color: Colors.WHITE
    },
    statusText: {
        color: Colors.SIMPLEGRAY, fontSize: Matrics.ScaleValue(11)
    },
    callView: {
        flex: 0.1, justifyContent: 'center', alignItems: 'center'
    },
    callText: {
        height: Matrics.ScaleValue(20), width: Matrics.ScaleValue(20), tintColor: Colors.ONLINEDOTCOLOR
    },
    pd12: {
        padding: Matrics.ScaleValue(12)
    },
    rowDir: {
        flexDirection: 'row'
    },
    userImageView: {
        flex: 0.1, justifyContent: 'flex-end', alignItems: 'center'
    },
    userImage: {
        height: Matrics.ScaleValue(30), width: Matrics.ScaleValue(30), borderRadius: Matrics.ScaleValue(25)
    },
    gradientView: {
        flex: 0.9, borderTopLeftRadius: Matrics.ScaleValue(15), borderTopRightRadius: Matrics.ScaleValue(15), borderBottomRightRadius: Matrics.ScaleValue(15), marginLeft: Matrics.ScaleValue(15)
    },
    messageText: {
        paddingLeft: Matrics.ScaleValue(15), paddingTop: Matrics.ScaleValue(10), color: Colors.WHITE
    },
    timeText: {
        paddingLeft: Matrics.ScaleValue(15), paddingVertical: Matrics.ScaleValue(10), fontSize: Matrics.ScaleValue(11), color: Colors.SIMPLEGRAY
    },
    senderView: {
        marginTop: Matrics.ScaleValue(15), width: '70%', borderTopLeftRadius: Matrics.ScaleValue(15), borderBottomLeftRadius: Matrics.ScaleValue(15), alignSelf: 'flex-end', borderTopRightRadius: Matrics.ScaleValue(15)
    },
    senderTimeText: {
        paddingLeft: Matrics.ScaleValue(15), paddingVertical: Matrics.ScaleValue(10), fontSize: Matrics.ScaleValue(11), color: Colors.WHITE, textAlign: 'right'
    },
    inputView: {
        flex: 0.8, justifyContent: 'center'
    },
    sendButtonView: {
        flex: 0.2, alignItems: 'flex-end', justifyContent: 'center'
    },
    sendTouchView: {
        height: Matrics.ScaleValue(35), width: Matrics.ScaleValue(35), justifyContent: 'center', alignItems: 'center', marginRight: Matrics.ScaleValue(8), backgroundColor: Colors.ONLINEDOTCOLOR, borderRadius: Matrics.ScaleValue(50),
    },
    sendImage: {
        height: Matrics.ScaleValue(18), width: Matrics.ScaleValue(18), tintColor: Colors.WHITE
    }
}

