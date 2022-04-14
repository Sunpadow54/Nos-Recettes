const request = require("supertest");
const app = require("../app");

describe("Ingredients", () => {
	describe("POST /ingredient", () => {
		it("----> 200", async () => {
			return request(app)
				.post("/api/ingredient")
				.set("Authorization", `Bearer ${token.admin}`)
				.send(["ingr1", "ingr2", "lait", "lasagne"])
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
		it("----> ingredient modified (name + id)", async () => {
			return request(app)
				.put("/api/ingredient/1")
				.set("Authorization", `Bearer ${token.admin}`)
				.send({ name: "edited" })
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual({
						id: expect.any(Number),
						name: "edited",
					});
				});
		});
		it("----> 409 Conflict : ingredient already exist", async () => {
			return request(app)
				.put("/api/ingredient/2")
				.set("Authorization", `Bearer ${token.admin}`)
				.send({ name: "edited" })
				.expect(409);
		});
	});
	describe("DELETE /ingredient/id", () => {
		it("----> 409 Conflict : ingredient is used", async () => {
			// create a dump recipe with ingredient when wants to delete
			await request(app)
				.post("/api/recipe")
				.set("Authorization", `Bearer ${token.user}`)
				.send({
					title: "test ingr",
					duration: "00:00",
					preparation: ["step1", "step2"],
					img: "url",
					category: "plat",
					ingredients: [["edited", 3, "g"]],
				})
				.expect(201);

			return request(app)
				.delete("/api/ingredient/1")
				.set("Authorization", `Bearer ${token.admin}`)
				.expect(409);
		});
		it("----> 200 success : id and name of ingredient deleted", async () => {
			return request(app)
				.delete("/api/ingredient/2")
				.set("Authorization", `Bearer ${token.admin}`)
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual({ id: 2, name: "ingr2" });
				});
		});
	});
});
