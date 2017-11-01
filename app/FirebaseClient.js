import FirebaseConstants from "./FirebaseConstants";
import { Platform, Alert } from "react-native";

const API_URL = "https://fcm.googleapis.com/fcm/send";

class FirebaseClient {

  constructor() {
    this.sendNotification = this.sendNotification.bind(this);
  }

  sendNotification(token,message) {
    let body;

    if(Platform.OS === 'android'){
      body = {
        "to": token,
      	"data":{
					"custom_notification": {
						"title": "Notification",
						"body": message,
						"sound": "default",
						"priority": "high",
						"show_in_foreground": true
        	}
    		},
    		"priority": 10
      }
    } else {
			body = {
				"to": token,
				"notification":{
					"title": "Simple FCM Client",
					"body": "This is a notification with only NOTIFICATION.",
					"sound": "default"
				},
				"priority": 10
			}
		}
    this._send(JSON.stringify(body), "notification");
  }

  async _send(body, type) {
		if(FirebaseClient.KEY === 'YOUR_API_KEY'){
			Alert.alert('Set your API_KEY in app/FirebaseConstants.js')
			return;
		}
  	let headers = new Headers({
  		"Content-Type": "application/json",
      "Authorization": "key=" + FirebaseConstants.KEY
  	});
		
		try {
			let response = await fetch(API_URL, { method: "POST", headers, body });
			console.log(response);
			console.log("msg1")
			try{
				response = await response.json();
				if(!response.success){
					Alert.alert('Failed to send notification, check error log')
				}
			} catch (err){
				Alert.alert('Failed to send notification, check error log')
			}
		} catch (err) {
			Alert.alert(err && err.message)
		}
  }

}

let firebaseClient = new FirebaseClient();
export default firebaseClient;
