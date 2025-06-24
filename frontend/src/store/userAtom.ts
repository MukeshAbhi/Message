import { atom } from "jotai";
import type { User } from "../types";


const storedUser = localStorage.getItem("user");

const parsedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

export const userAtom = atom<User | null>(parsedUser);