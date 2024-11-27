// Variables to store queue state
let queueNumber = 0;
let userToken = null;

// DOM Elements
const queueNumberEl = document.getElementById("queue-number");
const waitTimeEl = document.getElementById("wait-minutes");
const getTokenButton = document.getElementById("get-token-button");
const userTokenEl = document.getElementById("user-token");

// Function to simulate getting a token
getTokenButton.addEventListener("click", () => {
  queueNumber++;
  userToken = queueNumber;
  updateQueue();
  userTokenEl.textContent = userToken;
});

// Function to update queue information
function updateQueue() {
  queueNumberEl.textContent = queueNumber;
  const estimatedWait = queueNumber * 5; // Assuming 5 minutes per token
  waitTimeEl.textContent = estimatedWait;
}
