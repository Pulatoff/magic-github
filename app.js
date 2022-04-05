const container = document.querySelector(".container");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const repositorys = document.querySelector(".repos");

async function github(userName) {
  try {
    const gitJson = await fetch(`https://api.github.com/users/${userName}`);
    const reposJson = await fetch(
      `https://api.github.com/users/${userName}/repos`
    );

    const repos = await reposJson.json();
    const userInfo = await gitJson.json();

    renderHtml(userInfo);
    repos.forEach((element) => {
      console.log(element);
      repositorysRender(element);
    });
  } catch (eror) {
    alert("notugri kiritingiz");
  }
}

function renderHtml(obj) {
  let html = `
  <div class="profile">
    <div class="left__site">
      <img class="avatar" src="${obj.avatar_url}" alt="" />
      <a class="profile__link" target="_blank" href="${obj.html_url}">View Profile</a>
    </div>
    <div class="right__site">
      <div class="infos">
        <div class="info">Public Repos: ${obj.public_repos}</div>
        <div class="info">Public gists: ${obj.public_gists}</div>
        <div class="info">folowers: ${obj.followers}</div>
        <div class="info">folowing: ${obj.following}</div>
      </div>
      <div class="descrip">
        <div class="opis">company: ${obj.company}</div>
        <div class="opis">Website/blog:${obj.blog}</div>
        <div class="opis">Location:${obj.location}</div>
        <div class="opis">Member since: ${obj.created_at}</div>
      </div>
    </div>
  </div>`;
  container.insertAdjacentHTML("afterbegin", html);
}

function repositorysRender(obj) {
  let html = `
    <div class="repo">
        <h1 class="repo__name">${obj.name}</h1>
    </div>`;
  repositorys.insertAdjacentHTML("beforeend", html);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  container.innerHTML = "";
  download(input.value);
  input.value = "";
});

async function download(val) {
  await github(val);
  if (document.querySelector(".hidden")) {
    document.querySelector(".hidden").classList.remove("hidden");
  }
}
