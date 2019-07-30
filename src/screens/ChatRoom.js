import React, { Component } from 'react';
import { View, Text, SafeAreaView,Platform, TextInput, Keyboard, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Images, Matrics } from '../Config';
import LinearGradient from 'react-native-linear-gradient';
import SocketIOClient from 'socket.io-client';

export default class ChatRoom extends Component {

    state={
        padding:0,
        message:'',
        messages:[]
    }
    componentWillMount(){
    }
    componentDidMount(){
        console.log(this.props);
        this.socket = SocketIOClient('http://localhost:3000');
        // this.socket.emit('JoinSocket',this.props.navigation.state.params.id);
        
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
        this.keyboardDidShowListener = Keyboard.addListener("keyboardDidChangeFrame", this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
        setTimeout(() => {
            this.scrollToEnd(true);
        }, 10);
        let msg = [];
        this.socket.on('receive',data=>{
            console.log("data",data);
            if(data != ''){
                msg.push(data)
                this.setState({messages:msg});
                console.log("messages",this.state.messages);
            }
        })
        
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
                        <Text style={styles.nameText}>John Sinha</Text>
                    </View>
                    <View>
                        <Text style={styles.statusText}>Online now</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.callView}>
                    <Image style={styles.callText} source={Images.PhoneCall} />
                </TouchableOpacity>
            </View>
        )
    }
    renderMessages() {
        return (
            <View style={styles.pd12}>
                <View style={styles.rowDir}>
                    <View style={styles.userImageView}>
                        <Image style={styles.userImage} source={Images.ChatUser3} />
                    </View>
                    <LinearGradient colors={['#303030', '#393939', '#424242']} style={styles.gradientView}>
                        <View style={{ width: '85%' }}>
                            <Text style={styles.messageText}>Hello john, what are you going to do this weekend?</Text>
                            <Text style={styles.timeText}>17:45</Text>
                        </View>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient colors={['#2875be', '#1579d7', '#047cec']} style={styles.senderView}>
                        <View style={{ width: '95%' }}>
                            <Text style={styles.messageText}>Nothing planned, and you? </Text>
                            <Text style={styles.senderTimeText}>17:45</Text>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        )
    }
    sendMessage(){
        this.socket.emit('channel1', this.state.message);
        this.setState({message:''})
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BLACK,marginBottom: Platform.OS === "ios" ? Matrics.ScaleValue(this.state.padding) : 0 }}>
                {this.renderHeader()}
                <ScrollView ref={this.setRef}>
                    {this.renderMessages()}
                    {this.renderMessages()}
                    {this.renderMessages()}
                    {this.renderMessages()}
                    {this.renderMessages()}
                    {this.renderMessages()}
                    {this.renderMessages()}
                    {this.renderMessages()}
                    {this.renderMessages()}
                    {this.renderMessages()}
                    {this.renderMessages()}
                    {this.renderMessages()}
                    {this.renderMessages()}
                    {this.renderMessages()}
                </ScrollView>
                <View style={styles.input}>
                    <View style={styles.inputView}>
                    <TextInput
                        onChangeText={text => this.setState({ message: text })}
                        value={this.state.message}
                        style={{color:Colors.SIMPLEGRAY}}
                        placeholder={'Type your message'}
                        autoCorrect={false}
                        placeholderTextColor={Colors.SIMPLEGRAY}
                        underlineColorAndroid='transparent'>
                    </TextInput>
                    </View>
                    <View style={styles.sendButtonView}>
                        <TouchableOpacity style={styles.sendTouchView} onPress={()=>this.sendMessage()}>
                        <Image style={styles.sendImage} source={Images.SendButton} />
                        </TouchableOpacity>
                    </View>
                </View>
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
        alignSelf:'center',
        flexDirection:'row',
        paddingLeft:Matrics.ScaleValue(15),
        borderRadius:Matrics.ScaleValue(22.5),
        height: Matrics.ScaleValue(45),
        // color: '#ffffff'
    },
    image: {
        width: Matrics.ScaleValue(40),
        height: Matrics.ScaleValue(40)
    },
    mainHeaderView:{
        height: Matrics.ScaleValue(60), backgroundColor: Colors.CHATROOMHEADER, flexDirection: 'row'
    },
    backView:{
        flex: 0.1, justifyContent: 'center', alignItems: 'center'
    },
    backImage:{
        height: Matrics.ScaleValue(20), width: Matrics.ScaleValue(20), tintColor: Colors.WHITE
    },
    middleView:{
        flex: 0.8, justifyContent: 'center', alignItems: 'center'
    },
    nameText:{
        fontSize: Matrics.ScaleValue(15), fontWeight: 'bold', color: Colors.WHITE
    },
    statusText:{
        color: Colors.SIMPLEGRAY, fontSize: Matrics.ScaleValue(11)
    },
    callView:{
        flex: 0.1, justifyContent: 'center', alignItems: 'center'
    },
    callText:{
        height: Matrics.ScaleValue(20), width: Matrics.ScaleValue(20), tintColor: Colors.ONLINEDOTCOLOR 
    },
    pd12:{
        padding: Matrics.ScaleValue(12) 
    },
    rowDir:{
        flexDirection:'row'
    },
    userImageView:{
        flex: 0.1, justifyContent: 'flex-end', alignItems: 'center'
    },
    userImage:{
        height: Matrics.ScaleValue(30), width: Matrics.ScaleValue(30), borderRadius: Matrics.ScaleValue(25)
    },
    gradientView:{
        flex: 0.9, borderTopLeftRadius: Matrics.ScaleValue(15), borderTopRightRadius: Matrics.ScaleValue(15), borderBottomRightRadius: Matrics.ScaleValue(15), marginLeft: Matrics.ScaleValue(15)
    },
    messageText:{
        paddingLeft: Matrics.ScaleValue(15), paddingTop: Matrics.ScaleValue(10), color: Colors.WHITE
    },
    timeText:{
        paddingLeft: Matrics.ScaleValue(15), paddingVertical: Matrics.ScaleValue(10), fontSize: Matrics.ScaleValue(11), color: Colors.SIMPLEGRAY
    },
    senderView:{
        marginTop: Matrics.ScaleValue(15), width: '70%', borderTopLeftRadius: Matrics.ScaleValue(15), borderBottomLeftRadius: Matrics.ScaleValue(15), alignSelf: 'flex-end', borderTopRightRadius: Matrics.ScaleValue(15)
    },
    senderTimeText:{
        paddingLeft: Matrics.ScaleValue(15), paddingVertical: Matrics.ScaleValue(10), fontSize: Matrics.ScaleValue(11), color: Colors.WHITE, textAlign: 'right'
    },
    inputView:{
        flex:0.8,justifyContent:'center'
    },
    sendButtonView:{
        flex:0.2,alignItems:'flex-end',justifyContent:'center'
    },
    sendTouchView:{
        height:Matrics.ScaleValue(35),width:Matrics.ScaleValue(35),justifyContent:'center',alignItems:'center', marginRight:Matrics.ScaleValue(8), backgroundColor:Colors.ONLINEDOTCOLOR,borderRadius:Matrics.ScaleValue(50),
    },
    sendImage:{
        height: Matrics.ScaleValue(18), width: Matrics.ScaleValue(18), tintColor: Colors.WHITE
    }
}

