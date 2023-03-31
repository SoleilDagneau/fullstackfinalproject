// GET / Posts: Retrieve a list of posts
// POST / Posts: Create a new Post
import { prisma } from "@/server/db/client";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const posts = await prisma.Post.findMany();
      res.status(200).json(posts);
      break;
    case "POST":

    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
  
    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    })
  
    if (!prismaUser) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const userId = prismaUser.id; 

    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({ message: "Missing required fields" });
        break;
    }
    const newPost = await prisma.Post.create({
        data: { title, content, userId },
    });
    res.status(201).json(newPost);
    break;
    default:
      res.status(405).end();
  }
}