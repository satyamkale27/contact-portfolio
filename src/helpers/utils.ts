import { CustomError } from "../middleware/errors/CustomError";
import Contact from "../models/contact.mongo";

export const checkMessageExists = async (email: string) => {
  const message = await Contact.findOne({ email });

  if (message) {
    if (message.email == email) {
      throw new CustomError("Meesage Already exists", 409);
    }
  }
};
