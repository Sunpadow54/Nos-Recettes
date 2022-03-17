const request = require("supertest");
const app = require("../app");

describe("Auth", () => {
	describe("requests without Bearer token", () => {
		it("---> 401 Unauthorized", async () => {
			const req = request(app);
			return Promise.all([
				req.get("/api/recipe").expect(401),
				req.get("/api/recipe/3").expect(401),
				req.post("/api/recipe").expect(401),
				req.put("/api/recipe/3").expect(401),
				req.delete("/api/recipe/3").expect(401),
				req.get("/api/user/2").expect(401),
				req.delete("/api/user/2").expect(401),
			]);
		});
	});
});
