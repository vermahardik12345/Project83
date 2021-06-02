import * as React from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,TextInput,Image,KeyboardAvoidingView,SafeAreaP} from 'react-native';
import db from '../config';
import firebase from 'firebase';

import { SafeAreaProvider} from 'react-native-safe-area-context';

export default class Request extends React.Component{

    constructor(){
        super();
        this.state={
            userId: firebase.auth().currentUser.email,
            itemName:"",
            reasonToRequest:"",
        }
    }
    createUniqueId=()=>{
        return Math.random().toString(36).substring(7);
    }

    addRequest=(itemName,reasonToRequest)=>{
        var userId=this.state.userId
        var randomRequestId=this.createUniqueId()
        db.collection('requesteditems').add({
            "user_id":userId,
            "item_name":itemName,
            "reason_To_Request":reasonToRequest,
            "request_id":randomRequestId,
        })
        
        this.setState({
            bookName:"",
            reasonToRequest:""
        })
        
        return alert("Item requested Successfully ")
        }
    render(){
        return(
            <View style={{flex:1}}>
                <SafeAreaProvider>
           
               <KeyboardAvoidingView >
                <TextInput
                style={styles.formTextInput}
                placeholder="enter item Name"
                onChangeText={(text)=>this.setState({bookName:text})}  
                value={this.state.bookName}
                />

                <TextInput
                style={[styles.formTextInput,{height:100}]}
                multiline
                numberOfLines={8}
                placeholder="why do you need the item"
                onChangeText={(text)=>this.setState({reasonToRequest:text})}  
                value={this.state.reasonToRequest}
                />

                 <TouchableOpacity
                 style={styles.button}
                 onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}
                 
                 >
                <Text>Request</Text> 
                     
                </TouchableOpacity>                 

               </KeyboardAvoidingView>
             
</SafeAreaProvider>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:"center",
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:90,
      padding:10,
    },
    button:{
        width:'75%',
        height:50,
       marginLeft:40,
       marginTop:70,
        alignItems:"center",
        borderRadius:10,
        backgroundColor:'#ff5722',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:8
        },
        shadowOpacity:0.44,
        shadowRadius:10.32,
        elevation:16,
        marginTop:20
    },
})