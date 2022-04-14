const request = require("supertest");
const app = require("../app");

describe("Ingredients", () => {
	describe("POST /ingredient", () => {
		it("----> 200", async () => {
			return request(app)
				.post("/api/ingredient")
				.set("Authorization", `Bearer ${token.admin}`)
				.send(["lasagne", "lait", "carotte", "boeuf"])
				.expect(200);
		});
	});
	describe("GET /ingredient", () => {
		it("----> array of all ingredients", async () => {
			return request(app)
				.get("/api/ingredient")
				.set("Authorization", `Bearer ${token.user}`)
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual(
						expect.arrayContaining([
							expect.objectContaining({
								id: expect.any(Number),
								name: expect.any(String),
							}),
						])
					);
				});
		});
		it("?search= ---> specific array of ingredients ordered", async () => {
			return request(app)
				.get("/api/ingredient?search=la")
				.set("Authorization", `Bearer ${token.user}`)
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual([
						{
							id: expect.any(Number),
							name: "lait",
						},
						{
							id: expect.any(Number),
							name: "lasagne",
						},
					]);
				});
		});
	});
	describe("PUT /ingredient", () => {
		it("----> ingredient name modified", async () => {
			return request(app)
				.put("/api/ingredient/1")
				.set("Authorization", `Bearer ${token.admin}`)
				.send({ name: "beurreEdited" })
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual({
						id: expect.any(Number),
						name: "beurreEdited",
					});
				});
		});
		it("----> 409 Conflict : ingredient already exist", async () => {
			return request(app)
				.put("/api/ingredient/2")
				.set("Authorization", `Bearer ${token.admin}`)
				.send({ name: "beurreEdited" })
				.expect(409);
		});
	});
});
