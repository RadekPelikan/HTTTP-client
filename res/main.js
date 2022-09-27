const list = document.querySelector(".list-choice");
const listObjects = list.querySelector(".list-choice-objects");
const litstTitle = list.querySelector(".list-choice-title");
const sendButton = document.querySelector("#send");
const urlInput = document.querySelector("#url");
const bodyJsonText = document.querySelector("#body-json");
let listOpen = false;

function childOf(c, p) {
  while ((c = c.parentNode) && c !== p);
  return !!c;
}

const updateList = () => {
  listObjects.className = `list-choice-objects ${listOpen ? "show" : ""}`;
};

list.onclick = (e) => {
  listOpen = !listOpen;
  updateList();
};

list.onmouseout = (e) => {
  if (!childOf(e.target, list) || list.contains(e.target)) return;
  listOpen = false;
  updateList();
};

sendButton.onclick = (e) => {
  e.preventDefault();
  let method = listObjects.querySelector('input[name="method"]:checked').value;
  let data = undefined
  try {
    data = JSON.parse(bodyJsonText.value)
  } catch {
    console.log("Wrong json syntax")
  }
  fetch(urlInput.value, {
    method,
    data
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error(error));
};
