import { AsyncStorage } from 'react-native'
import { getDeckMetaInfo, timeToString } from './helpers'

export const STORAGE_KEY = 'FlashCards:decks'

function setDummyData () {
  const { React, JavaScript } = getDeckMetaInfo()

  let dummyData = {}
  const timestamp = Date.now()
  dummyData = {
    React,
    JavaScript,
  }

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

export function formatDeckResults () {
  return setDummyData()
}