import { Router } from "express";
import { login } from "../controllers/login";


export const router = Router();

router.use(`/auth/login`, login)