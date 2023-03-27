// GET/Posts/{id}: Retrieve information about a specific post

//PATCH /Posts/{id}: Update information about a specific post
//DELETE /Posts/{id}: Delete a specific post

import prisma from "@/database";

export default async function handler(req, res) {
  const { postId } = req.query;

  switch (req.method) {
    case "GET":
      const post = await prisma.post.findUnique({
        where: { id: Number(postId) },
        include: { user: true },
      });
      if (!post) {
        res.status(404).json({ message: "Post not found" });
        break;
      }
      res.status(200).json(post);
      break;
    case "PUT":
      const { title, content } = req.body;
      if (!title) {
        res.status(400).json({ message: "Missing post title" });
        break;
      }
      const updatedPost = await prisma.post.update({
        where: { id: Number(postId) },
        data: { title, content },
        include: { user: true },
      });
      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
        break;
      }
      res.status(200).json(updatedPost);
      break;
    case "DELETE":
      // Delete a post by id
      await prisma.post.delete({
        where: { id: Number(postId) },
      });
      res.status(204).end();
      break;
    default:
      res.status(405).end();
  }
}
