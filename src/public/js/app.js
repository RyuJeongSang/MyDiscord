const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");

const frontSocket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type, payload) => {
  const message = { type, payload };
  return JSON.stringify(message);
};

const handleOpen = () => {
  console.log("socket open connect server");
};

frontSocket.addEventListener("open", handleOpen);

frontSocket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

frontSocket.addEventListener("close", () => {
  console.log("close server");
});

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  frontSocket.send(makeMessage("new_message", input.value));
  input.value = "";
};

const handleNicknameSubmit = (event) => {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  frontSocket.send(makeMessage("nickname", input.value));
};

messageForm.addEventListener("submit", handleMessageSubmit);
nicknameForm.addEventListener("submit", handleNicknameSubmit);
