window.onload = function() {
var button = document.getElementById("update");

var interval = 100;
var arrayIndex = 0;

// LFO ARRAY CREATOR
function lfo(min, max, speed, waveForm, waveLength) { // function generates array representing points on either a triangle or sawtooth wave, to 3 decimal places. min = sarting value (includes decimal). max = peak value (includes decimal). speed = distance between points (includes decimal). waveForm = triangle: 1, sawtooth: 2. length = 1 - 1000.
		var wavePoints = [];
		for (let i = min; i <= max; i += speed) {
			wavePoints.push(Number(i.toFixed(3)));
			if (i === max) {
				if (waveForm === 1) {
					var reversedArray = wavePoints.slice(1,wavePoints.length-1);
					wavePoints = wavePoints.concat(reversedArray.reverse());
				}
				if (waveLength === 1) {
					return wavePoints;
				}
				else if (waveLength > 1) {
					var finishedArray = wavePoints;
					var count = 0;
					while (count < waveLength) {
						finishedArray.forEach(function(data) {
						wavePoints.push(data);
					});
						count++;
					}
				}
				return wavePoints;
			}
		}
};

var lfo_1 = lfo(10,255,5,1,8);
var lfo_2 = lfo(0,255,3,1,8);

var lfo_2_saw = lfo(0,255,3,2,8);
var lfo_2_saw_reversed = lfo_2_saw.slice(0);
lfo_2_saw_reversed = lfo_2_saw_reversed.reverse();

// LFO set for Square Sizes
var lfo_3_3 = lfo(0,3,1,1,13);
var lfo_3_5 = lfo(0,5,1,1,12);
var lfo_3_10 = lfo(0,10,1,1,10);
var lfo_3_20 = lfo(0,20,1,1,8);
var lfo_3_35 = lfo(0,35,1,1,7);
var lfo_3_60 = lfo(0,60,1,1,6);

setInterval(function() {
	previewHandler();
	arrayIndex++;
}, interval)

function previewHandler() {
	var numberOfSquares = document.getElementById("numberOfSquares")[document.getElementById("numberOfSquares").selectedIndex].value
	var canvas = document.getElementById("tshirtCanvas");
	var context = canvas.getContext("2d");
	var selectObj = document.getElementById("playPause");
	var index = selectObj.selectedIndex;
	var playPause = selectObj[index].value;
	if (playPause == "play") {
		for (var squares = 0; squares < numberOfSquares; squares++) {
			drawSquare(canvas, context);
		}
	}
}

function rndNum(x,y) {
	var number = 0;
	while (number > -1) {
		number = Math.floor(Math.random() * y);
		if (number < x || number == undefined) {
			// DO NOTHING	
		} else {
			return number;
			number = -1;
		}
	}
}

function drawSquare(canvas, context) {
	var gradient = document.getElementById("gradient")[document.getElementById("gradient").selectedIndex].value;
	var squareSize = document.getElementById("squareSize")[document.getElementById("squareSize").selectedIndex].value;
	var colourScheme = document.getElementById("colourScheme")[document.getElementById("colourScheme").selectedIndex].value;
	
	// COLOUR SCHEMES
	var colourScheme1 = "rgb("+lfo_1[arrayIndex]+", "+lfo_1[arrayIndex+rndNum(50,100)]+", "+lfo_2[arrayIndex+rndNum(0,13)]+")";
	var colourScheme2 = "rgb("+lfo_2[arrayIndex]+", "+lfo_1[arrayIndex+rndNum(0,100)]+", "+lfo_1[arrayIndex]+")";
	var colourScheme3 = "rgb("+lfo_1[arrayIndex+rndNum(0,3)]+", "+lfo_1[arrayIndex+rndNum(0,5)]+", "+lfo_2_saw[arrayIndex]+")";
	var colourScheme4 = "rgb("+lfo_1[arrayIndex+rndNum(0,3)]+", "+lfo_2_saw_reversed[arrayIndex+rndNum(3,10)]+", "+lfo_2_saw[arrayIndex]+")";

	var w = squareSize == "1" ? 1 : ((squareSize == "3" ? lfo_3_3 :
									  squareSize == "5" ? lfo_3_5 :
									  squareSize == "10" ? lfo_3_10 :
									  squareSize == "20" ? lfo_3_20 :
									  squareSize == "35" ? lfo_3_35 :
									  lfo_3_60)[arrayIndex]);
									  
	var x = rndNum((gradient == "enabled" ? rndNum(0, canvas.width) : 0),canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	
	context.fillStyle = (colourScheme == "1" ? colourScheme1 :
						 colourScheme == "2" ? colourScheme2 :
						 colourScheme == "3" ? colourScheme3 :
						 colourScheme4);
	context.fillRect(x, y, w, w);
}


};
