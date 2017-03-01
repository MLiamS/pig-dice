# _Pig Dice_

#### _Pig Dice, 3-01-2017_

#### By _**Janek Brandt and Liam Stabeno**_

## Description
_This project will allow a user to play a game of pig dice against another user._


## Specifications

| Behavior                   | Input Example     | Output Example    |
| -------------------------- | -----------------:| -----------------:|
| initialize a player object with 2 variables: tempScore and score both = 0 | player1 = new Player() | { player: "player1", score: 0, tempScore: 0 } |
| player object has roll method that will generate random number between 1-6. If the number is greater than or equal to 2 it gets added to tempScore and allows the player to choose to roll again. | player1.roll() | { player: "player1", score: 0, tempScore: 4 } |
| player object has pass method that will end the players turn, it will add the tempScore variable to the score variable and set tempScore back to 0 | player1.pass() | { player: "player1", score: 4, tempScore: 0 } |
| if roll is equal to 1, tempScore variable becomes 0 and the pass method is run | player1.roll() === 1 | { player: "player1", score: 4, tempScore: 0 } |




## Setup/Installation Requirements

* _Clone the repository_
* _Open index.html file in web browser to view the project locally_
* _Use web server of your choice to host the website_

### License

Copyright (c) 2017 **_Janek Brandt and Liam Stabeno_**

This software is licensed under the MIT license.
