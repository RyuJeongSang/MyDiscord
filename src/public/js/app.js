const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const frontSocket = new WebSocket(`ws://${window.location.host}`);

const handleOpen = () => {
  console.log("socket open connect server");
};

frontSocket.addEventListener("open", handleOpen);

frontSocket.addEventListener("message", (message) => {
  console.log(`receive${message.data}`);
});

frontSocket.addEventListener("close", () => {
  console.log("close server");
});

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  frontSocket.send(input.value);
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
