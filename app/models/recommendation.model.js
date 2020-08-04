const {spawn} = require('child_process');
const sql = require("./db.js");

// constructor
const Recommendation = function(recommendation) {
  this.netid = recommendation.netid;
};

Recommendation.find = (netid, result) => {
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python3', ['./app/recommendation/recommender.py', netid]);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);

        console.log(dataToSend);
        var array = JSON.parse(dataToSend)
        result(null, array);
    });
};

module.exports = Recommendation;