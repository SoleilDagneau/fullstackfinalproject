// GET / Posts: Retrieve a list of posts
// POST / Posts: Create a new Post

import prisma from "@/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      // Get all posts
      const posts = await prisma.post.findMany({
        include: {
          user: true,
        },
      });
      res.status(200).json(posts);
      break;
    case "POST":
      // Create a new post
      const { title, content, userId } = req.body;
      if (!title || !userId) {
        res.status(400).json({ message: "Missing title or user id" });
        break;
      }
      const newPost = await prisma.post.create({
        data: { title, content, userId },
        include: {
          user: true,
        },
      });
      res.status(201).json(newPost);
      break;
    default:
      res.status(405).end();
  }
}
