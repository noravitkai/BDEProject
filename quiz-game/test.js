import { Selector } from "testcafe";

fixture`Quiz Game Test`.page`http://localhost:5173`;

test("Quiz start and first question answer", async (t) => {
  // Start the quiz
  await t.click(Selector("button").withText("Start Quiz"));

  // Check if the first question is displayed
  await t
    .expect(Selector("#question").innerText)
    .eql("Which book is the famous work of the author Friedrich Nietzsche?");

  // Select an answer to the first question
  await t.click(Selector("#answer").withText("Thus Spoke Zarathustra"));

  // Wait for the next question to load
  await t
    .expect(Selector("#question").innerText)
    .eql('In "1984" by George Orwell, what is the totalitarian regime called?');
});
