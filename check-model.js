import { askModel } from "./src/model.js";

const message = await askModel([
  {
    role: "user",
    content: "Explain what a database timeout means in one sentence."
  }
]);

console.log(message.content);