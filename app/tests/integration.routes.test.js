process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../");

describe("GET /hello - hello world", () => {
	it("should say hello", done => {
		chai.request(server)
		.get("/hello")
		.end((err, res) => {
			should.not.exist(err);
			res.status.should.equal(200);
			res.body.value.should.equal("hello");
			done();
		});
	});
});

describe("GET /addtwo - Additions", () => {
	it("should add two to the parameter", done => {
		chai.request(server)
		.get("/addtwo/2")
		.end((err, res) => {
			should.not.exist(err);
			res.status.should.equal(200);
			res.body.value.should.equal(4);
			done();
		});
	});
});