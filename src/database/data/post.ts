import type { Models } from "appwrite";

export type Post = {
  id: string;
  message: string;
  creator: string;
  date: number;
} & Models.Document