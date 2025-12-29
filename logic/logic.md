# Game Flow

1. Initialise hand
 - Deal hole cards
 - Deal flop
 - Hand out big/small blinds
 - Select starting player

2. Initialise betting round
 - Start turn timer
 - Recieve starting player action
 - Update player
 - Update pot 
 - If turn ends, automatically check/fold
 - *Repeat* for next player *Until* everyone is in/folded

 3. Deal next card
 - Deal the next card
 - *Repeat* step 2 *Until* flood is dealt

 4. Calculate winner
 - **ALGORITHM** Calculate winning hand
 - Distribute pot