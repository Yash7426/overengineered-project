const asyncHandler = require("express-async-handler");
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
  user?: any;
}
export const addComment = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    const body = req.body;
    // console.log(user)
    const { description, blogId } = body;
    // console.log(body)
    if (!description) {
      throw new Error("Please add some comment.");
    }
    const prisma = new PrismaClient();
    const newComment = await prisma.comments.create({
      data: {
        description: description,
        blogId: blogId,
        userId: user.id, // Assuming userId corresponds to an existing User in your database
      },
    });
    await prisma.user.update({
      where: { id: user.id },
      data: { Comments: { connect: { id: newComment.id } } },
    });
    // Get the blog by id
   
    // Add the comment to the blog's comments array


    // Save the blog
    // await prisma.blogs.update({
    //   id: blog.id,
    //   data: {
    //     comments: blog.comments,
    //   },
    // });

    return res.status(200).json(newComment);
  }
);
export const getComments = asyncHandler(async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  const comments = await prisma.comments.findMany();

  return res.status(200).json(comments);
});

export const getCommentsByBlogId =  asyncHandler(async (req: Request, res: Response) => {
  const {blogId} = req.body;
  const prisma = new PrismaClient();

  const comments = await prisma.comments.findMany({
    where: { blogId: blogId },
  });
  
  // Combine the fetched blog and comments
 

  return res.status(200).json({comments, message:"success"});
});

export const deleteComment = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    const commentId = req.params.commentId;
    console.log(commentId)
    console.log(user)
    if(!commentId){
      throw new Error(
        "Invalid Request."
      );
    }
    const prisma = new PrismaClient();

    // Check if the comment exists
    const existingBlog = await prisma.comments.findFirst({
      where: {
        id: commentId,
        userId: user.id, // Ensure the comment belongs to the logged-in user
      },
    });

    if (!existingBlog) {
      throw new Error(
        "Comment not found or you do not have permission to delete it."
      );
    }

    // Delete the blog
    await prisma.comments.delete({
      where: {
        id: commentId,
      },
    });

    return res.status(200).json({ message: "Comment deleted successfully." });
  }
);
