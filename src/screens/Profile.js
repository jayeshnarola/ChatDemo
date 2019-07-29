import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Colors } from '../Config';

class Profile extends React.Component{


    renderHeader(){
        return(
            <View style={{height:55,width:'100%',backgroundColor:Colors.MATEBLACK,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:Colors.WHITE,fontSize:20}}>Profile</Text>
            </View>
        )
    }
    render(){
        return(
        <SafeAreaView style={{flex:1}}>
            {this.renderHeader()}
        </SafeAreaView>
        )
    }
}
export default Profile