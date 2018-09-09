# Flash Cards Project

App built using React, React Native and Redux similar to “Quizlet”. A User will be able to study using custom flash cards they have created. The app includes a quiz feature to test the users knowledge and a profile section where they can create a username, profile photo and a cover photo. in the profile section the user will see all of their latest scores for a each deck quizzed. There is a settings tab where you can choose to edit all your profile information as well as to delete your profile entirely.

At the home of this app there is list of all decks created by the user. Any changes the user makes will save to their phones AsyncStorage. upon clicking a deck on the homepage will navigate the user to that specific deck where they can choose to either add a new card, take a quiz or delete the deck entirely.

Please note: In the quiz section to flip the card over all you do is tap anywhere on the card itself.

There is a `data.js` file that represents a fake database which contains two decks for review purposes. Once ready to publish this app will not have any cards initialy.

Both IOS and Andriod devices have been tested for this application.

## install and Launch

To view app in development mode use the expo app.

* To install this projects you can download or clone this repository. once finished run `npm install --save` to install and save all dependencies.
* To launch the project run `npm start` or `yarn start` in your terminal.

## testing

* tests were created using jest and enzyme. to start all tests run `npm test` or `yarn test` in your terminal.