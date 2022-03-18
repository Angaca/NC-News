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
});
