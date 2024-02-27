import express from "express";

import { people } from "../data/people.json";

const app = express();
app.use(express.json());

app.get("/people", (_req, res) => res.json(people));

app.post("/people", (req, res) => {
  const newPerson = req.body;
  people.push(newPerson);
  return res.json(newPerson);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
