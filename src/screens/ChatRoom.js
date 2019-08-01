import React, { Component } from 'react';
import { View, Text, FlatList, SafeAreaView, Platform, TextInput, Keyboard, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Images, Matrics } from '../Config';
import LinearGradient from 'react-native-linear-gradient';
import SocketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import { getLoginRequest, getConversionRequest, getMessageList, getUserRoleRequest } from '../Redux/Actions'
import { connect } from 'react-redux';

class ChatRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            padding: 0,
            message: '',
            userInfo: props.auth && props.auth.data && props.auth.data.data && props.auth.data.data.User,
            messageList: [],
            accStatus: '',
            otherUserDetails: props.navigation.state.params && props.navigation.state.params.otherUserDetails
        }
        this.socket = global.socket
        this.socket.on("ReceiveMessage", data => {
            this.callGetMessageList();
            this.props.getConversionRequest({
                "device_token": "123456",
                "device_type": 1,
                "user_id": this.state.userInfo.id,
                "is_testdata": "1"
            })
            this.readMessage()
            if (this.state.messageList) {
                setTimeout(() => {
                    this.scrollToEnd(true);
                }, 500);
            }
        });

    }
    readMessage() {
        if (this.props.navigation.state.params.otherUserDetails) {
            const readObject = { coversation_id: this.props.navigation.state.params.otherUserDetails && this.props.navigation.state.params.otherUserDetails.conversion_id, receiver_id: this.state.userInfo.id };
            this.socket.emit("ReadMessage", readObject);
            if (this.props.navigation.state.params.onRefresh) {
                setTimeout(() => {
                    this.props.navigation.state.params.onRefresh()
                }, 500);
            }
        }
        else {
            const readObject = { coversation_id: 0, receiver_id: this.state.userInfo.id };
            this.socket.emit("ReadMessage", readObject);
        }

    }
    componentWillMount() {
        console.log(this.props, "propsINChatRoom", this.state.otherUserDetails)
        const { other_user_id } = this.state.otherUserDetails
        this.setState({ messageList: this.props.chat && this.props.chat.messagesList && this.props.chat.messagesList[other_user_id] && this.props.chat.messagesList[other_user_id].chat_list.reverse() })
        this.readMessage()
        // this.getMessageList();
        this.callGetMessageList();
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps,"hey")
        const { other_user_id } = this.state.otherUserDetails

        this.setState({ messageList: nextProps.chat && nextProps.chat.messagesList && nextProps.chat.messagesList[other_user_id] && nextProps.chat.messagesList[other_user_id].chat_list.reverse() })
        
    }
    componentWillUnmount() {
        Keyboard.removeListener("keyboardDidShow", this._keyboardDidShow);
        // this.socket.removeListener("ReceiveMessage");
    }
    callGetMessageList() {
        this.props.getMessageList({
            "device_token": "123456",
            "device_type": 1,
            "user_id": this.state.userInfo.id,
            "other_user_id": this.state.otherUserDetails.other_user_id,
            "is_testdata": "0"
        })
    }
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidChangeFrame", this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
        this.props.getConversionRequest({
            "device_token": "123456",
            "device_type": 1,
            "user_id": this.state.userInfo.id,
            "is_testdata": "1"
        })
        if (this.state.messageList) {
            setTimeout(() => {
                this.scrollToEnd(true);
            }, 500);
        }
    }
    _keyboardDidShow = e => {
        var keyboardHeight = e.endCoordinates.height;
        this.setState({ padding: keyboardHeight });
        if (this.state.messageList) {
            setTimeout(() => {
                this.scrollToEnd(true);
            }, 500);
        }
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
                        <Text style={styles.nameText}>{this.state.otherUserDetails.other_user_first_name + " " + this.state.otherUserDetails.other_user_last_name}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.callView}>
                    <Image style={styles.callText} source={Images.PhoneCall} />
                </TouchableOpacity>
            </View>
        )
    }
    getMessageList() {
        // console.log(this.state.userInfo, "getMessage")
        // params = {
        //     "device_token": "123456",
        //     "device_type": 1,
        //     "user_id": this.state.userInfo.id,
        //     "other_user_id": this.state.otherUserDetails.other_user_id,
        //     "is_testdata": "0"
        // }
        // console.log(params)
        // fetch("http://192.168.1.155/ChatDemoAPI/ChatApp.php?Service=GetMessageList", {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     method: "post",
        //     body: JSON.stringify(params)
        // })
        //     .then(response => response.json())
        //     .then((responseJson) => {
        //         console.log("response", responseJson);
        //         if (responseJson.status == "1") {
        //             this.setState({ messageList: responseJson.chat_list.reverse() })
        //             setTimeout(() => {
        //                 this.scrollToEnd(true);
        //             }, 500);
        //         }

        //     })
        //     .catch(error => console.log(error))
    }
    sendMessage() {
        const dataObj = {
            conversion_id: 0,
            sender_id: this.state.userInfo.id,
            receiver_id: this.state.otherUserDetails.other_user_id,
            message: this.state.message,
            message_type: "TEXT",
            media_name: "",
            me: 1,
            is_testdata: 0
        };
        this.socket.emit("SendNewMessage", dataObj);
        // let arr = this.state.messageList ? this.state.messageList : []
        // arr.push(dataObj)
        // this.setState({ messageList: arr })
        this.props.getConversionRequest({
            "device_token": "123456",
            "device_type": 1,
            "user_id": this.state.userInfo.id,
            "is_testdata": "1"
        })
        if (this.state.messageList) {
            setTimeout(() => {
                this.scrollToEnd(true);
            }, 500);
        }
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
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={this.setRef}
                        data={this.state.messageList ? this.state.messageList : []}
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

const mapStateToProps = (res) => {
    console.log("ResssSAs", res);
    return {
        response: res.GetDataList,
        auth: res.Auth,
        chat: res.Chat
    };
}
export default connect(mapStateToProps, { getLoginRequest, getConversionRequest, getMessageList })(ChatRoom);