const request = require("supertest");
const app = require("../app");

describe("Auth", () => {
	describe("POST /login (no Bearer needed)", () => {
		it("---> token + userId + username + isAdmin + isActive", async () => {
			return request(app)
				.post("/api/auth/login")
				.send({
					username: "admin",
					password: "password",
				})
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual({
						id: expect.any(Number),
						token: expect.any(String),
						username: expect.any(String),
						isActive: expect.any(Boolean),
						isAdmin: expect.any(Boolean),
					});
				});
		});
		it("---> 404 Not Found", async () => {
			return request(app)
				.post("/api/auth/login")
				.send({
					username: "false username",
					password: "password",
				})
				.expect(404);
		});
		it("---> 401 Unauthorized", async () => {
			return request(app)
				.post("/api/auth/login")
				.send({
					username: "admin",
					password: "wrong password",
				})
				.expect(401);
		});
	});
	describe("requests without Bearer token", () => {
		it("---> 401 Unauthorized", async () => {
			const req = request(app);
			return Promise.all([
				// recipe
				req.get("/api/recipe").expect(401),
				req.get("/api/recipe/3").expect(401),
				req.post("/api/recipe").expect(401),
				req.put("/api/recipe/3").expect(401),
				req.delete("/api/recipe/3").expect(401),
				// user
				req.get("/api/user/2").expect(401),
				req.post("/api/user/create").expect(401),
				req.put("/api/user/2").expect(401),
				req.delete("/api/user/2").expect(401),
				// ingredient
				req.get("/api/ingredient").expect(401),
			]);
		});
	});
});
