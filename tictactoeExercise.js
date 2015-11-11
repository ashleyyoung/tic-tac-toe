var restify         = require('restify');
var mongojs         = require('mongojs');
var Joi             = require('joi')
var ticTacToeHelper = require('./ticTacToeHelper.js')

var gameDataSchema  = Joi.object().keys({
    user: Joi.string().valid(['User1','User2','User3']).required(),
    positionX: Joi.number().required(),
    positionY: Joi.number().required()
})  

var ip     = '127.0.0.1';
var port   =  '8080';
var server = restify.createServer({
    name : "Tic Tac Toe"
});

server.listen(port ,ip, function(){
    console.log('%s listening at %s ', server.name , server.url);
    // res.send('Waiting for opponent')
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

var connection = '127.0.0.1:27017/tictactoe';
var db = mongojs(connection, ['tictactoe']);
var games = db.collection("games"); 


var gameGrid = [[0,0,0],
                [0,0,0],
                [0,0,0]]

var clearGrid = [[0,0,0],
                [0,0,0],
                [0,0,0]]

var turnCount = 0

function postUserMove(req , res , next){

    // console.log("REQ: ", req.params)

    var move = {};
    Joi.validate(req.params, gameDataSchema, function (err, validation){
        if(err) res.send(err)
        move = validation
    })

    if( gameGrid[move.positionX][move.positionY] === 'x' ){
        var occupied = 'Position (' + move.positionX + ',' + move.positionY + ') is occupied. Please choose another move.'
        res.send(occupied);
        return next()
    }

    gameGrid[move.positionX][move.positionY] = (req.params.user === 'User1') ? 'x' : 'o'
    move.time = new Date();
    move.currentGameGrid = gameGrid
    move.turnNumber = ++turnCount

    var winCheckResult = ticTacToeHelper.checkForWin(gameGrid)
    
    // console.log("MOVE: ", move)
  
    games.insert(move, function(err, result) {

        if (err) {
            console.log('Response error ' + err);
            return next(err)
        }
        
        if (winCheckResult > 0) {
            gameGrid = clearGrid
            turnCount = 0
            if(move.user === 'User1'){
                res.send('You win!');
            }else {
                res.send('You lose :(');
            }
        }

        if ( winCheckResult === 0 && ticTacToeHelper.gameGridIsFull(gameGrid) ) {
            res.send('Cat\'s game');
        }

        res.send(result);
        return next();

    });
}

function findAllMoves(req, res , next){

    games.find().sort({postedOn : -1} , function(err , matchHistory){
        
        if(err) return next(err)
     
        res.send(matchHistory);
        return next(null, matchHistory)
    })
}


var path = '/'
var matchHistoryPath = '/matchHistory'
server.get({path : matchHistoryPath , version : '0.0.1'} , findAllMoves)
// server.get({path : path , version : '0.0.1'} , currentState)
server.post({path : path, version: '0.0.1'} , postUserMove)



