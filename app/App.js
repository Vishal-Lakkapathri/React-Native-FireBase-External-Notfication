/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard
} from 'react-native';

import FCM from "react-native-fcm";

import PushController from "./PushController";
import firebaseClient from  "./FirebaseClient";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      tokenCopyFeedback: "",
    }
  }

  onClick(token){
    firebaseClient.sendNotification(token,"custom message")
  }

  componentDidMount(){
    FCM.getInitialNotification().then(notif => {
      this.setState({
        initNotif: notif
      })
    });
  }

  onMessage = (message) => {
    console.log("token->",this.state.token);
    console.log("message->",message);
    firebaseClient.sendNotification(this.state.token,message)
  }

  render() {
    let { token,message, tokenCopyFeedback } = this.state;
    return (
      <View style={styles.container}>
        <PushController
          onChangeToken={token => this.setState({token: token || ""})} onMessage={this.onMessage}
        />

        <Text>
          Init notif: {JSON.stringify(this.state.initNotif)}
        </Text>

        <Text style={styles.feedback}>
          {this.state.tokenCopyFeedback}
        </Text>

        <TouchableOpacity onPress={this.onClick.bind(this, token)} style={styles.button}>
          <Text style={styles.buttonText}>Send Notification</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 2,
  },
  feedback: {
    textAlign: 'center',
    color: '#996633',
    marginBottom: 3,
  },
  button: {
    backgroundColor: "teal",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 15,
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    backgroundColor: "transparent"
  },
});
