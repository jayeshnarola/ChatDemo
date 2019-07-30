import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Images } from '../Config';
import SocketIOClient from 'socket.io-client';

class ChatList extends React.Component {


    renderHeader() {
        return (
            <View style={{ height: 55, width: '100%', backgroundColor: Colors.MATEBLACK, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.WHITE, fontSize: 20 }}>Chat List</Text>
            </View>
        )
    }
    componentDidMount(){
        this.socket = SocketIOClient('http://localhost:3000');

    }
    gotoChatRoom(id){
        this.socket.emit('JoinSocket',{id:id});
        this.props.navigation.navigate('ChatRoom',{id:id})
    }
    renderChat(name,uid, userImg, msg, time) {
        return (
            <TouchableOpacity onPress={()=> this.gotoChatRoom(uid)} style={{ height: 70, width: '100%', flexDirection: 'row' }}>
                <View style={{ flex: 0.18, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 40, width: 40, borderRadius: 25 }} source={userImg} />
                </View>
                <View style={{ flex: 0.70, justifyContent: 'center' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: Colors.WHITE }}>{name}</Text>
                    </View>
                    <View>
                        <Text style={{ color: Colors.WHITE, marginTop: 5, color: Colors.SIMPLEGRAY, fontSize: 13 }}>{msg}</Text>
                    </View>
                </View>
                {
                    time == 'now' &&
                    <View style={{ flex: 0.12, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Text style={{ color: Colors.WHITE,color:Colors.SIMPLEGRAY }}>now</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <View style={{ height: 8, width: 8, borderRadius: 4, marginTop: 8, marginRight: 10, backgroundColor: Colors.ONLINEDOTCOLOR }}></View>
                        </View>
                    </View>
                }
                {
                    time != 'now' &&
                    <View style={{ flex: 0.12, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Text style={{ color: Colors.WHITE, fontSize: 12, marginBottom: 15, marginRight: 8, color: Colors.SIMPLEGRAY }}>{time}</Text>
                        </View>
                        {/* <View style={{ alignSelf: 'flex-end' }}>
                            <View style={{ height: 10, width: 10, borderRadius: 5, marginTop: 5, marginRight: 10, backgroundColor: '#0499ff' }}></View>
                        </View> */}
                    </View>
                }
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MATEBLACK }}>
                {this.renderHeader()}
                <ScrollView>
                    {this.renderChat('John Sinha',1, Images.ChatUser1, 'hello john how are you?', '10:25')}
                    {this.renderChat('Ramesh Patel',2, Images.ChatUser2, 'Are you busy?', 'now')}
                    {this.renderChat('Nitesh Gujar',3, Images.ChatUser3, 'Hey man, how are you?', '16:10')}
                    {this.renderChat('Praful Argiddi',4, Images.ChatUser4, 'are you there praful?', 'now')}
                    {this.renderChat('Nitin Patel',5, Images.ChatUser5, 'Hello brother...', '15:22')}
                    {this.renderChat('Rahul Patil',6, Images.ChatUser6, 'Hey rahul patil saheba', '12:25')}
                    {this.renderChat('Jayesh Patil',7, Images.ChatUser7, 'today whats your plan for movie', '1:25')}
                    {this.renderChat('Radhika Patel',8, Images.ChatUser8, 'Hello dear', '5:25')}
                </ScrollView>
            </SafeAreaView>
        )
    }
}
export default ChatList