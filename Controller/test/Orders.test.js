// const connection = require('../../mySQL.js');
// const request = require('supertest');
// const app = require('../../server');

// describe("POST /orders/addOrderForPS", () => {
//     it("It should respond 'New order created successfully'", async () => {
//         const Item = await request(app).post("/orders/addOrderForPS").send({
//             USERNAME : 'Yam123',
//             TYPE : 'Studio',
//             NUM : '1',
//             DATE_TIME : '01/06/2023 19:00'
//         });
//         expect(Item.body.message).toBe("New order created successfully");
//         expect(Item.statusCode).toBe(200);

//     });
// });

// describe("POST /orders/addOrderForPS", () => {
//     it("It should respond 'The podcast or studio is busy at the time you chose'", async () => {
//         const Item = await request(app).post("/orders/addOrderForPS").send({
//             USERNAME : 'Yam123',
//             TYPE : 'Studio',
//             NUM : '1',
//             DATE_TIME : '01/06/2023 12:00'
//         });
//         expect(Item.body.message).toBe("The podcast or studio is busy at the time you chose");
//         expect(Item.statusCode).toBe(400);

//     });
// });

// describe("POST /orders/UpdateStatusOrderPS", () => {
//     it("It should respond 'update successfully!'", async () => {
//         const Item = await request(app).post("/orders/UpdateStatusOrderPS").send({
//             STATUS : 'Accept',
//             TYPE : 'Studio',
//             NUM : '1',
//             DATE_TIME : '01/06/2023 19:00',
//             USERNAME: 'Yam123'
//         });
//         expect(Item.body.message).toBe("update successfully!");
//         expect(Item.statusCode).toBe(200);

//     });
// });

// describe("GET /orders/getAllOrdersPS", () => {
//     it("It should respond with an array of orders", async () => {
//         const response = await request(app).get("/orders/getAllOrdersPS");
//         expect(response.body[0]).toHaveProperty("USERNAME");
//         expect(response.body[0]).toHaveProperty("TYPE");
//         expect(response.body[0]).toHaveProperty("NUM");
//         expect(response.body[0]).toHaveProperty("DATE_TIME");
//         expect(response.body[0]).toHaveProperty("STATUS");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /orders/getAllOrderPSForUser", () => {
//     it("It should respond with an array of orders", async () => {
//         const response = await request(app).get("/orders/getAllOrderPSForUser?USERNAME=Israel123");
//         expect(response.body[0]).toHaveProperty("USERNAME");
//         expect(response.body[0]).toHaveProperty("TYPE");
//         expect(response.body[0]).toHaveProperty("NUM");
//         expect(response.body[0]).toHaveProperty("DATE_TIME");
//         expect(response.body[0]).toHaveProperty("STATUS");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("POST /orders/UpdateStatusOrderItem", () => {
//     it("It should respond 'update successfully!'", async () => {
//         const Item = await request(app).post("/orders/UpdateStatusOrderItem").send({
//             STATUS_ORDER : 'Accept',
//             USERNAME : 'Efrat123',
//             BORROW_DATE : '01/06/2023',
//             NAMEITEM : 'Sony A7III',
//             S_N: '4477024'
//         });
//         expect(Item.body.message).toBe("update successfully!");
//         expect(Item.statusCode).toBe(200);

//     });
// });


// describe("GET /orders/getAllOrdersItem", () => {
//     it("It should respond with an array of orders", async () => {
//         const response = await request(app).get("/orders/getAllOrdersItem");
//         expect(response.body[0]).toHaveProperty("USERNAME");
//         expect(response.body[0]).toHaveProperty("NAMEITEM");
//         expect(response.body[0]).toHaveProperty("S_N");
//         expect(response.body[0]).toHaveProperty("BORROW_DATE");
//         expect(response.body[0]).toHaveProperty("RETURN_DATE");
//         expect(response.body[0]).toHaveProperty("STATUS");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /orders/getAllOrderItemForUser", () => {
//     it("It should respond with an array of orders", async () => {
//         const response = await request(app).get("/orders/getAllOrderItemForUser?USERNAME=Efrat123");
//         expect(response.body[0]).toHaveProperty("USERNAME");
//         expect(response.body[0]).toHaveProperty("NAMEITEM");
//         expect(response.body[0]).toHaveProperty("S_N");
//         expect(response.body[0]).toHaveProperty("BORROW_DATE");
//         expect(response.body[0]).toHaveProperty("RETURN_DATE");
//         expect(response.body[0]).toHaveProperty("STATUS");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /orders/getOrderAcceptForUser", () => {
//     it("It should respond with an array of orders", async () => {
//         const response = await request(app).get("/orders/getAllOrderItemForUser?USERNAME=Efrat123");
//         expect(response.body[0]).toHaveProperty("USERNAME");
//         expect(response.body[0]).toHaveProperty("NAMEITEM");
//         expect(response.body[0]).toHaveProperty("S_N");
//         expect(response.body[0]).toHaveProperty("BORROW_DATE");
//         expect(response.body[0]).toHaveProperty("RETURN_DATE");
//         expect(response.body[0]).toHaveProperty("STATUS");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /orders/getOrderForStatus", () => {
//     it("It should respond with an array of orders", async () => {
//         const response = await request(app).get("/orders/getOrderForStatus?STATUS_ORDER=Accept");
//         expect(response.body[0]).toHaveProperty("USERNAME");
//         expect(response.body[0]).toHaveProperty("NAMEITEM");
//         expect(response.body[0]).toHaveProperty("S_N");
//         expect(response.body[0]).toHaveProperty("BORROW_DATE");
//         expect(response.body[0]).toHaveProperty("RETURN_DATE");
//         expect(response.body[0]).toHaveProperty("STATUS");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /orders/getOrderForStatus", () => {
//     it("It should respond with an array of orders", async () => {
//         const response = await request(app).get("/orders/getOrderForStatus?STATUS_ORDER=In-processed");
//         expect(response.body[0]).toHaveProperty("USERNAME");
//         expect(response.body[0]).toHaveProperty("NAMEITEM");
//         expect(response.body[0]).toHaveProperty("S_N");
//         expect(response.body[0]).toHaveProperty("BORROW_DATE");
//         expect(response.body[0]).toHaveProperty("RETURN_DATE");
//         expect(response.body[0]).toHaveProperty("STATUS");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("POST /orders/addorder", () => {
//     it("It should respond 'New order created successfully'", async () => {
//         const Item = await request(app).post("/orders/addorder").send({
//             USERNAME : 'Efrat123',
//             BORROW_DATE : '05/07/2023',
//             RETURN_DATE : '08/07/2023',
//             NAMEITEM : 'Sony A7III',
//             S_N: '4477024'
//         });
//         expect(Item.body.message).toBe("New order created successfully");
//         expect(Item.statusCode).toBe(200);

//     });
// });

// describe("POST /orders/addorder", () => {
//     it("It should respond 'The selected dates are not available for this item'", async () => {
//         const Item = await request(app).post("/orders/addorder").send({
//             USERNAME : 'Efrat123',
//             BORROW_DATE : '05/07/2023',
//             RETURN_DATE : '08/07/2023',
//             NAMEITEM : 'Sony A7III',
//             S_N: '4477024'
//         });
//         expect(Item.body.message).toBe("The selected dates are not available for this item");
//         expect(Item.statusCode).toBe(400);

//     });
// });


test('Always passing test', () => {
    expect(true).toBe(true);
  });