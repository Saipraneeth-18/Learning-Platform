export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  thumbnail: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Module {
  id: string;
  title: string;
  type: 'reading' | 'video' | 'quiz';
  content: string;
  videoUrl?: string;
  duration?: string;
  questions?: Question[];
  completed?: boolean;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LiveClass {
  id: string;
  title: string;
  instructor: string;
  scheduledTime: string;
  duration: string;
  subject: string;
  isLive: boolean;
  streamUrl?: string;
}

export const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Mathematics Fundamentals',
    description: 'Basic mathematics concepts for rural students',
    thumbnail: '/api/placeholder/300/200',
    duration: '4 weeks',
    level: 'Beginner',
    modules: [
      {
        id: '1-1',
        title: 'Introduction to Numbers',
        type: 'reading',
        content: `# Introduction to Numbers

Numbers are the foundation of mathematics. In this module, we'll explore:

## What are Numbers?
Numbers are symbols used to represent quantities. They help us count, measure, and calculate.

## Types of Numbers:
1. **Natural Numbers**: 1, 2, 3, 4, 5...
2. **Whole Numbers**: 0, 1, 2, 3, 4...
3. **Integers**: ...-2, -1, 0, 1, 2...

## Why Numbers Matter
Numbers are everywhere in our daily lives:
- Counting livestock
- Measuring crops
- Managing money
- Telling time

Understanding numbers helps us make better decisions and solve problems in our community.

## Practice Examples
- If you have 5 goats and buy 3 more, how many goats do you have? (5 + 3 = 8)
- If you sell 2 goats from your 8 goats, how many remain? (8 - 2 = 6)

Numbers help us understand and organize our world better.`,
        duration: '15 min'
      },
      {
        id: '1-2',
        title: 'Basic Addition Video',
        type: 'video',
        content: 'Learn basic addition through visual examples',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: '10 min'
      },
      {
        id: '1-3',
        title: 'Numbers Quiz',
        type: 'quiz',
        content: 'Test your understanding of basic numbers',
        questions: [
          {
            id: 'q1',
            question: 'What is 5 + 3?',
            options: ['6', '7', '8', '9'],
            correctAnswer: 2,
            explanation: '5 + 3 = 8. When we add 5 and 3, we get 8.'
          },
          {
            id: 'q2',
            question: 'Which of these is a whole number?',
            options: ['-1', '0', '1.5', 'All of the above'],
            correctAnswer: 1,
            explanation: '0 is a whole number. Whole numbers start from 0 and go up: 0, 1, 2, 3...'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'English Language Basics',
    description: 'Essential English skills for communication',
    thumbnail: '/api/placeholder/300/200',
    duration: '6 weeks',
    level: 'Beginner',
    modules: [
      {
        id: '2-1',
        title: 'The English Alphabet',
        type: 'reading',
        content: `# The English Alphabet

The English alphabet has 26 letters. Learning these letters is the first step to reading and writing in English.

## The 26 Letters:
**Uppercase**: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
**Lowercase**: a b c d e f g h i j k l m n o p q r s t u v w x y z

## Vowels and Consonants:
- **Vowels**: A, E, I, O, U (and sometimes Y)
- **Consonants**: All other letters

## Why Learn the Alphabet?
- To read books and signs
- To write letters and messages
- To use computers and phones
- To learn new words

## Practice Tips:
1. Say each letter out loud
2. Write each letter by hand
3. Find objects that start with each letter
4. Practice every day for 10 minutes

Remember: Learning takes time. Be patient with yourself and practice regularly.`,
        duration: '20 min'
      },
      {
        id: '2-2',
        title: 'Pronunciation Guide',
        type: 'video',
        content: 'Learn correct pronunciation of English letters',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        duration: '15 min'
      }
    ]
  }
];

export const liveClasses: LiveClass[] = [
  {
    id: 'live-1',
    title: 'Mathematics Problem Solving',
    instructor: 'Teacher Sarah',
    scheduledTime: '2024-01-15T14:00:00Z',
    duration: '45 min',
    subject: 'Mathematics',
    isLive: true,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'live-2',
    title: 'English Conversation Practice',
    instructor: 'Teacher John',
    scheduledTime: '2024-01-15T16:00:00Z',
    duration: '30 min',
    subject: 'English',
    isLive: false
  }
];