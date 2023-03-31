//GET /posts/{id}/comments: Retrieve a list of comments in a specific post
//POST /posts/{id}/comments: Create a new comment in a specific post

import { prisma } from "@/server/db/client";

export default async function handle(req, res) {
  const { method } = req;
 
  switch (method) {
    case "GET":
      // get all posts from the database
      const comments = await prisma.comment.findMany({
        where: {
          postId: parseInt(req.query.postid)
        }
      });
      // send the posts to the client
      res.status(200).json(comments);
      break;

      case "POST":
        const comment = await prisma.comment.create({
          data: {
            content: req.body.content,
            post: {
              connect: {
                id: parseInt(req.query.postid)
              }
            }
          }
        });
        res.status(201).json(post);
        break;      
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}