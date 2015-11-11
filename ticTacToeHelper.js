

/*
*	Check for a horizontal win.
*	If x wins, return 1. If o wins, return 2. Otherwise return 0.
*/
exports.checkForHorizontalWin = function (xCoord, yCoord, gameGrid){
	var xCount = 0
	var yCount = 0
	var win = 0
	
	if(gameGrid[xCoord][yCoord] === 'x'){
		xCount++
		if(gameGrid[xCoord + 1][yCoord] === 'x' || ((xCoord - 1 > -1) && gameGrid[xCoord - 1][yCoord] === 'x')) {
			xCount++
			if(gameGrid[xCoord + 2][yCoord] === 'x' || ((xCoord - 2 > -1) && gameGrid[xCoord - 2][yCoord] === 'x')) {
				xCount++
				return win = 1
			}
		}
	}

	if(gameGrid[xCoord][yCoord] === 'o'){
		yCount++
		if(gameGrid[xCoord + 1][yCoord] === 'o' || ((xCoord - 1 > -1) && gameGrid[xCoord - 1][yCoord] === 'o')) {
			yCount++
			if(gameGrid[xCoord + 2][yCoord] === 'o' || ((xCoord - 2 > -1) && gameGrid[xCoord - 2][yCoord] === 'o')) {
				yCount++
				return win = 2
			}
		}
	}

	return win
}

/*
*	Check for a vertical win.
*	If x wins, return 1. If o wins, return 2. Otherwise return 0.
*/
exports.checkForVerticalWin = function (xCoord, yCoord, gameGrid){
	var xCount = 0
	var yCount = 0
	var win = 0

	if(gameGrid[xCoord][yCoord] === 'x'){
		xCount++
		if(gameGrid[xCoord][yCoord + 1] === 'x' || ((yCoord - 1 > -1) && gameGrid[xCoord][yCoord - 1] === 'x')) {
			xCount++
			if(gameGrid[xCoord][yCoord + 2] === 'x' || ((yCoord - 2 > -1) && gameGrid[xCoord][yCoord - 2] === 'x')) {
				xCount++
				return win = 1
			}
		}
	}

	if(gameGrid[xCoord][yCoord] === 'o'){
		yCount++
		if(gameGrid[xCoord + 1][yCoord] === 'o' || ((yCoord - 1 > -1) && gameGrid[xCoord - 1][yCoord] === 'o')) {
			yCount++
			if(gameGrid[xCoord + 2][yCoord] === 'o' || ((yCoord - 2 > -1) && gameGrid[xCoord - 2][yCoord] === 'o')) {
				yCount++
				return win = 2
			}
		}
	}

	return win
}

/*
*	Check for vertical and horizontal wins.
*/
exports.checkForWin = function (gameGrid){
	var xCount = 0
	var yCount = 0
	var winVertical = 0
	var winHorizontal = 0
	var win = 0
	for(var xCoord = 0; xCoord < 3; xCoord++){
		for(var yCoord = 0; yCoord <3 ; yCoord++){

			winVertical = this.checkForVerticalWin(xCoord, yCoord, gameGrid)
			winHorizontal = this.checkForHorizontalWin(xCoord, yCoord, gameGrid)

			if(winHorizontal > 0){
				win = winHorizontal
				return win
			}
			if(winVertical > 0){
				win = winVertical
				return win
			}
		}
	}

	return win
}