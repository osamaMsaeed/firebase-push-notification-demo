import messaging from '@react-native-firebase/messaging';
import {LocalNotification} from './notificationUtil';

export class FirebaseNotificationHelper {
  static initiated = false;

  static async requestUserPermission() {
    const enabled = await messaging()?.hasPermission();

    if (enabled === messaging.AuthorizationStatus.AUTHORIZED) {
      return;
    }
    try {
      await messaging()?.requestPermission();
    } catch (e) {}
  }

  static async getFCMToken() {
    try {
      const FCMToken = await messaging().getToken();
      return Promise.resolve(FCMToken);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async deleteFCMToken() {
    try {
      await messaging().deleteToken();
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async createListener() {
    this.initiated = true;
    messaging().onMessage(this.onMessageReceived);
  }

  static async onMessageReceived(message) {
    LocalNotification.displayNotification(message);
  }
}
