'use strict';
 var XLSX = require('xlsx');
exports.calculate_cost = function(req, res) {
    let path = 'C:\\File\\Programming\\educationCostApi\\api\\college_data.csv'
    var college_data = XLSX.readFile('./college_data.csv');
    console.log(college_data)
    res.send('total cost')

};