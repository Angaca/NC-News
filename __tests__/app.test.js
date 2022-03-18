const app = require("../app");
const db = require("../db/connection");
const request = require("supertest")(app);
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("NC-News", () => {
  it("404-path not found", async () => {
    const {
      body: { msg },
    } = await request.get("/notAPath").expect(404);

    expect(msg).toBe("Path not found");
  });
  describe("Topics", () => {
    it("GET 200 /api/topics ", async () => {
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
  describe("Articles", () => {
    it("GET 200 /api/articles/:article_id", async () => {
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
    it("GET 400 /api/articles/:invalid_article_id", async () => {
      const {
        body: { msg },
      } = await request.get("/api/articles/doggo").expect(400);

      expect(msg).toBe("Invalid Input");
    });
    it("GET 404 /api/articles/:valid_not_present_article_id", async () => {
      const {
        body: { msg },
      } = await request.get("/api/articles/9999").expect(404);

      expect(msg).toBe("Article not available");
    });
  });
});
