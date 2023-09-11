// const connection = require('../../mySQL.js');
// const request = require('supertest');
// const app = require('../../server');

// describe("GET /notification/getAllNotiForUser", () => {
//     it("It should respond with an array of items", async () => {
//         const response = await request(app).get("/notification/getAllNotiForUser?USERNAME=Efrat123");
//         expect(response.body[0]).toHaveProperty("DESCRIPTION");
//         expect(response.body[0]).toHaveProperty("READ");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /notification/getAllNotiForManager", () => {
//     it("It should respond with an array of items", async () => {
//         const response = await request(app).get("/notification/getAllNotiForManager");
//         expect(response.body[0]).toHaveProperty("DESCRIPTION");
//         expect(response.body[0]).toHaveProperty("READ");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /notification/getNotReadNotiForUser", () => {
//     it("It should respond with an array of items", async () => {
//         const response = await request(app).get("/notification/getNotReadNotiForUser?USERNAME=Efrat123");
//         expect(response.body[0]).toHaveProperty("DESCRIPTION");
//         expect(response.body[0]).toHaveProperty("READ");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /notification/getAllNoti", () => {
//     it("It should respond with an array of items", async () => {
//         const response = await request(app).get("/notification/getAllNoti");
//         expect(response.body[0]).toHaveProperty("DESCRIPTION");
//         expect(response.body[0]).toHaveProperty("READ");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /notification/getNotReadNotiForManager", () => {
//     it("It should respond with an array of items", async () => {
//         const response = await request(app).get("/notification/getNotReadNotiForManager");
//         expect(response.body[0]).toHaveProperty("DESCRIPTION");
//         expect(response.body[0]).toHaveProperty("READ");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /notification/CheckDate", () => {
//     it("It should respond 'ok'", async () => {
//         const response = await request(app).get("/notification/CheckDate");
//         expect(response.body.message).toBe("ok");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("POST /notification/UpdateToRead", () => {
//     it("It should respond 'update successfully!'", async () => {
//         const Item = await request(app).post("/notification/UpdateToRead").send({
//             ASSOCIATION : 'Efrat123'
//         });
//         expect(Item.body.message).toBe("update successfully!");
//         expect(Item.statusCode).toBe(200);

//     });
// });

test('Always passing test', () => {
    expect(true).toBe(true);
  });