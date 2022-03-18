const app = require("../app");
const db = require("../db/connection");
const request = require("supertest")(app);
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("NC-News", () => {
  it("404 - path not found", async () => {
    const {
      body: { msg },
    } = await request.get("/notAPath").expect(404);

    expect(msg).toBe("Path not found");
  });
  describe("Topics", () => {
    describe("GET", () => {
      it("200 - /api/topics ", async () => {
        const {
          body: { topics },
        } = await request.get("/api/topics").expect(200);

        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
    });
  });
  describe("Articles", () => {
    describe("GET", () => {
      it("200 - /api/articles/:article_id", async () => {
        const {
          body: { article },
        } = await request.get("/api/articles/1").expect(200);

        expect(article).toEqual(
          expect.objectContaining({
            author: "butter_bridge",
            title: "Living in the shadow of a great man",
            article_id: 1,
            body: "I find this existence challenging",
            topic: "mitch",
            created_at: expect.any(String),
            votes: 100,
          })
        );
      });
      it("400 - /api/articles/:invalid_article_id", async () => {
        const {
          body: { msg },
        } = await request.get("/api/articles/doggo").expect(400);

        expect(msg).toBe("Invalid Input");
      });
      it("404 - /api/articles/:valid_not_present_article_id", async () => {
        const {
          body: { msg },
        } = await request.get("/api/articles/9999").expect(404);

        expect(msg).toBe("Article not available");
      });
    });
    describe("PATCH", () => {
      it("200 - /api/articles/:article_id - Increment", async () => {
        const {
          body: { article },
        } = await request
          .patch("/api/articles/1")
          .expect(200)
          .send({ inc_votes: 1 });

        expect(article).toEqual(
          expect.objectContaining({
            author: "butter_bridge",
            title: "Living in the shadow of a great man",
            article_id: 1,
            body: "I find this existence challenging",
            topic: "mitch",
            created_at: expect.any(String),
            votes: 101,
          })
        );
      });
      it("200 - /api/articles/:article_id - Decrement", async () => {
        const {
          body: { article },
        } = await request
          .patch("/api/articles/1")
          .expect(200)
          .send({ inc_votes: -50 });

        expect(article).toEqual(
          expect.objectContaining({
            author: "butter_bridge",
            title: "Living in the shadow of a great man",
            article_id: 1,
            body: "I find this existence challenging",
            topic: "mitch",
            created_at: expect.any(String),
            votes: 50,
          })
        );
      });
      it("400 - /api/articles/:article_id - Malformed Body", async () => {
        const {
          body: { msg },
        } = await request.patch("/api/articles/1").expect(400).send();

        expect(msg).toBe("Malformed Body");
      });
      it("400 - /api/articles/:article_id - Invalid Increment", async () => {
        const {
          body: { msg },
        } = await request
          .patch("/api/articles/1")
          .expect(400)
          .send({ inc_votes: "inc_doggo" });

        expect(msg).toBe("Invalid Input");
      });
      it("400 - /api/articles/:article_id_not_present", async () => {
        const {
          body: { msg },
        } = await request
          .patch("/api/articles/1000000")
          .expect(404)
          .send({ inc_votes: 1 });

        expect(msg).toBe("Article not available");
      });
      it("404 - /api/articles/:article_id_invalid", async () => {
        const {
          body: { msg },
        } = await request
          .patch("/api/articles/doggo")
          .expect(400)
          .send({ inc_votes: 1 });

        expect(msg).toBe("Invalid Input");
      });
    });
  });
});
