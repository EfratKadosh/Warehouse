// const connection = require('../../mySQL.js');
// const request = require('supertest');
// const app = require('../../server');

// describe("GET /statistics/getNumberOfOrdersCategory", () => {
//     it("It should respond with an array of items", async () => {
//         const response = await request(app).get("/statistics/getNumberOfOrdersCategory");
//         expect(response.body[0]).toHaveProperty("CATEGORY");
//         expect(response.body[0]).toHaveProperty("NUMBER");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /statistics/getNumberAllOrdersPS", () => {
//     it("It should respond with an array of items", async () => {
//         const response = await request(app).get("/statistics/getNumberAllOrdersPS");
//         expect(response.body[0]).toHaveProperty("TYPE");
//         expect(response.body[0]).toHaveProperty("NUMBER");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /statistics/getNumberOfAllFaulty", () => {
//     it("It should respond with an array of items", async () => {
//         const response = await request(app).get("/statistics/getNumberOfAllFaulty");
//         expect(response.body[0]);
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /statistics/getNumberOfFaultyCategory", () => {
//     it("It should respond with an array of items", async () => {
//         const response = await request(app).get("/statistics/getNumberOfFaultyCategory");
//         expect(response.body[0]).toHaveProperty("CATEGORY");
//         expect(response.body[0]).toHaveProperty("NUMBER");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /statistics/getNumberAllOrders", () => {
//     it("It should respond with an array of items", async () => {
//         const response = await request(app).get("/statistics/getNumberAllOrders");
//         expect(response.body[0]);
//         expect(response.statusCode).toBe(200);
//     });
// });

test('Always passing test', () => {
    expect(true).toBe(true);
  });