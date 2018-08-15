
export function timeToString(timestamp) {
  const date = new Date(timestamp)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

  return todayUTC.toDateString().split('Mon')[1]
}

export function getDeckMetaInfo(deck) {
  const info = {
    React: {
      title: 'React',
      timeStamp: 1534284894237,
      recentScore: 35,
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      timeStamp: 1534284869329,
      recentScore: 100,
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical enviornment with in which that function was declared.'
        }
      ]
    },
    Blahhah: {
      title: 'Blahhah',
      timeStamp: 1534284869331,
      recentScore: 67,
      questions: [
        {
          question: 'Wha',
          answer: 'The'
        }
      ]
    }
  }

  return typeof deck === 'undefined'
    ? info
    : info[deck]
}

export function getProfileMetaInfo(profile) {
  const info = {
    Profile: {
      name: '',
      avatarURL: '',
    }
  }
}