'use strict';
var XLSX = require('xlsx');
exports.calculate_cost = function (req, res) {
    let response = CalculateCost(req.body);
    if (response == 400) {
        return res.status(response).send({ //400 -> bad request
            message: 'Error: College name is required'
        });
    }
    if (response == 401) {
        return res.status(response).send({ //401 -> college not found
            message: 'Error: College not found'
        });
    }
    else {
        res.send(response);
    }
};

var CalculateCost = (params) => {
    if (!params.college_name)
        return 400;
    let college_information = FindCollege(params.college_name)
    if (!college_information) {
        return 401;
    }
    let tuition = CalculateTuition(college_information, params.include_room_and_board)
    return tuition;
}

var CalculateTuition = (college_information, room_and_board) => {
    let in_state_cost;
    let out_of_state_cost;
    let room_and_board_cost;
    if (college_information['in_state'])
        in_state_cost = college_information['in_state'].v;
    if (college_information['out_of_state'])
        out_of_state_cost = college_information['out_of_state'].v;
    if (room_and_board && college_information['room_and_board'])
        room_and_board_cost = college_information['room_and_board'].v;
    console.log(in_state_cost, out_of_state_cost, room_and_board_cost);
    let tuition = { college_name: college_information['college_name'].v };
    let additional_cost = 0;
    if (room_and_board && room_and_board_cost)
        additional_cost = room_and_board_cost;
    if (in_state_cost)
        tuition['in_state'] = in_state_cost + additional_cost;
    if (out_of_state_cost)
        tuition['out_of_state'] = out_of_state_cost + additional_cost;
    return tuition
}


var FindCollege = (college_name) => {
    let college_data = XLSX.readFile('api/data/college_data.csv').Sheets.Sheet1;
    var row_count = XLSX.utils.decode_range(college_data['!ref']).e.r;
    for (let i = 2; i <= row_count + 1; i++) {
        let name_key = 'A' + i.toString();
        if (college_data[name_key].v == college_name) {
            let in_state_key = 'B' + i.toString();
            let out_of_state_key = 'C' + i.toString();
            let room_and_board_key = 'D' + i.toString();
            return {
                college_name: college_data[name_key],
                in_state: college_data[in_state_key],
                out_of_state: college_data[out_of_state_key],
                room_and_board: college_data[room_and_board_key]
            };
        }
    }
    return false;
}