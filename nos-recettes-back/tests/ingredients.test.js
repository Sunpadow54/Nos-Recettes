const request = require("supertest");
const app = require("../app");

describe("Ingredients", () => {
	describe("GET /ingredient", () => {
		it("----> array of all ingredients", async () => {
			return request(app)
				.get("/api/ingredient")
				.set("Authorization", `Bearer ${token}`)
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual(
						expect.arrayContaining([expect.any(String)])
					);
				});
		});
	});
});
