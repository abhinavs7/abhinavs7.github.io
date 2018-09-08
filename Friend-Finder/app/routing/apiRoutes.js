var path = require("path");
var friends = [];
var exported = require("../data/friends").then(function (records) {

    friends = records;
});;

module.exports = function (app) {

    //console.log("Inside apirouting");
    app.get("/api/friends", function (req, res) {
        console.log(friends);
        return res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        console.log(req.body);
        console.log(req.body.scores);

        var currentUser = req.body.scores;

        //console.log("Friends Array - "+friends);
        //console.log(currentUser.length);
        var diff = 0;
        var i = 0;
        var diffArray = [];
        var totalDifference = 0;
        var storedUserScores;
        for (var i = 0; i < friends.length; i++) {

            storedUserScores = friends[i].scores;
            //console.log("Stored User score: " + storedUserScores);
            for (var j = 0; j < currentUser.length; j++) {
                //console.log(parseInt(currentUser[j]));
                //console.log(storedUserScores);
                diff = parseInt(currentUser[j]) - storedUserScores[j];

                if (diff < 0) {
                    diff = -1 * diff;
                }
                //console.log("Diff "+diff)

                totalDifference += diff;
                //console.log("Total Diff: "+totalDifference);
            }
            diffArray.push(totalDifference);
            totalDifference = 0;
        }
        console.log(diffArray);
        var min = Math.min.apply(Math, diffArray);
        //console.log(min);

        console.log(diffArray.indexOf(min));
        var result = friends[diffArray.indexOf(min)];
        //console.log(friends[diffArray.indexOf(min)]);

        res.json(result);
        // }

    });
};
