const request = require("supertest");
const app = require("../app");

describe("Users", () => {
	describe("POST /user/create", () => {
		it("---> user created", async () => {
			return request(app)
				.post("/api/user/create")
				.set("Authorization", `Bearer ${token}`)
				.send({
					username: "usernameTest",
					email: "example@email.truc",
					password: "1Azer",
					lastname: "lastnameTest",
					firstname: "firstnameTest",
				})
				.expect(201);
		});
		it("---> 409 Conflict : email already exist", async () => {
			return request(app)
				.post("/api/user/create")
				.set("Authorization", `Bearer ${token}`)
				.send({
					username: "usernameTest2",
					email: "example@email.truc",
					password: "1Azer",
					lastname: "lastnameTest2",
					firstname: "firstnameTest2",
				})
				.expect(409);
		});
		it("---> 409 Conflict : username already exist", async () => {
			return request(app)
				.post("/api/user/create")
				.set("Authorization", `Bearer ${token}`)
				.send({
					username: "usernameTest",
					email: "example2@email.truc",
					password: "1Azer",
					lastname: "lastnameTest2",
					firstname: "firstnameTest2",
				})
				.expect(409);
		});
	});

	describe("GET /user/id", () => {
		it("---> one user without email", async () => {
			return request(app)
				.get("/api/user/2")
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual(
						expect.objectContaining({
							username: expect.any(String),
							lastname: expect.any(String),
							firstname: expect.any(String),
							nbrRecipes: expect.any(Number),
						})
					);
					expect(response.body).toEqual(
						expect.not.objectContaining({
							email: expect.anything(),
						})
					);
				});
		});
		it("---> current user with email", async () => {
			return request(app)
				.get("/api/user/1")
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual(
						expect.objectContaining({
							username: expect.any(String),
							email: expect.any(String),
							lastname: expect.any(String),
							firstname: expect.any(String),
							nbrRecipes: expect.any(Number),
						})
					);
				});
		});
		it("----> 404 if not found", async () => {
			return request(app)
				.get("/api/user/999999")
				.set("Authorization", `Bearer ${token}`)
				.expect(404);
		});
	});

	describe("DELETE /user/id", () => {
		it("---> delete user", async () => {
			return request(app)
				.delete("/api/user/2")
				.set("Authorization", `Bearer ${token}`)
				.expect(200);
		});
	});
});
