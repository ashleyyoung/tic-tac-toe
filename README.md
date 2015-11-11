# tic-tac-toe

To play this game, you'll need the following modules:

restify, mongojs, joi

Launch the code with ```node tictactoeExercise.js```

Post your moves to ```http://localhost:8080/```

Use the following request format to post your moves:
```
{
  "user": "User1",  //can be User1, User2 or User3
  "positionX": 0,
  "positionY": 2
}
```
Don't post the save move twice; you'll have to try again.

Stay in range: 0, 1, and 2 are valid x and y coordinates.

Get your move history from ```http://localhost:8080/matchHistory```.

More to come!
