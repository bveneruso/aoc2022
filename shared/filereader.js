let LineByLineReader = require('line-by-line');

/**
 * Reads a file line by line
 * @param fileName The file to read
 * @param onLineFn The function to call with each file contents
 * @param onCloseFn The function to call when file is done being read
 * @returns {Promise<void>}
 */
async function processLineByLine(fileName, onLineFn) {
	try {
		return new Promise(function(resolve, reject) {
			const lr = new LineByLineReader(fileName);

			lr.on('error', function(err) {
				console.error(err);
				reject(error);
			});

			lr.on('line', async (line) => {
				lr.pause();
				await onLineFn(line.trim());
				lr.resume();
			});

			lr.on('end', function () {
				resolve();
			});
		})
	} catch (err) {
		console.error(err);
	}
}

async function getFileAsArray(fileName) {
	let array = [];
	await processLineByLine(fileName, function(line) {
		array.push(line);
	});
	return array;
}

module.exports = {
	processLineByLine,
	getFileAsArray
};
