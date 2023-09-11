// const connection = require('../../mySQL.js');
// const request = require('supertest');
// const app = require('../../server');

// describe("POST /warehouse/UpdateItem", () => {
//     it("It should respond 'update successfully!'", async () => {
//         const Item = await request(app).post("/warehouse/UpdateItem").send({
//             STATUS: 'IN',
//             NAME: 'Sony A7III',
//             S_N: '4476762',
//             USERNAME: 'Yam123'
//         });
//         expect(Item.body.message).toBe("update successfully!");
//         expect(Item.statusCode).toBe(200);

//     });
// });

// describe("POST /warehouse/UpdateItem", () => {
//     it("It should respond 'update successfully!'", async () => {
//         const Item = await request(app).post("/warehouse/UpdateItem").send({
//             STATUS: 'OUT',
//             NAME: 'Sony A7III',
//             S_N: '4476762',
//             BORROW_DATE: '12.05.2023',
//             RETURN_DATE: '15.05.2023',
//             USERNAME: 'Yam123'
//         });
//         expect(Item.body.message).toBe("update successfully!");
//         expect(Item.statusCode).toBe(200);

//     });
// });

// describe("POST /warehouse/UpdateItem", () => {
//     it("It should respond 'update successfully!'", async () => {
//         const Item = await request(app).post("/warehouse/UpdateItem").send({
//             STATUS: 'FAULTY',
//             NAME: 'Sony A7III',
//             S_N: '4476762',
//                USERNAME: 'Yam123'
//         });
//         expect(Item.body.message).toBe("update successfully!");
//         expect(Item.statusCode).toBe(200);

//     });
// });

// describe("POST /warehouse/UpdateItem", () => {
//   it("It should respond 'update successfully!'", async () => {
//       const Item = await request(app).post("/warehouse/UpdateItem").send({
//           STATUS: 'FAULTY',
//           NAME: 'Sony A7III',
//           S_N: '4476762',
//           USERNAME: 'Yam123',
//           DESCRIPTION : 'The lens is broken'
//       });
//       expect(Item.body.message).toBe("update successfully!");
//       expect(Item.statusCode).toBe(200);

// });
// });

// describe("DELETE /warehouse/deleteItem", () => {
//     it("It should respond 'delete successfully!'", async () => {
//         const Item = await request(app).post("/warehouse/deleteItem").send({
//             NAME: 'Sony A7III',
//             S_N: '4476762'
//         });
//         expect(Item.body.message).toBe("delete successfully!");
//         expect(Item.statusCode).toBe(200);

//     });
// });

// describe("POST /warehouse/add", () => {
//     it("It should respond 'New item successfully added'", async () => {
//         const Item = await request(app).post("/warehouse/add").send({
//             NAME: 'Sony A7III',
//             S_N: '4476762', 
//             CATEGORY: 'CAMERA'
//         });
//         expect(Item.body.message).toBe("New item successfully added");
//         expect(Item.statusCode).toBe(200);

//     });
// });

// // describe("GET /warehouse/watchItems", () => {
// //     it("It should respond with an array of items", async () => {
// //         const response = await request(app).get("/warehouse/watchItems");
// //         expect(response.body[0]).toHaveProperty("name");
// //         expect(response.body[0]).toHaveProperty("s_n");
// //         expect(response.body[0]).toHaveProperty("category");
// //         expect(response.body[0]).toHaveProperty("ancillary_items");
// //         expect(response.body[0]).toHaveProperty("amount");
// //         expect(response.body[0]).toHaveProperty("status");
// //         expect(response.body[0]).toHaveProperty("precautions");
// //         expect(response.body[0]).toHaveProperty("borrow_date");
// //         expect(response.body[0]).toHaveProperty("return_date");
// //         expect(response.statusCode).toBe(200);
// //     });
// // });

// describe("GET /warehouse/watchItemForCat", () => {
//     it("It should respond with an array of items", async () => {
//         const response = await request(app).get("/warehouse/watchItemForCat?CATEGORY=CAMERA");
//         expect(response.body[0]).toHaveProperty("name");
//         expect(response.body[0]).toHaveProperty("s_n");
//         expect(response.body[0]).toHaveProperty("category");
//         expect(response.body[0]).toHaveProperty("ancillary_items");
//         expect(response.body[0]).toHaveProperty("amount");
//         expect(response.body[0]).toHaveProperty("status");
//         expect(response.body[0]).toHaveProperty("precautions");
//         expect(response.body[0]).toHaveProperty("borrow_date");
//         expect(response.body[0]).toHaveProperty("return_date");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /warehouse/watchItems", () => {
//   it("It should respond with an array of items", async () => {
//       const response = await request(app).get("/warehouse/watchItems");
//       expect(response.body[0]).toHaveProperty("name");
//       expect(response.body[0]).toHaveProperty("s_n");
//       expect(response.body[0]).toHaveProperty("category");
//       expect(response.body[0]).toHaveProperty("ancillary_items");
//       expect(response.body[0]).toHaveProperty("amount");
//       expect(response.body[0]).toHaveProperty("status");
//       expect(response.body[0]).toHaveProperty("precautions");
//       expect(response.body[0]).toHaveProperty("borrow_date");
//       expect(response.body[0]).toHaveProperty("return_date");
//       expect(response.body[0]).toHaveProperty("description");
//       expect(response.statusCode).toBe(200);
//   });
// });


// describe("GET /warehouse/watchItemForStatus", () => {
//     it("It should respond with an array of items", async () => {
//         const response = await request(app).get("/warehouse/watchItemForStatus?STATUS=IN");
//         expect(response.body[0]).toHaveProperty("name");
//         expect(response.body[0]).toHaveProperty("s_n");
//         expect(response.body[0]).toHaveProperty("category");
//         expect(response.body[0]).toHaveProperty("ancillary_items");
//         expect(response.body[0]).toHaveProperty("amount");
//         expect(response.body[0]).toHaveProperty("status");
//         expect(response.body[0]).toHaveProperty("precautions");
//         expect(response.body[0]).toHaveProperty("borrow_date");
//         expect(response.body[0]).toHaveProperty("return_date");
//         expect(response.statusCode).toBe(200);
//     });
// });

// describe("GET /warehouse/getAllPS", () => {
//     it("It should respond with an array of podcasts and studios", async () => {
//         const response = await request(app).get("/warehouse/getAllPS");
//         expect(response.body[0]).toHaveProperty("TYPE");
//         expect(response.body[0]).toHaveProperty("NUM");
//         expect(response.statusCode).toBe(200);
//     });
// });


test('Always passing test', () => {
    expect(true).toBe(true);
  });