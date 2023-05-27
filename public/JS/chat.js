function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}


const msgscontainer = document.getElementById("msgscontainer");
const msgInput = document.getElementById("msgInput");

// Open chat form
function openForm() {
    document.querySelector(".chat-popup").style.display = "block";
}

// Close chat form
function closeForm() {
    document.querySelector(".chat-popup").style.display = "none";
}

// Send message to the chat
function sendMessage(event) {
    event.preventDefault();

    // Get input value
    const msgText = msgInput.value;

    if (!msgText) return;

    // Create new message bubble element
    const msgBubble = document.createElement("div");

    // Add appropriate classes based on whether message is incoming or outgoing
    msgBubble.classList.add("msgbubble");
    msgBubble.classList.add("outgoing"); // Change this to "incoming" for incoming messages

    msgBubble.textContent = msgText;

    // Append message bubble to container
    msgscontainer.appendChild(msgBubble);

    // Reset input value
    msgInput.value = "";
}