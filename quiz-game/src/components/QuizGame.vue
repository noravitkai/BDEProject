<template>
  <div class="max-w-600 mx-auto px-20 py-10">
    <!-- Introduction -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-amber-400 mb-4">
        Test Your Literary Knowledge!
      </h1>
      <p class="text-md text-black mb-4">
        How well do you know famous literary works and their authors? Challenge
        yourself with 15 questions in this fun educational quiz.
      </p>
      <!-- Start button -->
      <button
        @click="startQuiz"
        v-if="!quizStarted"
        class="px-4 py-2 bg-amber-100 border-solid border-[0.075rem] border-amber-300 text-black cursor-pointer hover:bg-amber-300 duration-300 ease-in-out"
      >
        Start Quiz
      </button>
    </div>
    <div v-if="quizStarted">
      <!-- Timer -->
      <p class="text-md" v-if="currentQuestionIndex >= 0">
        {{ remainingTime }} seconds left
      </p>
      <!-- Progress bar -->
      <div class="mb-8" v-if="currentQuestionIndex >= 0">
        <div class="h-6 bg-amber-100 relative">
          <div
            :style="{ width: progressBarWidth }"
            class="h-6 bg-amber-400 transition-width duration-300 ease-in-out"
          ></div>
        </div>
      </div>
      <!-- Questions -->
      <div v-if="currentQuestionIndex >= 0">
        <h2 class="text-xl font-bold" id="question">
          {{ currentQuestion.question }}
        </h2>
        <ul class="list-none p-0">
          <li
            v-for="(answer, index) in currentQuestion.answers"
            :key="index"
            class="my-6 text-md"
          >
            <button
              @click="checkAnswer(answer)"
              class="px-4 py-3 border-solid border-[0.075rem] border-gray-300 w-full text-left text-black cursor-pointer hover:bg-amber-100 hover:border-amber-300 duration-100 ease-in-out"
              :id="'answer'"
            >
              {{ answer }}
            </button>
          </li>
        </ul>
        <!-- Previous & Next buttons for navigation -->
        <div class="flex mt-4 text-md">
          <button
            @click="previousQuestion"
            v-if="currentQuestionIndex > 0"
            class="mr-auto px-4 py-2 bg-amber-100 border-solid border-[0.075rem] border-amber-300 text-black cursor-pointer hover:bg-amber-300 duration-300 ease-in-out"
          >
            Previous
          </button>
          <button
            @click="nextQuestion"
            v-if="currentQuestionIndex < questions.length - 1"
            class="ml-auto px-4 py-2 bg-amber-100 border-solid border-[0.075rem] border-amber-300 text-black cursor-pointer hover:bg-amber-300 duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      </div>
      <!-- Completion -->
      <div class="flex flex-col items-center" v-else>
        <h2 class="text-xl font-semibold my-4">Quiz Completed</h2>
        <p class="text-md mb-4">
          You got {{ correctAnswers }} out of {{ questions.length }} correct!
        </p>
        <button
          @click="restartQuiz"
          class="px-4 py-2 bg-amber-100 border-solid border-[0.075rem] border-amber-300 text-black cursor-pointer hover:bg-amber-300 duration-300 ease-in-out"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

// Question type
interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

// Quiz questions
const questions = ref<Question[]>([
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
]);

// Track whether the quiz has started
const quizStarted = ref(false);

// Function to start the quiz
const startQuiz = () => {
  quizStarted.value = true;
  startQuestionTimer();
};

// Track the current question and the user's correct answers
const currentQuestionIndex = ref(0);
const correctAnswers = ref(0);

// Get the current question
const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value]
);

// Function to check the user's answer
const checkAnswer = (selectedOption: string) => {
  if (selectedOption === currentQuestion.value.correctAnswer) {
    correctAnswers.value++;
  }

  // Move to the next question
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    // Quiz is complete
    currentQuestionIndex.value = -1;
  }
};

// Function to move to the previous question
const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

// Function to move to the next question
const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    // Quiz is complete
    currentQuestionIndex.value = -1;
  }
};

// Function to restart the quiz
const restartQuiz = () => {
  // Reset the current question index and correct answers count
  currentQuestionIndex.value = 0;
  correctAnswers.value = 0;
};

// Computed property for the progress bar width
const progressBarWidth = computed(() => {
  if (currentQuestionIndex.value >= 0) {
    const progress =
      ((currentQuestionIndex.value + 1) / questions.value.length) * 100;
    return `${progress}%`;
  } else {
    return "0%"; // Hide the progress bar when the quiz is completed
  }
});

// Timer duration and remaining time
const questionTimerDuration: number = 20; // In seconds
const remainingTime = ref(questionTimerDuration);
let questionTimer: number | undefined;

// Function to start the timer
const startQuestionTimer = () => {
  questionTimer = window.setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      // Time's up, automatically proceed to the next question
      window.clearInterval(questionTimer!);
      nextQuestion();
    }
  }, 1000);
};

// Function to stop the timer
const stopQuestionTimer = () => {
  if (questionTimer !== undefined) {
    window.clearInterval(questionTimer);
    questionTimer = undefined;
  }
};

// Execute startQuestionTimer when a new question is displayed
watch(currentQuestion, () => {
  if (currentQuestion.value) {
    remainingTime.value = questionTimerDuration;
    stopQuestionTimer(); // Stop the previous timer if any is running
    startQuestionTimer(); // Start a new timer for the current question
  }
});
</script>
