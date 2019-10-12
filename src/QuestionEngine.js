var fs = require("fs");

var jsonFile = fs.readFileSync('./question-bank/conditionalQuestions.json');
var jsonFile2 = fs.readFileSync('./question-bank/alwaysQuestions.json');

var conditionalJSON = JSON.parse(jsonFile);
var alwaysJSON = JSON.parse(jsonFile2);

var exampleVariables = {"Sociable" : 0, "Active" : 0, "Productive" : 0, "Happy" : 0, "Sleep" : 0, "Study": 0};

function getQuestion(questionIndex, variables=exampleVariables) { //0 index please

    if(i < alwaysJSON.length){
        return alwaysJSON[i];
    }

    var tempQNum = alwaysJSON.length; 

    for(var i = 0; i < conditionalJSON.length; i++) {
        console.log("ID: " + conditionalJSON[i].ID);
        
        console.log("Variable Requirement to ask question" + conditionalJSON[i]["Variable Requirement to ask question"]);
        if(conditionalJSON[i]["Condition"] == "<"){
            if(variables[conditionalJSON[i]["Variable Requirement to ask question"]] < conditionalJSON[i]["Input Variable Value"]){
                if(tempQNum == questionIndex){
                    return conditionalJSON[i];
                }
            }
        }else{
            if(variables[conditionalJSON[i]["Variable Requirement to ask question"]] > conditionalJSON[i]["Input Variable Value"]){
                if(tempQNum == questionIndex){
                    return conditionalJSON[i];
                }
            }
        }
        
        tempQNum += 1;
    }

    return null; //No question to give
}

module.exports = {
    'getQuestion': getQuestion
}