(function () {
  const socket = io();

  let uname;

  document.getElementById("join-user").addEventListener("click", function () {
    let username = document.getElementById("username").value;

    if (username.length == 0) {
      return;
    }

    socket.emit("newuser", username);
    uname = username;

    document.getElementById("join-screen").classList.remove("active");
    document.getElementById("chat-screen").classList.add("active");
  });

  //sending message logic
  document.getElementById("send-message").addEventListener("click", () => {
    let message = document.getElementById("message-input").value;

    if (message.length == 0) {
      return;
    }

    //calling renderMessage function here
    renderMessage("my", {
      username: uname,
      text: message,
    });

    socket.emit("chat", {
      username: uname,
      text: message,
    });

    document.getElementById("message-input").value = "";
  });

  document.getElementById('exit-chat').addEventListener('click',()=>{
    socket.emit('exituser',uname);
    window.location.href = window.location.href;
  });

  socket.on("update",(update)=>{
    renderMessage("update",update);
  });

  socket.on("chat",(message)=>{
    renderMessage("other",message);
  });



  //   renderMessage function is here
  function renderMessage(type, message) {
    let messageContainer = document.getElementById("messages");

    if (type == "my") {
      let el = document.createElement("div");
      el.setAttribute("class", "message my-message");
      el.innerHTML = `
        <div>
            <div class="name">${message.username}</div>
             <div class="text">${message.text}</div>
        </div>
        `;
      messageContainer.appendChild(el);

    } else if (type == "other") {
      let el = document.createElement("div");
      el.setAttribute("class", "message others-message");
      el.innerHTML = `
        <div>
            <div class="name">${message.username}</div>
             <div class="text">${message.text}</div>
        </div>
        `;
      messageContainer.appendChild(el);

    } else if (type == "update") {
      let el = document.createElement("div");
      el.setAttribute("class", "update");
      el.innerHTML = message;
      messageContainer.appendChild(el);
    }

    messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.scrollHeight;
  }
})();
