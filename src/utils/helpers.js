import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';
import Filter from 'bad-words';
import { getDecks, getProfile } from './api';

const filter = new Filter();

const NOTIFICATION_KEY = 'FlashCards:notifications';

export function profanityDetector(text) {
  return filter.clean(text);
}

export const getInitialData = () => Promise.all([
  getDecks(),
  getProfile(),
]).then(([decks, profile]) => ({
  decks,
  profile,
}));

export function timeToString(timestamp) {
  const date = new Date(timestamp);
  const todayUTC = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return todayUTC.toDateString().substring(4);
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function createNotification() {
  return {
    title: 'Time to study!',
    body: "👋 Don't forget to quiz yourself today!",
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

export const askPermissionsAsync = async () => {
  const result = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    .then(({ status }) => status);

  return result;
};
