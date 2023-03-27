//GET /posts/{id}/comments: Retrieve a list of comments in a specific post
//POST /posts/{id}/comments: Create a new comment in a specific post

import { getAllComments, createComment } from "@/database";

export default async function handler(req, res) {
  const { postId } = req.query;

  switch (req.method) {
    case "GET":
      // Get all comments for a post
      const comments = await getAllComments(postId);
      res.status(200).json(comments);
      break;
    case "POST":
      // Create a new comment
      const { content, userId } = req.body;
      if (!content || !userId) {
        res.status(400).json({ message: "Missing comment content or user id" });
        break;
      }
      const newComment = await createComment(content, postId, userId);
      res.status(201).json(newComment);
      break;
    default:
      res.status(405).end();
  }
}
