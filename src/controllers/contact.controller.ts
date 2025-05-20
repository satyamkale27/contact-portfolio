import { Request, Response } from "express";
import Contact from "../models/contact.mongo";
import asyncHandler from "../middleware/tryCatch";
import { CustomError } from "../middleware/errors/CustomError";
import { checkMessageExists } from "../helpers/utils";

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

    await checkMessageExists(email);

    const contactPayload = new Contact({
      fullName,
      email,
      subject,
      message,
    });

    await contactPayload.save();

    res
      .status(201)
      .json({ success: true, message: "message sent successfully" });
  }
);
