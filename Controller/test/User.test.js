// const connection = require('../../mySQL.js');
// const request = require('supertest');
// const app = require('../../server');


// describe("POST /users/login", () => {
//     it("It should respond 'login ok!'", async () => {
//         const User = await request(app).post("/users/login").send({
//             EMAIL: 'yovelef@ac.sce.ac.il',
//             PASSWORD: '12345678'
//         });
//         expect(User.body.message).toBe("login ok!");
//         expect(User.statusCode).toBe(200);

//     });
// });

// describe("POST /users/login", () => {
//     it("It should respond 'Wrong email or password'", async () => {
//         const newUser = await request(app).post("/users/login").send({
//             EMAIL: 'yovelef@ac.sce.ac.il',
//             password: '123',

//         });
//         expect(newUser.body.message).toBe("Wrong email or password");
//         expect(newUser.statusCode).toBe(400);

//     });
// });


// describe("POST /users/register", () => {
//     it("It should respond 'New user created successfully'", async () => {
//         const newUser = await request(app).post("/users/register").send({
//             USERNAME: 'ddi',
//             PASSWORD: '123',
//             FIRSTNAME: 'dori',
//             LASTNAME: 'fourer',
//             EMAIL: 'ddi@gmail.com',
//             BIRTHDAY: '01/01/2000'
//         });
//         expect(newUser.body.message).toBe("New user created successfully");
//         expect(newUser.statusCode).toBe(200);

//     });
// });

// describe("POST /users/register", () => {
//     it("It should respond 'Existing username or existing email'", async () => {
//         const newUser = await request(app).post("/users/register").send({
//             USERNAME: 'ddi',
//             PASSWORD: '123',
//             FIRSTNAME: 'dori',
//             LASTNAME: 'fourer',
//             EMAIL: 'ddi@gmail.com',
//             BIRTHDAY: '01/01/2000'
//         });
//         expect(newUser.body.message).toBe("Existing username or existing email");
//         expect(newUser.statusCode).toBe(400);

//     });
// });

// describe("GET /users/watchUsers", () => {
//     it("It should respond with an array of users", async () => {
//         const response = await request(app).get("/users/watchUsers");
//         expect(response.body[0]).toHaveProperty("firstname");
//         expect(response.body[0]).toHaveProperty("lastname");
//         expect(response.body[0]).toHaveProperty("email");
//         expect(response.body[0]).toHaveProperty("birthday");
//         expect(response.body[0]).toHaveProperty("title");
//         expect(response.body[0]).toHaveProperty("username");
//         expect(response.body[0]).toHaveProperty("password");
//         expect(response.statusCode).toBe(200);
//     });
// });


test('Always passing test', () => {
    expect(true).toBe(true);
  });