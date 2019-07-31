import React from 'react';
import { View, Text, SafeAreaView, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Images, Matrics } from '../Config';
import SocketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';

class AddNewChat extends React.Component {
    state = {
        userInfo: {},
        userList: [],
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
        AsyncStorage.getItem('userInfo').then(data => {
            this.setState({ userInfo: JSON.parse(data) })
            params = {
                "is_testdata": "1",
                "user_id": this.state.userInfo.id,
                "offset": "0"
            }
            // console.log(params);

            fetch("http://192.168.1.155/ChatDemoAPI/ChatApp.php?Service=SearchUsers", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "post",
                body: JSON.stringify(params)
            })

                .then(response => response.json())
                .then((responseJson) => {
                    // console.log("response", responseJson);
                    this.setState({ userList: responseJson.data.user_listing })
                    // console.log("Userlist", this.state.userList);
                })
                .catch(error => console.log(error))
        })
    }
    componentDidMount() {
        this.socket = SocketIOClient('http://192.168.1.155:3000');
    }
    gotoChatRoom(item) {
        console.log(item);
        // console.log(item.user_id);
        this.props.navigation.navigate('ChatRoom', { ReceiverId: item.user_id, following_status : item.following_status,ReceiverName: item.firstname + " " + item.lastname  })
    }
    renderChat= (item) =>  {
        console.log("Item",item);  
        return (
            <TouchableOpacity onPress={() => this.gotoChatRoom(item.item && item.item)} style={{ height: 70, width: '100%', flexDirection: 'row' }}>
                <View style={{ flex: 0.18, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 40, width: 40, borderRadius: 25 }} source={Images.ChatUser1} />
                </View>
                <View style={{ flex: 0.70, justifyContent: 'center' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: Colors.WHITE }}>{item.item ? item.item.firstname : ''} {item.item ? item.item.lastname:''}</Text>
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
                        data={this.state.userList}
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
export default AddNewChat