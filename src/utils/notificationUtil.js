import notifee from '@notifee/react-native';

export class LocalNotification {
  static channelId = null;

  static async getChannelId() {
    if (!this.channelId) {
      try {
        this.channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
        return this.channelId;
      } catch (err) {
        console.log('err: channel id', err);
      }
    } else {
      return this.channelId;
    }
  }

  static displayNotification = async message => {
    const {notification} = message;
    try {
      await notifee.displayNotification({
        title: notification?.title,
        body: notification?.body,
        android: {
          channelId: await this.getChannelId(),
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (err) {
      console.log('err: display notification', err);
    }
  };
}
