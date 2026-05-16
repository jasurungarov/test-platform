export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number;
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  description: string;
  timeLimit: number;
  difficulty: "Лёгкий" | "Средний" | "Сложный";
  questions: Question[];
}

export interface TestResult {
  studentName: string;
  testId: string;
  testTitle: string;
  subject: string;
  score: number;
  totalPoints: number;
  percentage: number;
  timeSpent: string;
  answers: number[];
  submittedAt: string;
}
