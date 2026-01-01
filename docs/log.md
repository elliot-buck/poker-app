# 1 - Menu and Settings

## 1.1 - Menu

### 1.1.1 - Index and layout

- Create the index file for the home screen
- Contains a function to return the page layout, and a stylesheet
- Defined a stack-based navigational layout
- This means each new screen is placed on the top of the stack, making navigation intuitive
- Contains a simple function returning an empty stack layout

### 1.1.2 - Home screen styles

- Set up a number of style options such as header, background and font colour
- Each of these will later become a variable
- Also set the home screen title to be a capitalised 'Home'
- Create a style sheet for the home screen index file to set the font colour to white, and define the page layout as a flexbox (a vertical list centered in the middle of the page)

### 1.1.3 - Menu buttons

- Create a function which returns a console log when a touchable element is pressed
- Gave this button a 'Gameplay' label
- Used the router componenet from 'expo-router' to navigate to the gameplay section when the button is pressed **ALGORITHM**
- Re labelled the button 'Play Poker'
- Gave the button styling to achieve the desired look

### 1.1.4 - Gameplay section

- Create the gameplay section folder and gave it a stack based layout
- Create the index file for the gameplay section, with some sample text and basic styling
- Changed the heading in the root '_layout.jsx' file to 'Play Poker'
- Removed an unwanted default secondary header

### 1.1.5 - Multiple menu buttons

- Create multiple menu buttons
- Create the folder for each section
- Renamed all headers
- Formatted the menu buttons

### 1.1.6 - Home screen formatting

- Add the logo image
- Formatted the home screen

## 1.2 - Settings

### 1.2.1 - Settings

- Create a settings button
- Imported the router to '_layout.jsx'

### 1.2.2 - Theme context

- Create the Theme Context to share across all screens **CLASS**
- Wrapped the app in the theme provider
- Used the theme in each section
- Resolved an error using the theme in the root '_layout.jsx' file
- Fixed the colour/color spelling inconsistency

### 1.2.3 - Settings buttons

- Create functional settings buttons **ALGORITHM**

### 1.2.4 - Theme selection screen

- Create a dictionary with a name for each theme
- Create the theme selection screen **ALGORITHM**

### 1.2.5 - Text selection screen

- Add the font selection page
- Add font selection **ALGORITHM**
- Create 'BodyText', 'HeaderText' and 'TitleText' classes to change font size across the app **CLASS**
- Exported Text objects
- Add font size selection **ALGORITHM**

# 2 - Gameplay

## 2.1 - Setup Menu

### 2.1.1 - Opening setup menu

- Create index and layout files for setup-menu
- Create custom button class **CLASS**
- Fixed import error
- Rerouted 'Play Poker' button to the setup menu
- Add 'CentredButton' and 'SpaceBetweenButton'

### 2.1.2 - Setup menu buttons
- Add difficulty button
- Add turn length button
- Create ToggleButton **ALGORITHM**
- Add column support for MultiSelect
- Create TextInputField
- Add remaining fields
- Tested logging info
- Completed set up menu

## 2.2 - Gameplay UI

### 2.2.1 - Gameplay section layout
- Create table component
- Seat position **ALGORITHM**
- Create seat component
- Don't render first seat

### 2.2.2 - Gameplay UI
- Create EmptySeat component
- Create hand display
- Create equity display
- Create sidebar component
- Format number **ALGORITHM**
- Chip display

### 2.2.3 - Gameplay controls
- Add action buttons
- Add table content
- Fill out table array **ALGORITHM**

## 2.3 - Game flow logic

### 2.3.1 - File structure
- Create logic folder
- Create file structure to ensure modular programming
- Create rough logic plan

### 2.3.2 - Classes and state
- Created Player class, initialGameState and action to add new player
- Issue, setGameState doesn't update react state
- Fix - notify all subscribers **ALGORITHM**

### 2.3.3 - Dealing the flop
- Create function to deal and shuffle an array of cards
- Created actions for the pre-flop and flop **ALGORITHM**
  - dealPlayerCards
  - dealTableCards
  - joinPlayer
  - newGame
  - resetTable
  - setStage
  - setUser
  - updateSettings
- Created stages which handle functionality for each stage **ALGORITHM**
- Tested flop stage (success)
- Tested dealing to players (success)

### 2.3.4 - Linking logic to UI
- Set contents of TableContent and CardDisplay to reflect table and user cards
- Test functionality (success)
- Create opponent component 

### 2.3.5 - Betting, turn and river
- Re-organised game logic files to ensure each file has one responsibility (to improve modularity)
- Created state files for each folder to improve encapsulation
- Create async betting round to handle user action **ALGORITHM**
- Issue - next player returning undefined
- Completed betting + test

### 2.3.6 - Further rounds
- Implement turn and river
- Collate stages into a single runGame function **ALGORITHM**
- Run round, error expected (success) 
- Run round, opponents fold: player wins (success)

## 2.4 - Poker logic

### 2.4.1 - Hand eval
- Create handEval function
- Importing vitest for testing functionality
- Create function to check how many duplicates the hand contains
- Test countDuplicates function (success)
- Create function to check for a flush
- Test isFlush function (success)
- Create function to check for a straight
- Helper function to sort an array based on dictionary values
- Using mergeSort algorithm
- Helper function to check if the sorted hand is in the RANKS array (meaning it must be a straight)
- Test isStraight function (fail) - doesn't work for A2345
- Fixed + retested (success)
- Made functions work for hand size > 5
- Made functions return the best hand values/suit rather than a boolean
- Simplified sortByRank and sortBySuit functions
- Created a function to find the best hand subject to a filter by suit/rank
- Completed best set function
- Completed best hand function
- Tested (success)