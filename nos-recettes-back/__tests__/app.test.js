const request = require("supertest");
const app = require("../app");
const db = require("../config/db-connect");
const jwToken = require("jsonwebtoken");

describe("Recipes", () => {
	// add token for all roads
	beforeAll(async () => {
		return (token = jwToken.sign({ userId: 1 }, process.env.TOKEN_KEY, {
			expiresIn: "24h",
		}));
	});

	// close db at the end
	afterAll(async () => {
		await db.end();
	});

	it("GET /recipes ---> array of recipes", () => {
		return request(app)
			.get("/api/recipe")
			.set("Authorization", `Bearer ${token}`)
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							id: expect.any(Number),
							id_user: expect.any(Number),
							date: expect.any(String),
							duration: expect.any(String),
							title: expect.any(String),
							img: expect.any(String || null),
							ingredients: expect.arrayContaining([
								expect.any(String),
							]),
						}),
					])
				);
			});
	});

	it("GET /recipes?params ---> array of recipes", () => {
		return request(app)
			.get("/api/recipe?category=plat")
			.set("Authorization", `Bearer ${token}`)
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							id: expect.any(Number),
							id_user: expect.any(Number),
							date: expect.any(String),
							duration: expect.any(String),
							title: expect.any(String),
							img: expect.any(String || null),
							ingredients: expect.arrayContaining([
								expect.any(String),
							]),
						}),
					])
				);
			});
	});

	it("POST /recipe ----> Recipe created", () => {
		return request(app)
			.post("/api/recipe")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "titre de la recette",
				duration: "00:45",
				preparation: ["étape1blablab", "étape2 : blablaba"],
				img: "https://images.unsplash.com/",
				category: "plat",
				ingredients: [
					["lasagne", 3, "boite"],
					["tomates", 4, "grosses"],
				],
			})
			.expect(201)
			.then((response) => {
				expect(response.body).toEqual({
					id: expect.any(Number),
				});
				idRecipe = response.body.id;
			});
	});

	it("GET /recipe/id ----> specific recipe by Id", () => {
		return request(app)
			.get(`/api/recipe/${idRecipe}`)
			.set("Authorization", `Bearer ${token}`)
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						author: expect.any(String),
						authorId: expect.any(Number),
						date: expect.any(String),
						duration: expect.any(String),
						title: expect.any(String),
						img: expect.any(String || null),
						category: expect.any(String),
						preparation: expect.arrayContaining([
							expect.any(String),
						]),
						ingredients: expect.arrayContaining([
							expect.objectContaining({
								name: expect.any(String),
								quantity: expect.any(Number),
								unit: expect.any(String),
							}),
						]),
					})
				);
			});
	});

	it("GET /recipe/id ----> 404 if not found", () => {
		return request(app)
			.get("/api/recipe/99999999")
			.set("Authorization", `Bearer ${token}`)
			.expect(404);
	});

	it("DELETE /recipe/id --> return deleted recipe id", () => {
		return request(app)
			.delete(`/api/recipe/${idRecipe}`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				password: "1Azer",
			})
			.expect(200);
	});
});
