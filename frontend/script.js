function fact(n) {
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}

function applique(f, tab) {
  return tab.map(element => f(element))
}

const msgs = [
    { "msg" : "Hello World" },
    { "msg" : "Blah Blah" },
    { "msg" : "I love cats" }
];

function update(event, new_messages) {
  event.preventDefault();
  const messageList = document.getElementById("posted-messages");

  const newMessages = new_messages.map(message => {
    const listItem = document.createElement("li");
    listItem.textContent = message.msg;
    return listItem;
  });

  messageList.replaceChildren(...newMessages);
}

document.querySelector('form').addEventListener('submit', function(event) { 
  event.preventDefault(); 
}); 