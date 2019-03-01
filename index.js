const camelCase = require('camelcase');
const moment = require('moment');
const parseFullName = require('parse-full-name').parseFullName;

//camelCase
console.log(camelCase('hello world'));

//moment
var startDate = moment([2019, 10, 20]);
var endDate = moment([2019, 10, 23]);
console.log(startDate.to(endDate)) // Count the days between the two dates

//Full name
var name = parseFullName('David Jacob de Jong');
console.log(name) // gives you an object with all the name parts 
console.log("Welcome " + name.first); // gives you one part from the object