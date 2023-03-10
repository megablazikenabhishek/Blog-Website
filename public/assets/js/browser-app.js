const body_input = document.querySelector(".body-input");
const author_input = document.querySelector(".task-input");
const task_form = document.querySelector(".task-form");
const submit_btn = document.querySelector(".submit-btn");
let currUser;

const getUser = async () => {
  let requestOptions = { method: "GET", redirect: "follow" };

  await fetch("/google/getPerson", requestOptions)
    .then((response) => response.json())
    .then((res) => {
      currUser = res.user;
    })
    .catch((err) => console.log(err));
  // console.log(currUser);
  author_input.value = currUser.username;
  author_input.disabled = true;

  document.getElementById("username").textContent = currUser.username;
  document.getElementById("profile-pic").src = currUser.img;
};

const showFeed = async () => {
  let requestOptions = { method: "GET", redirect: "follow" };

  await fetch("/api/tasks", requestOptions)
    .then((response) => response.json())
    .then((res) => {
      let { task: data } = res;
      for (let i = 0; i < data.length; i++) {
        let val = document.createElement("section");
        val.classList.add("feed-container");
        let s = data[i].body;
        // console.log(data[i].date);

        if (data[i].author_id === currUser.googleId) {
          val.innerHTML = `
                    <div class="single-task">
                        <div class="delete-link" id = "${data[i]._id}">
                            <img src="./img/delete.png" alt="delete" />
                        </div>
                        <h9>${s}</h9>
                        <h6>by ${data[i].author} on ${data[i].date}</h6>
                        <div class="task-links">
                        <!-- like link -->
                        <a class="edit-link" id="${data[i]._id}0">
                            <img src="./img/icons8-facebook-like-24.png" />
                            <p>${data[i].meta.likes}</p>
                        </a>
                        <!-- dislike btn -->
                        <a class="edit-link" id="${data[i]._id}1">
                            <img src="./img/icons8-thumbs-down-24.png" />
                            <p>${data[i].meta.dislikes}</p>
                        </a>
                    </div>
                `;
          document.querySelector("body").appendChild(val);
          document
            .getElementById(`${data[i]._id}0`)
            .addEventListener("click", likeBlog);
          document
            .getElementById(`${data[i]._id}1`)
            .addEventListener("click", dislikeBlog);
          document
            .getElementById(data[i]._id)
            .addEventListener("click", deleteBlog);
        } else {
          val.innerHTML = `
                    <div class="single-task">
                        <h9>${s}</h9>
                        <h6>by ${data[i].author} ${data[i].date}</h6>
                        <div class="task-links">
                        <!-- like link -->
                        <a class="edit-link" id="${data[i]._id}0">
                            <img src="./img/icons8-facebook-like-24.png" />
                            <p>${data[i].meta.likes}</p>
                        </a>
                        <!-- dislike btn -->
                        <a class="edit-link" id="${data[i]._id}1">
                            <img src="./img/icons8-thumbs-down-24.png" />
                            <p>${data[i].meta.dislikes}</p>
                        </a>
                    </div>
                `;
          document.querySelector("body").appendChild(val);
          document
            .getElementById(`${data[i]._id}0`)
            .addEventListener("click", likeBlog);
          document
            .getElementById(`${data[i]._id}1`)
            .addEventListener("click", dislikeBlog);
        }
      }
    })
    .catch((error) => console.log("error", error));
};

const postBlog = async () => {
  const author = author_input.value;
  const body = body_input.value;

  if (author === "" || body == "") {
    alert("Invalid Input");
    return;
  }

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    author: author,
    body: body,
    author_id: currUser.googleId,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("/api/tasks", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  location.reload();
};

const likeBlog = async (e) => {
  if (e.currentTarget.children[0].src.includes("dark")) return;
  const id = e.currentTarget.id;
  let photo = e.currentTarget.children[0];
  photo.src = "./img/icons8-facebook-like-24-dark.png";

  let likes = e.currentTarget.children[1];
  val = likes.textContent;
  likes.textContent = `${Number(val) + 1}`;

  like = Number(likes.textContent);

  // for dislikes
  let dislikes =
    e.currentTarget.parentElement.children[1].children[1].textContent;
  dislikes = Number(dislikes);

  // console.log(like, dislikes);

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({ meta: { likes: like, dislikes: dislikes } });

  let requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // console.log(id);

  await fetch("/api/tasks/" + id.substring(0, id.length - 1), requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const dislikeBlog = async (e) => {
  if (e.currentTarget.children[0].src.includes("dark")) return;
  const id = e.currentTarget.id;
  let photo = e.currentTarget.children[0];
  photo.src = "./img/icons8-thumbs-down-24-dark.png";

  let dislikes = e.currentTarget.children[1];
  val = dislikes.textContent;
  dislikes.textContent = `${Number(val) + 1}`;

  dislikes = Number(dislikes.textContent);

  // for likes
  let like = e.currentTarget.parentElement.children[0].children[1].textContent;
  like = Number(like);

  // console.log(like, dislikes);

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({ meta: { likes: like, dislikes: dislikes } });

  let requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch("/api/tasks/" + id.substring(0, id.length - 1), requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const deleteBlog = (e) => {
  if (confirm("Do want to delete this blog")) {
    var requestOptions = { method: "DELETE", redirect: "follow" };
    const id = e.currentTarget.id;
    // console.log(id);
    fetch("/api/tasks/" + id, requestOptions).catch((error) =>
      console.log("error", error)
    );
    setTimeout(() => {
      let i = 1 + 1;
    }, 1000);
    location.reload();
  }
};

submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  postBlog();
});
task_form.addEventListener("submit", (e) => {
  e.preventDefault();
  postBlog();
});
getUser();
setTimeout(() => {
  let i = 1 + 1;
}, 1000);
showFeed();
