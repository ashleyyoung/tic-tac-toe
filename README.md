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

To do: 

(1) Modify db entries to have a single object added per game with move history
ex:
```
{
  _id : ...
  matchHistory: {
    ...
  }
}
```

(2) Modify user access to push incoming users onto a queue to face User1 in the order they arrive to challenge. When a new challenger arrives, it may post to the route something like, 'I, [UserName], challenge the next worthy opponent to a round of Tic Tac Toe!' and be added to the queue. If the user is User1, it will not be added to the queue as it is always the defending challenger. Otherwise, the user will be added to the queue to face User1. The challenging user may only hold one space in the queue. If the challenging user is already in the queue, it will receive a message like, 'Easy, Tiger. You'll get your chance.' 

