import { StyleSheet, Text, View,TouchableOpacity, TextInput ,Alert,Image,ScrollView} from 'react-native';
import React ,{Component} from 'react';
import {Header,Icon,Badge} from 'react-native-elements'

 const MyHeader= props =>{
    return(
        <Header
        centerComponent={{text:props.title , style:{color:"#A9A5A9",fontSize:20,fontWeight:"bold",} }}
        backgroundColor="#eaf8fe"
        />
    )
}
export default MyHeader;