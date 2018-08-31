import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';
import { getDecks, getProfile } from './api';

const NOTIFICATION_KEY = 'FlashCards:notifications';

export const getInitialData = () => Promise.all([
  getDecks(),
  getProfile(),
]).then(([decks, profile]) => ({
  decks,
  profile,
}));

export function timeToString(timestamp) {
  const date = new Date(timestamp);
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

  return todayUTC.toDateString().substring(4);
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function createNotification() {
  return {
    title: 'Time to study!',
    body: "👋 Don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sounds: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                },
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
}
