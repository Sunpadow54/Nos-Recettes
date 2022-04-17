const request = require("supertest");
const app = require("../app");

describe("Recipes", () => {
	// Create
	describe("POST /recipe", () => {
		it("----> created recipe", async () => {
			return request(app)
				.post("/api/recipe")
				.set("Authorization", `Bearer ${token.user}`)
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
	});
	// get All recipes
	describe("GET /recipe", () => {
		it("---> array of all recipes", async () => {
			return request(app)
				.get("/api/recipe")
				.set("Authorization", `Bearer ${token.user}`)
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
		it("?params ---> specific array of recipes", async () => {
			return request(app)
				.get("/api/recipe?category=plat")
				.set("Authorization", `Bearer ${token.user}`)
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
		it("?params ---> specific array of recipes from ingredient id", async () => {
			return request(app)
				.get("/api/recipe?ingredient=1")
				.set("Authorization", `Bearer ${token.user}`)
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
		it("?params ---> specific array of recipes from ingredient id AND other param ", async () => {
			return request(app)
				.get("/api/recipe?ingredient=1&category=plat")
				.set("Authorization", `Bearer ${token.user}`)
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
	});
	// get One recipes
	describe("GET /recipe/id ", () => {
		it("----> specific recipe by Id", async () => {
			return request(app)
				.get(`/api/recipe/1`)
				.set("Authorization", `Bearer ${token.user}`)
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
		it("----> 404 if not found", async () => {
			return request(app)
				.get("/api/recipe/99999999")
				.set("Authorization", `Bearer ${token.user}`)
				.expect(404);
		});
	});
	// Edit
	describe("PUT /recipe/id", () => {
		it("----> edited recipe", async () => {
			return request(app)
				.put(`/api/recipe/${idRecipe}`)
				.set("Authorization", `Bearer ${token.user}`)
				.send({
					title: "titre de la recette edited",
					preparation: ["étape1blablab", "étape2 : edit", "edit end"],
					ingredients: [
						["concombres", 2, "gros"],
						["lasagne", 3, "boite"],
						["tomates", 4, "grosses"],
						["beurre", 20, "g"],
					],
				})
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual({
						title: "titre de la recette edited",
						preparation: [
							"étape1blablab",
							"étape2 : edit",
							"edit end",
						],
						ingredients: [
							{ name: "concombres", quantity: 2, unit: "gros" },
							{ name: "lasagne", quantity: 3, unit: "boite" },
							{ name: "tomates", quantity: 4, unit: "grosses" },
							{ name: "beurre", quantity: 20, unit: "g" },
						],
					});
				});
		});
		it("----> edited recipe only ingredients", async () => {
			return request(app)
				.put(`/api/recipe/${idRecipe}`)
				.set("Authorization", `Bearer ${token.user}`)
				.send({
					ingredients: [
						["concombres", 2, "gros"],
						["lasagne", 3, "boite"],
						["tomates", 4, "grosses"],
					],
				})
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual({
						ingredients: [
							{ name: "concombres", quantity: 2, unit: "gros" },
							{ name: "lasagne", quantity: 3, unit: "boite" },
							{ name: "tomates", quantity: 4, unit: "grosses" },
						],
					});
				});
		});
		it("----> edited recipe without ingredients", async () => {
			return request(app)
				.put(`/api/recipe/${idRecipe}`)
				.set("Authorization", `Bearer ${token.user}`)
				.send({
					title: "titre de la recette edited3",
				})
				.expect(200)
				.then((response) => {
					expect(response.body).toEqual({
						title: "titre de la recette edited3",
					});
				});
		});
		it("----> edited recipe by Admin", async () => {
			return request(app)
				.put(`/api/recipe/${idRecipe}`)
				.set("Authorization", `Bearer ${token.admin}`)
				.send({
					title: "titre de la recette edited3",
				})
				.expect(200);
		});
		it("----> 401 Unauthorized", async () => {
			return request(app)
				.put(`/api/recipe/${idRecipe}`)
				.set("Authorization", `Bearer ${token.otherUser}`)
				.send({
					title: "titre de la recette edited trial",
				})
				.expect(401);
		});
	});
	// Delete
	describe("DELETE /recipe/id", () => {
		it("----> 401 Unauthorized", async () => {
			return request(app)
				.delete(`/api/recipe/${idRecipe}`)
				.set("Authorization", `Bearer ${token.otherUser}`)
				.send({
					password: "password",
				})
				.expect(401);
		});
		it("----> delete recipe", async () => {
			return request(app)
				.delete(`/api/recipe/${idRecipe}`)
				.set("Authorization", `Bearer ${token.user}`)
				.send({
					password: "password",
				})
				.expect(200);
		});
	});
});
