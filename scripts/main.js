let videos = [];

const sortVideosByViews = () => {
    videos.sort((a, b) => {
      return (
        parseInt(b.others.views.split("K")[0]) -
        parseInt(a.others.views.split("K")[0])
      );
  });
  updateUI();
};

const updateUI = () => {
  const videosContainer = document.getElementById("videosContainer");
  videosContainer.innerHTML = "";
  videos.forEach((el) => generateSingleVideo(videosContainer, el));
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const categoryContainer = document.getElementById("categoryBtnContainer");
      loadVideos(data?.data[0].category_id);
      data.data.forEach((el, i) => {
        const btnElement = document.createElement("button");
        btnElement.classList.add("navBtn");
        btnElement.setAttribute("data-id", el.category_id);
        btnElement.addEventListener("click", categoryChange);
        if (i === 0) {
          btnElement.classList.add("navBtn_active");
        }
        btnElement.innerText = el.category;
        categoryContainer?.append(btnElement);
      });
    })
    .catch((error) => {
      console.error("error:", error);
    });
});

const loadVideos = (categoryId) => {
  const videosContainer = document.getElementById("videosContainer");
  videosContainer.innerHTML = "";
  fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  )
    .then((res) => res.json())
    .then((data) => {
      videos = [...data.data];
      if (!videos.length) {
        videosContainer.insertAdjacentHTML("beforeend", noVideosHTML);
        return;
      }
      videos.forEach((el) => generateSingleVideo(videosContainer, el));
    });
};

const generateSingleVideo = (container, video) => {
  const { thumbnail, category_id, title, authors, others } = video;
  console.log();
  const hours = Math.floor(others.posted_date / 3600);
  const minutes = Math.ceil((others.posted_date % 3600) / 60);
  const element = `<div class="singleVideo" id=${category_id}>
            <div class="videoThumbailContainer" id="videoThumbailContainer">
              <img
                src=${thumbnail}
                class="videoThumbnail"
                alt=""
              />
              ${
                others?.posted_date
                  ? `<p class="videoLength">${`${hours} hours ${minutes} minutes ago`}</p>`
                  : ""
              }
            </div>
            <div class="videoInfoContainer">
              <div class="videoAuthor">
                <img
                  src=${authors[0].profile_picture}
                  class="videoAuthorImg"
                  alt=""
                />
              </div>
              <div class="videoInfo">
                <p class="videoName">${title}</p>
                <p class="videoAuthorName">${authors[0].profile_name} ${
    authors[0].verified ? `<span class="tickMark">&check;</span>` : ""
  }</p>
                <p class="videoViews">${others.views}</p>
              </div>
            </div>
          </div>`;

  container.insertAdjacentHTML("beforeend", element);
};

const categoryChange = (e) => {
  const categoryId = e.target.getAttribute("data-id");
  loadVideos(categoryId);
};

const noVideosHTML = `<div class="noVideos">
        <img src="./assets/Icon.png" alt="">
        <div class="noVideosText">
          <h5>Sorry! No Videos Found!</h5>
        </div>
      </div>`;
