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
        // send data to browser
        var s = dataToSend.replace(/\[/g, "{");
        s = s.replace(/\]/g, "}");
        s = s.replace(/Decimal\(\'/g, "");
        s = s.replace(/\'\)/g, "");
        s = s.replace(/\{\{/g, "[{");
        s = s.replace(/\}\}/g, "}]");
        s = s.replace(/\'/g, "\"");

        var res = s.substring(s.indexOf("{"), s.indexOf("}") + 1);
        s = "{'subject': 'CS', 'number': '101', 'gpa': '3.4}";
        s = JSON.parse(s);
        // console.log(s);
        //var array = dataToSend.replace(/^\[|\]$/g, "").split(", ");
        result(null, s);
    });
};

// parseData = (dataToSend) => {
//     var dataToSend = `[('CS', 101, Decimal('3.65'), 'Davis', Decimal('4.0')), ('CS', 101, Decimal('3.65'), 'Davis', Decimal('3.9')), ('CS',
//     498, Decimal('3.40'), 'Miller', Decimal('5.0')), ('CS', 498, Decimal('3.40'), 'Miller', Decimal('4.5')), ('CS', 498,
//     Decimal('3.40'), 'Miller', Decimal('3.0')), ('CS', 498, Decimal('3.40'), 'Miller', Decimal('2.3')), ('CS', 105,
//     Decimal('3.19'), 'Ha', Decimal('3.5')), ('CS', 361, Decimal('3.10'), 'Liu', Decimal('5.0')), ('CS', 361,
//     Decimal('3.10'), 'Li', Decimal('4.7')), ('CS', 361, Decimal('3.10'), 'Li', Decimal('4.2')), ('CS', 361, Decimal('3.10'),
//     'Liu', Decimal('4.0')), ('CS', 361, Decimal('3.10'), 'Li', Decimal('4.0')), ('CS', 361, Decimal('3.10'), 'Li',
//     Decimal('3.5')), ('CS', 361, Decimal('3.10'), 'Li', Decimal('3.5')), ('CS', 361, Decimal('3.10'), 'Li', Decimal('3.0')),
//     ('CS', 361, Decimal('3.10'), 'Liu', Decimal('1.7')), ('CS', 361, Decimal('3.10'), 'Liu', Decimal('1.5')), ('CS', 361,
//     Decimal('3.10'), 'Liu', Decimal('1.0')), ('CS', 101, Decimal('3.65'), 'Davis', Decimal('4.0')), ('CS', 498,
//     Decimal('3.40'), 'Miller', Decimal('4.7')), ('CS', 498, Decimal('3.40'), 'Miller', Decimal('2.5')), ('CS', 105,
//     Decimal('3.19'), 'Harris', Decimal('3.0')), ('CS', 498, Decimal('3.41'), 'Shaffer', Decimal('4.3')), ('CS', 498,
//     Decimal('3.40'), 'Miller', Decimal('2.0')), ('CS', 498, Decimal('3.40'), 'Miller', Decimal('4.0')), ('CS', 101,
//     Decimal('3.65'), 'Davis', Decimal('5.0'))]`;




// };

module.exports = Recommendation;