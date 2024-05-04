import { ProgressItem } from "../types/courseType";

export function percentageCal(progress: ProgressItem[]) {
  const completed = progress.filter((item) => item.completed).length;
  const length = progress.length;
  const percentage = Math.floor((Number(completed) / Number(length)) * 100);

  return percentage;
}
