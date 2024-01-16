import { difficultyType } from "./types";

export const difficultyValues = new Map<difficultyType, number>([
  ['Easy', 1],
  ['Medium', 1.5],
  ['Hard', 2]
]);

export const incrementValue = 0.1   // value by which difficulty factor increases after successful word