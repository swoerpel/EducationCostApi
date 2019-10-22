var supertest = require("supertest");
var should = require("should");
var test_data = require("./test_data.js")
var server = supertest.agent("http://localhost:3000/tuition_cost");

let school_names = Object.keys(test_data)
let subset_size = 50;
var random_colleges_subset = [...new Array(subset_size)].map(() => school_names[Math.floor(Math.random() * school_names.length)]);
console.log('College Subset Size', subset_size)

Test_Without_Room_And_Board();
Test_With_Room_And_Board();
Test_Error_Responses();

function Test_Without_Room_And_Board() {
    let test_params = []
    random_colleges_subset.map((college_name, index) => {
        test_params.push({
            description: `College ${index + 1} - Without Room & Board`,
            body: {
                "college_name": college_name,
                "include_room_and_board": false
            }
        })
    });
    for (let i = 0; i < subset_size; i++) {
        describe(test_params[i].description, function () {
            let name = test_params[i].body["college_name"]
            it(name, (done) => {
                server.get("/")
                    .send(test_params[i].body)
                    .expect("Content-type", /json/)
                    .expect(200)
                    .end(function (err, res) {
                        if (test_data[name].in_state != null)
                            res.body.in_state.should.equal(test_data[name].in_state);
                        if (test_data[name].out_of_state != null)
                            res.body.out_of_state.should.equal(test_data[name].out_of_state);
                        done();
                    });
            });
        });
    }
}

function Test_With_Room_And_Board() {
    let test_params = []
    random_colleges_subset.map((college_name, index) => {
        test_params.push({
            description: `College ${index + 1} - With Room & Board`,
            body: {
                "college_name": college_name,
                "include_room_and_board": true
            }
        })
    });
    for (let i = 0; i < subset_size; i++) {
        describe(test_params[i].description, function () {
            let name = test_params[i].body["college_name"]
            it(name, (done) => {
                server.get("/")
                    .send(test_params[i].body)
                    .expect("Content-type", /json/)
                    .expect(200)
                    .end(function (err, res) {
                        if (test_data[name].in_state != null)
                            res.body.in_state.should.equal(test_data[name].in_state + test_data[name].room_and_board);
                        if (test_data[name].out_of_state != null)
                            res.body.out_of_state.should.equal(test_data[name].out_of_state + test_data[name].room_and_board);
                        done();
                    });
            });
        });
    }
}

function Test_Error_Responses() {

    describe("Test Error: College name is required", function () {
        let body = {
        }
        it("Return 400", (done) => {
            server.get("/")
                .send(body)
                .expect("Content-type", /json/)
                .expect(400)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    done();
                });
        });
    });

    describe("Test Error: College name is required - No Body", function () {
        it("Return 400", (done) => {
            server.get("/")
                .expect("Content-type", /json/)
                .expect(400)
                .end(function (err, res) {
                    res.status.should.equal(400);
                    done();
                });
        });
    });

    describe("Test Error: College not found", function () {
        let body = {
            "college_name": "Liberty asdf",
            "include_room_and_board": false
        }
        it("Return 401", (done) => {
            server.get("/")
                .send(body)
                .expect("Content-type", /json/)
                .expect(401)
                .end(function (err, res) {
                    res.status.should.equal(401);
                    done();
                });
        });
    });
}
