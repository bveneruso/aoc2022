let filereader = require('../../shared/filereader.js');

// Global vars to manage state across functions
let maxCount = 0;
let currCount = 0;

// Main async run function
async function run() {
	await filereader.processLineByLine(__dirname + '/input1.txt', function(line) {
		line.length === 0 ? updateMaxCount() : currCount += Number(line);
	});
	updateMaxCount();
	console.log(maxCount);
}

// Helper function to reduce duplication
function updateMaxCount() {
	maxCount = Math.max(currCount, maxCount);
	currCount = 0;
}

// Correct answer: 69177
run();
