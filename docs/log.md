# 1 - Menu and Settings

## 1.1 - Menu

### 1.1.1 - Index and layout
- Created the index file for the home screen
- Contains a function to return the page layout, and a stylesheet
- Defined a stack-based navigational layout
- This means each new screen is placed on the top of the stack, making navigation intuitive
- Contains a simple function returning an empty stack layout

### 1.1.2 - Home screen styles
- Set up a number of style options such as header, background and font colour
- Each of these will later become a variable
- Also set the home screen title to be a capitalised 'Home'
- Created a style sheet for the home screen index file to set the font colour to white, and define the page layout as a flexbox (a vertical list centered in the middle of the page)

### 1.1.3 - Menu buttons
- Created a function which returns a console log when a touchable element is pressed
- Gave this button a 'Gameplay' label
- Used the router componenet from 'expo-router' to navigate to the gameplay section when the button is pressed
- Re labelled the button 'Play Poker'
- Gave the button styling to achieve the desired look

### 1.1.4 - Gameplay section
- Created the gameplay section folder and gave it a stack based layout
- Created the index file for the gameplay section, with some sample text and basic styling
- Changed the heading in the root '_layout.jsx' file to 'Play Poker'
- Removed an unwanted default secondary header

### 1.1.5 - Multiple menu buttons
- Created multiple menu buttons
- Created the folder for each section
- Renamed all headers
- Formatted the menu buttons

### 1.1.6 - Home screen formatting
- Added the logo image
- Formatted the home screen

## 1.2 - Settings

### 1.2.1 - Settings
- Created a settings button
- Imported the router to '_layout.jsx'

### 1.2.2 - Theme Context
- Created the Theme Context to share across all screens
- Wrapped the app in the theme provider
- Used the theme in each section
- Resolved an error using the theme in the root '_layout.jsx' file
- Fixed the colour/color spelling inconsistency

### 1.2.3 - 