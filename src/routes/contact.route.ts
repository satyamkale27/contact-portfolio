import { Router } from "express";
import { contactData } from "../controllers/contact.controller";
const contactRouter = Router();

contactRouter.post("/contact", contactData);

export default contactRouter;
