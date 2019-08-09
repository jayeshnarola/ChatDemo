import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Slider } from 'react-native';
import { RNCamera } from 'react-native-camera';
import firebase from 'react-native-firebase';
import { Colors, Images } from '../Config';
import Voice from 'react-native-voice';
import Questions from './questions.json'
import Tts from 'react-native-tts';
export default class VoiceRecognize extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRecording: false,
            language: 'hi'
        };
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechRecognized = this.onSpeechRecognized;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
        console.log(Questions, "Questions")
        Tts.setDefaultLanguage(this.state.language);

    }
    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }
    onSpeechStart = e => {
        // eslint-disable-next-line
        console.log('onSpeechStart: ', e);
        this.setState({
            started: '√',
        });
    };

    onSpeechRecognized = e => {
        // eslint-disable-next-line
        console.log('onSpeechRecognized: ', e);
        this.setState({
            recognized: '√',
        });
    };

    onSpeechEnd = e => {
        // eslint-disable-next-line
        console.log('onSpeechEnd: ', e);
        this.setState({
            end: '√',
        });
    };

    onSpeechError = e => {
        // eslint-disable-next-line
        console.log('onSpeechError: ', e);
        this.setState({
            error: JSON.stringify(e.error),
        });
    };

    onSpeechResults = e => {
        // eslint-disable-next-line
        console.log('onSpeechResults: ', e);
        this.setState({
            results: e.value,
        });

        let arr = Questions.QA.filter(data => {
            console.log(data.q, e.value)
            return data.q.match(e.value[0]) || e.value[0].match(data.q)
        })
        console.log(arr)
        if (arr.length > 0) {
            setTimeout(() => {
                this.setState({
                    ansResult: arr
                })
                if (this.state.ansResult != undefined && this.state.ansResult != [] && this.state.ansResult.length > 0) {
                    Tts.speak(this.state.ansResult[0].a);
                }
            }, 1000);
        }
        else {
            if (this.state.language == 'hi') {

                setTimeout(() => {
                    this.setState({
                        ansResult: [{
                            "q": "कैसे हो?",
                            "a": "कोई परिणाम नहीं मिला"
                        }]
                    })
                    if (this.state.ansResult != undefined && this.state.ansResult != [] && this.state.ansResult.length > 0) {
                        Tts.speak(this.state.ansResult[0].a);
                    }
                }, 1000);
            }
            else {
                setTimeout(() => {
                    this.setState({
                        ansResult: [{
                            "q": "कैसे हो?",
                            "a": "No Result Found"
                        }]
                    })
                    if (this.state.ansResult != undefined && this.state.ansResult != [] && this.state.ansResult.length > 0) {
                        Tts.speak(this.state.ansResult[0].a);
                    }
                }, 1000);
            }
        }
    };

    onSpeechPartialResults = e => {
        // eslint-disable-next-line
        console.log('onSpeechPartialResults: ', e);
        this.setState({
            partialResults: e.value,
        });
    };

    onSpeechVolumeChanged = e => {
        // eslint-disable-next-line
        console.log('onSpeechVolumeChanged: ', e);
        this.setState({
            pitch: e.value,
        });
    };

    async onPlay() {
        this.setState({ isRecording: !this.state.isRecording })
        try {
            await Voice.start(this.state.language);
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    }
    async onStop() {
        this.setState({ isRecording: !this.state.isRecording })

        try {
            await Voice.stop();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    }
    render() {
        console.log(this.state.results, this.state.ansResult, "result")
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {this.state.results != undefined && this.state.results != [] &&
                        <Text style={{ fontSize: 20, color: 'white' }}>{this.state.results[0]}</Text>
                    }
                    {this.state.ansResult != undefined && this.state.ansResult != [] && this.state.ansResult.length > 0 &&
                        <Text><Text style={{ fontSize: 20, color: 'white' }}>Siro : </Text> <Text style={{ fontSize: 20, color: 'grey' }}>{this.state.ansResult[0].a}</Text></Text>
                    }
                </View>
                <View style={{ height: 65, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 0.4, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.setState({ language: 'hi' })} style={[{ padding: 10, margin: 5, borderColor: 'white', borderWidth: 2 }, this.state.language == 'hi' ? { backgroundColor: 'white' } : {}]}><Text style={[{ color: 'white' }, this.state.language == 'hi' ? { color: 'black' } : {}]}>हिंदी</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ language: 'en' })} style={[{ padding: 10, margin: 5, borderColor: 'white', borderWidth: 2 }, this.state.language == 'en' ? { backgroundColor: 'white' } : {}]}><Text style={[{ color: 'white' }, this.state.language == 'en' ? { color: 'black' } : {}]}>ENGLISH</Text></TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.isRecording ?
                            <TouchableOpacity onPress={() => this.onStop()} style={{ backgroundColor: 'red', borderColor: 'white', borderWidth: 3, borderRadius: 30, height: 50, width: 50 }}>

                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.onPlay()} style={{ backgroundColor: 'black', borderColor: 'white', borderWidth: 3, borderRadius: 30, padding: 10 }}>
                                <Image source={Images.Mic} style={{ height: 25, width: 25, tintColor: 'white' }}></Image>
                            </TouchableOpacity>
                        }
                    </View>
                    <TouchableOpacity onPress={() => {
                        Voice.destroy()
                        this.setState({ results: '', ansResult: '' })
                    }} style={{ flex: 0.2, padding: 10, margin: 5, borderColor: 'white', borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>RESET</Text>

                    </TouchableOpacity>




                </View>
            </View>
        )
    }
}
