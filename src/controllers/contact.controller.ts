import { Request, Express } from "express";
import Contact from "../models/contact.mongo";
import asyncHandler from "../middleware/tryCatch";
import { CustomError } from "../middleware/errors/CustomError";

interface ContactRequestBody {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}
interface CustomRequest extends Request {
  body: ContactRequestBody;
}

export const contactData = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      throw new CustomError("All fields are required", 400);
    }
  }
);
