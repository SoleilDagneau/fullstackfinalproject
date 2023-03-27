//GET /posts/{id}/comments/{comment_id}: Retrieve information about a specific comment

//PATCH /posts/{id}/comments/{comment_id}: Update information about a specific comment
//DELETE /posts/{id}/comment/{comment_id}: Delete a specific comment

import prisma from "@/database/prisma";

export default async function handler(req, res) {
  const { commentId } = req.query;

  switch (req.method) {
    case "GET":
      // Get a comment by ID
      const comment = await prisma.comment.findUnique({
        where: { id: Number(commentId) },
        include: { user: true, post: true },
      });
      if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }
      res.status(200).json(comment);
      break;

    case "PUT":
      // Update a comment by ID
      const { content } = req.body;
      if (!content) {
        res.status(400).json({ message: "Missing content" });
        return;
      }
      const updatedComment = await prisma.comment.update({
        where: { id: Number(commentId) },
        data: { content },
        include: { user: true, post: true },
      });
      res.status(200).json(updatedComment);
      break;

    case "DELETE":
      // Delete a comment by ID
      await prisma.comment.delete({ where: { id: Number(commentId) } });
      res.status(204).end();
      break;

    default:
      res.status(405).end();
  }
}
