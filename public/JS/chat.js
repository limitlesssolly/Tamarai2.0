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

function initTalkJS(userRole, userId, userName, userEmail) {
    const currentUser = new Talk.User({
        id: userId,
        name: userName,
        email: userEmail,
        role: userRole
    });

    const session = new Talk.Session({
        appId: "tDA2AuU1", // Replace with your TalkJS App ID
        me: currentUser
    });

    return session;
}

function initChat(user) {
    const session = initTalkJS(user.role, user.id, user.name, user.email);

    // You can replace the following example IDs with actual user IDs
    const sellerId = 'sellerId';
    const adminId = 'adminId';

    let conversation;

    if (user.role === 'buyer') {
        conversation = createBuyerSellerChat(session, user.id, sellerId);
    } else if (user.role === 'seller') {
        conversation = createAdminChat(session, user.id, adminId);
    } else if (user.role === 'admin') {
        // You can add logic here to create conversations for admins
    }

    createInbox(session);
}