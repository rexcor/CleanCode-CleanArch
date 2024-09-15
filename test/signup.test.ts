import { signup, getAccount } from "../src/signup";

test("Should create an account for the passenger", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true,
  };

  const outputSignup = await signup(input);
  expect(outputSignup.accountId).toBeDefined();
  const outputGetAccount = await getAccount(outputSignup.accountId);
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
});

test("Should create an account for the driver", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    carPlate: "AAA9999",
    isDriver: true,
  };

  const outputSignup = await signup(input);
  expect(outputSignup.accountId).toBeDefined();
  const outputGetAccount = await getAccount(outputSignup.accountId);
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
  expect(outputGetAccount.car_plate).toBe(input.carPlate);
});

test("Should not create a passenger account without name", async function () {
  const input = {
    name: "",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true,
  };

  const output = await signup(input);
  expect(output).toBe(-3);
});

test("Should not create a passenger account with invalid email", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}`,
    cpf: "97456321558",
    isPassenger: true,
  };

  const output = await signup(input);
  expect(output).toBe(-2);
});

test("Should not create a passenger account with invalid cpf", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "9999998888889993",
    isPassenger: true,
  };

  const output = await signup(input);
  expect(output).toBe(-1);
});

test("Should not create a passenger account that alredy exists", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true,
  };
  await signup(input);
  const output = await signup(input);
  expect(output).toBe(-4);
});

test("Should not create a driver account with invalid plate number", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    carPlate: "AAA999",
    isDriver: true,
  };
  const output = await signup(input);
  expect(output).toBe(-5);
});
