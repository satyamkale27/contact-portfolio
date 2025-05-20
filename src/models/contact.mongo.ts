import mongoose, { Document, Schema } from "mongoose";

interface IContact extends Document {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const contactSchema: Schema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = mongoose.model<IContact>("Contact", contactSchema);
export default Contact;
