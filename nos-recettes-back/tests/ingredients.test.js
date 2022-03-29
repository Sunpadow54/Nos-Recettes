const request = require("supertest");
const app = require("../app");

describe("Ingredients", () => {
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
	});
	describe("POST /ingredient", () => {
		it("----> 200", async () => {
			return request(app)
				.post("/api/ingredient")
				.set("Authorization", `Bearer ${token.admin}`)
				.send(["lasagne", "carotte", "boeuf"])
				.expect(200);
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
					expect(response.body).toEqual({ name: "beurreEdited" });
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
