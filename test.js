import { Selector } from "testcafe";

// Define the questions array with questions, answer options, and correct answers
const questions = [
  {
    question:
      "Which book is the famous work of the author Friedrich Nietzsche?",
    answers: [
      "War and Peace",
      "The Social Contract ",
      "Thus Spoke Zarathustra",
    ],
    correctAnswer: "Thus Spoke Zarathustra",
  },
  {
    question:
      'In "1984" by George Orwell, what is the totalitarian regime called?',
    answers: ["Big Brother", "The Party", "The Ministry of Truth"],
    correctAnswer: "The Party",
  },
  {
    question: 'Who wrote "The Revolt of the Masses"?',
    answers: ["José Ortega y Gasset", "George Orwell", "Aldous Huxley"],
    correctAnswer: "José Ortega y Gasset",
  },
  {
    question:
      'In "On the Road" by Jack Kerouac, which character symbolizes the eternal flame of youth, embraced by the rebellious youth culture of the Beat Generation?',
    answers: ["Dean Moriarty", "Carlo Marx", "Sal Paradise"],
    correctAnswer: "Dean Moriarty",
  },
  {
    question: 'Who is the author of the novel "Pride and Prejudice"?',
    answers: ["Jane Austen", "Virginia Woolf", "Emily Brontë"],
    correctAnswer: "Jane Austen",
  },
  {
    question:
      'What is the central theme of "Fear and Loathing in Las Vegas" by Hunter S. Thompson?',
    answers: [
      "To provide a thrilling adventure narrative",
      "To serve as a critique of the consumerist society",
      "To explore the complexities of the human psyche",
    ],
    correctAnswer: "To serve as a critique of the consumerist society",
  },
  {
    question:
      'In "Alice`s Adventures in Wonderland" by Lewis Carroll, which character embodies the idea of communication breaking down, highlighting the nonsensical nature of language?',
    answers: ["The Cheshire Cat", "The Mad Hatter", "The White Rabbit"],
    correctAnswer: "The Mad Hatter",
  },
  {
    question: 'What is the moral of "The Great Gatsby" by F. Scott Fitzgerald?',
    answers: [
      "The world is governed by chaos",
      "Any ultimate reality is unknown",
      "The American Dream is corrupted",
    ],
    correctAnswer: "The American Dream is corrupted",
  },
  {
    question: 'Who wrote "The Picture of Dorian Gray"?',
    answers: ["Albert Camus", "Victor Hugo", "Oscar Wilde"],
    correctAnswer: "Oscar Wilde",
  },
  {
    question:
      'In the works of Franz Kafka, such as "The Metamorphosis", what recurring theme is often explored?',
    answers: [
      "The pursuit of happiness and success in a straightforward manner",
      "The quest for justice in a bureaucratic and irrational world",
      "The celebration of optimism and hope in the face of adversity",
    ],
    correctAnswer:
      "The quest for justice in a bureaucratic and irrational world",
  },
  {
    question:
      'Who is the author of the novel "Adventures of Huckleberry Finn"?',
    answers: ["Mark Twain", "Thomas Mann", "Charles Dickens"],
    correctAnswer: "Mark Twain",
  },
  {
    question:
      'In "The Lord of the Rings" by J. R. R. Tolkien, who is the leader of the Fellowship of the Ring?',
    answers: ["Aragorn", "Legolas", "Gandalf the Grey"],
    correctAnswer: "Gandalf the Grey",
  },
  {
    question: "Which book is the famous work of the author Victor Hugo?",
    answers: ["The Mill on the Floss", "Les Misérables", "Moby-Dick"],
    correctAnswer: "Les Misérables",
  },
  {
    question:
      'In "Brave New World" by Aldous Huxley, what substance is used to maintain societal stability and control the emotions of the citizens?',
    answers: ["Soma", "Elixir of Euphoria", "Joyful Bliss Serum"],
    correctAnswer: "Soma",
  },
  {
    question: 'Who wrote "Anna Karenina"?',
    answers: ["Fyodor Dostoevsky", "Ivan Turgenev", "Leo Tolstoy"],
    correctAnswer: "Leo Tolstoy",
  },
];

fixture`Quiz Game Test`.page`http://quizgame.goulashsup.dk/`;

test("Quiz start and first question answer", async (t) => {
  // Start the quiz
  await t.click(Selector("button").withText("Start Quiz"));

  // Check if the first question is displayed
  await t.expect(Selector("#question").innerText).eql(questions[0].question);

  // Select an answer to the first question
  await t.click(Selector("#answer").withText(questions[0].correctAnswer));

  // Wait for the next question to load
  await t.expect(Selector("#question").innerText).eql(questions[1].question);
});

test("Check score calculation on quiz completion", async (t) => {
  // Start the quiz
  await t.click(Selector("button").withText("Start Quiz"));

  // Answer all questions correctly
  for (let i = 0; i < 15; i++) {
    const correctAnswer = questions[i].correctAnswer;
    await t.click(Selector("#answer").withText(correctAnswer));
  }

  // Check score calculation in completion message
  await t
    .expect(Selector("#score").withText("You got 15 out of 15 correct!").exists)
    .ok();
});
