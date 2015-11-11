# tic-tac-toe

To play this game, you'll need the following modules:

restify, mongojs, joi

Post moves to ```http://localhost:8080/```

Use the following request format to post your moves:
```
{
  "user": "User1",  //can be User1 or User2 
  "positionX": 0,
  "positionY": 2
}
```
Don't post the save move twice; you'll have to try again.

Get your move history from ```http://localhost:8080/``` as well.

More to come!
