export interface Question {
  id: string;
  correctAnswer: number;
}

export interface Test {
  id: string;
  subject: string;
  timeLimit: number;
  difficulty: "easy" | "medium" | "hard";
  questions: Question[];
}

export const tests: Test[] = [
  { id: "math-1",   subject: "math",      timeLimit: 15, difficulty: "easy",   questions: Array.from({length:10},(_,i)=>({id:`m1q${i+1}`,  correctAnswer:[1,0,0,1,2,1,2,2,0,0][i]})) },
  { id: "math-2",   subject: "math",      timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`m2q${i+1}`,  correctAnswer:[1,2,1,1,2,3,1,1,0,0][i]})) },
  { id: "math-3",   subject: "math",      timeLimit: 12, difficulty: "easy",   questions: Array.from({length:10},(_,i)=>({id:`m3q${i+1}`,  correctAnswer:[1,0,1,1,0,1,0,2,1,0][i]})) },
  { id: "math-4",   subject: "math",      timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`m4q${i+1}`,  correctAnswer:[1,2,2,2,0,1,2,2,1,1][i]})) },
  { id: "math-5",   subject: "math",      timeLimit: 20, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`m5q${i+1}`,  correctAnswer:[1,1,0,0,2,2,1,1,1,1][i]})) },
  { id: "math-6",   subject: "math",      timeLimit: 20, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`m6q${i+1}`,  correctAnswer:[1,1,1,2,1,2,2,1,1,2][i]})) },
  { id: "math-7",   subject: "math",      timeLimit: 20, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`m7q${i+1}`,  correctAnswer:[0,1,2,2,1,1,1,2,1,1][i]})) },
  { id: "math-8",   subject: "math",      timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`m8q${i+1}`,  correctAnswer:[1,2,1,1,1,2,1,2,1,1][i]})) },
  { id: "math-9",   subject: "math",      timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`m9q${i+1}`,  correctAnswer:[1,0,1,0,0,1,1,2,1,0][i]})) },
  { id: "math-10",  subject: "math",      timeLimit: 20, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`m10q${i+1}`, correctAnswer:[1,2,1,0,2,2,1,2,1,1][i]})) },
  { id: "phys-1",   subject: "physics",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`p1q${i+1}`,  correctAnswer:[1,2,0,1,1,1,2,1,2,2][i]})) },
  { id: "phys-2",   subject: "physics",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`p2q${i+1}`,  correctAnswer:[2,1,1,1,1,2,1,2,2,2][i]})) },
  { id: "phys-3",   subject: "physics",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`p3q${i+1}`,  correctAnswer:[1,2,0,0,2,1,2,1,1,1][i]})) },
  { id: "phys-4",   subject: "physics",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`p4q${i+1}`,  correctAnswer:[1,1,1,1,3,1,1,2,2,2][i]})) },
  { id: "phys-5",   subject: "physics",   timeLimit: 15, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`p5q${i+1}`,  correctAnswer:[2,0,0,1,2,0,3,1,1,2][i]})) },
  { id: "phys-6",   subject: "physics",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`p6q${i+1}`,  correctAnswer:[1,1,1,2,0,1,1,1,2,2][i]})) },
  { id: "phys-7",   subject: "physics",   timeLimit: 15, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`p7q${i+1}`,  correctAnswer:[1,1,0,1,2,0,1,2,1,1][i]})) },
  { id: "phys-8",   subject: "physics",   timeLimit: 12, difficulty: "easy",   questions: Array.from({length:10},(_,i)=>({id:`p8q${i+1}`,  correctAnswer:[1,2,1,1,1,2,2,2,1,1][i]})) },
  { id: "chem-1",   subject: "chemistry", timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`c1q${i+1}`,  correctAnswer:[1,2,2,1,2,3,1,0,2,1][i]})) },
  { id: "chem-2",   subject: "chemistry", timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`c2q${i+1}`,  correctAnswer:[1,1,1,0,1,1,1,2,1,1][i]})) },
  { id: "chem-3",   subject: "chemistry", timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`c3q${i+1}`,  correctAnswer:[1,2,2,2,1,1,1,1,2,2][i]})) },
  { id: "chem-4",   subject: "chemistry", timeLimit: 15, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`c4q${i+1}`,  correctAnswer:[1,1,2,1,2,1,1,1,1,1][i]})) },
  { id: "chem-5",   subject: "chemistry", timeLimit: 15, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`c5q${i+1}`,  correctAnswer:[1,1,2,2,1,2,1,2,1,1][i]})) },
  { id: "chem-6",   subject: "chemistry", timeLimit: 15, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`c6q${i+1}`,  correctAnswer:[1,1,1,2,2,1,2,1,1,1][i]})) },
  { id: "bio-1",    subject: "biology",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`b1q${i+1}`,  correctAnswer:[2,1,2,2,1,2,1,2,1,1][i]})) },
  { id: "bio-2",    subject: "biology",   timeLimit: 20, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`b2q${i+1}`,  correctAnswer:[0,1,2,1,1,1,1,1,1,1][i]})) },
  { id: "bio-3",    subject: "biology",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`b3q${i+1}`,  correctAnswer:[2,1,1,2,1,1,1,1,2,2][i]})) },
  { id: "bio-4",    subject: "biology",   timeLimit: 15, difficulty: "easy",   questions: Array.from({length:10},(_,i)=>({id:`b4q${i+1}`,  correctAnswer:[1,1,2,1,1,2,0,1,1,2][i]})) },
  { id: "bio-5",    subject: "biology",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`b5q${i+1}`,  correctAnswer:[2,1,1,2,2,1,1,2,2,2][i]})) },
  { id: "bio-6",    subject: "biology",   timeLimit: 12, difficulty: "easy",   questions: Array.from({length:10},(_,i)=>({id:`b6q${i+1}`,  correctAnswer:[2,1,1,1,1,1,2,1,1,1][i]})) },
  { id: "hist-1",   subject: "history",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`h1q${i+1}`,  correctAnswer:[2,1,2,0,2,2,1,1,1,2][i]})) },
  { id: "hist-2",   subject: "history",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`h2q${i+1}`,  correctAnswer:[1,2,2,1,1,2,1,0,1,0][i]})) },
  { id: "hist-3",   subject: "history",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`h3q${i+1}`,  correctAnswer:[1,1,1,1,1,1,1,2,1,2][i]})) },
  { id: "hist-4",   subject: "history",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`h4q${i+1}`,  correctAnswer:[1,2,2,3,1,1,1,2,1,1][i]})) },
  { id: "hist-5",   subject: "history",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`h5q${i+1}`,  correctAnswer:[2,1,1,2,2,1,2,2,1,1][i]})) },
  { id: "hist-6",   subject: "history",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`h6q${i+1}`,  correctAnswer:[1,1,1,1,2,1,1,2,1,1][i]})) },
  { id: "eng-1",    subject: "english",   timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`e1q${i+1}`,  correctAnswer:[1,1,2,3,2,2,2,2,2,2][i]})) },
  { id: "eng-2",    subject: "english",   timeLimit: 12, difficulty: "easy",   questions: Array.from({length:10},(_,i)=>({id:`e2q${i+1}`,  correctAnswer:[2,0,3,1,2,2,2,1,2,2][i]})) },
  { id: "eng-3",    subject: "english",   timeLimit: 15, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`e3q${i+1}`,  correctAnswer:[1,2,3,2,3,1,1,2,2,1][i]})) },
  { id: "eng-4",    subject: "english",   timeLimit: 12, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`e4q${i+1}`,  correctAnswer:[2,0,2,2,3,2,1,1,1,2][i]})) },
  { id: "eng-5",    subject: "english",   timeLimit: 15, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`e5q${i+1}`,  correctAnswer:[2,2,1,2,1,2,1,1,0,2][i]})) },
  { id: "eng-6",    subject: "english",   timeLimit: 12, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`e6q${i+1}`,  correctAnswer:[1,2,1,2,1,2,1,1,1,1][i]})) },
  { id: "cs-1",     subject: "cs",        timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`cs1q${i+1}`, correctAnswer:[1,1,1,1,1,1,1,1,1,1][i]})) },
  { id: "cs-2",     subject: "cs",        timeLimit: 12, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`cs2q${i+1}`, correctAnswer:[1,0,1,1,2,1,1,1,0,1][i]})) },
  { id: "cs-3",     subject: "cs",        timeLimit: 15, difficulty: "hard",   questions: Array.from({length:10},(_,i)=>({id:`cs3q${i+1}`, correctAnswer:[1,2,0,1,2,1,1,2,2,1][i]})) },
  { id: "cs-4",     subject: "cs",        timeLimit: 12, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`cs4q${i+1}`, correctAnswer:[1,1,1,1,2,1,1,1,1,1][i]})) },
  { id: "cs-5",     subject: "cs",        timeLimit: 12, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`cs5q${i+1}`, correctAnswer:[1,1,1,1,1,1,1,1,1,1][i]})) },
  { id: "cs-6",     subject: "cs",        timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`cs6q${i+1}`, correctAnswer:[0,1,2,2,1,2,0,1,1,2][i]})) },
  { id: "geo-1",    subject: "geography", timeLimit: 15, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`g1q${i+1}`,  correctAnswer:[1,2,2,3,2,2,1,3,1,1][i]})) },
  { id: "geo-2",    subject: "geography", timeLimit: 12, difficulty: "easy",   questions: Array.from({length:10},(_,i)=>({id:`g2q${i+1}`,  correctAnswer:[2,2,3,1,2,1,3,2,2,1][i]})) },
  { id: "geo-3",    subject: "geography", timeLimit: 12, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`g3q${i+1}`,  correctAnswer:[1,1,0,1,2,1,1,1,2,1][i]})) },
  { id: "geo-4",    subject: "geography", timeLimit: 12, difficulty: "medium", questions: Array.from({length:10},(_,i)=>({id:`g4q${i+1}`,  correctAnswer:[1,2,1,2,2,2,1,1,1,1][i]})) },
];

export const getTestById = (id: string) => tests.find((t) => t.id === id);
export const subjects = [...new Set(tests.map((t) => t.subject))];
