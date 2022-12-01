let filereader = require('../../shared/filereader.js');

// Global vars to manage state across functions
let sortedMaxes = [];
let MAXES_TO_TRACK = 3;
let currCount = 0;

// Main async run function
async function run() {
	await filereader.processLineByLine(__dirname + '/input2.txt', function(line) {
		line.length === 0 ? updateMaxCount() : currCount += Number(line);
	});
	updateMaxCount();
	console.log(sortedMaxes.reduce((sum, curr) => sum + curr));
}

// Helper function to reduce duplication
function updateMaxCount() {
	if(sortedMaxes.length < MAXES_TO_TRACK + 1) {
		sortedMaxes.push(Number(currCount));
	}
	if(sortedMaxes.length === MAXES_TO_TRACK + 1) {
		sortedMaxes.sort((a, b) => a - b)
		sortedMaxes.splice(0, 1);
	}
	currCount = 0;
}

// Correct answer: 207456
run();
