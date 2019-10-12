var fs = require("fs");

var jsonFile = fs.readFileSync('./question-bank/data.json');

var jsonContent = JSON.parse(jsonFile);
function getQuestion() {
    console.log("Hello World!");

    for(var i = 0; i < jsonContent.length; i++) {
        console.log("ID: " + jsonContent[i].ID);
        //newPerson.lastname = jsonContent[i].lastname;
        //newPerson.age = jsonContent[i].age;
        //newPerson.save(function (err) {});
    }
}

module.exports = {
    'getQuestion': getQuestion
}