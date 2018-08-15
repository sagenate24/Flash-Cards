import { AsyncStorage } from 'react-native'
import { getDeckMetaInfo, timeToString } from './helpers'

export const STORAGE_KEY = 'FlashCards:decks'
export const PROFILE_KEY = 'FlashCards:profile'

function setDummyData() {
  const { React, JavaScript, Blahhah } = getDeckMetaInfo()

  let dummyData = {}
  dummyData = {
    React,
    JavaScript,
    Blahhah,
  }

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

export function formatDeckResults() {
  return setDummyData()
}

export function formatNewDeck(deckTitle) {
  const timestamp = Date.now();

  return JSON.stringify({
    [deckTitle]: {
      title: deckTitle,
      timestamp: timestamp,
      questions: [],
    },
  })
}

function setDummyProfile() {
  const dummyProfile = {}

  AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(dummyProfile))

  return dummyProfile
}

export function formatProfileResults(results) {
  return results === null
    ? setDummyProfile()
    : JSON.parse(results);
}

export function formatNewProfileImage(image) {

  return JSON.stringify({
    userProfile: {
      avatar: image,
    }
  })
}