export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  students: number;
  instructor: instructor;
  enrollmentStatus: "Open" | "Closed" | "In Progress";
  thumbnail: string;
  duration: number;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: SyllabusItem[];
  isEnrolled?: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface instructor {
  name: string;
  title: string;
  avatar: string;
  bio: string;
}
export interface SyllabusItem {
  week: number;
  topic: string;
  content: string;
}

export interface Enrollment {
  course: Course;
  progress: ProgressItem[];
}

export interface ProgressItem {
  week: number;
  completed: boolean;
}
