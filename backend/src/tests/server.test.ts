import request from "supertest";
import { describe, expect, it } from "@jest/globals";
import express, { Request, Response } from "express";

const app = express();
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

describe("GET /", () => {
  it("should return Hello, World!", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hello, World!");
  });
});
