import { Router } from "express";
const contactRouter = Router();

contactRouter.post("/contact", contact);

export default contactRouter;
