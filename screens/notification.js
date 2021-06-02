import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,FlatList } from "react-native";
import firebase from 'firebase';
import db from '../config';
import { Icon, ListItem } from "react-native-elements";

export default class Notification extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
        this.notificationRef=null
    }
    getNotification=()=>{
        this.requestRef=db.collection('all_notification')
        .where('notifaction_status','==',"unread")
        .where("recieverID","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications=[];
            snapshot.docs.map((doc)=>{
                var notification=doc.data();
                notification["doc_id"]=doc.id;
                allNotifications.push(notification)
            
            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }
    componentDidMount(){
        this.getNotification();

    }
   
    keyExtractor=(item,index) => index.toString()

    renderItem=({item,index})=>{
        return(
            <ListItem
            key={index}
            leftElement={<Icon name ="book" type="font-awesome"  color="#696969" />}
            title={item.book_name}
            titleStyle={{color:"black", fontWeight:"bold"}}
            subtitle={item.message}
            bottomDivider
            />
        )
    }
    render(){
        return(
            <View>
             <View style={{flex:0.1}}>
              <View style={{flex:0.9}}>
              {
                  this.state.allNotifications.length===0?(
                      <Text>No Notifications</Text>
                  )
                  :(
                      <FlatList
                      keyExtractor={this.keyExtractor}
                      data={this.state.allNotifications}
                      renderItem={this.renderItem}
                      />
                  )
              }
              </View>

             </View>
            </View>
        )
    }
}