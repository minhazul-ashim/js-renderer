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
        if (i === 0) {
          btnElement.classList.add("navBtn_active");
        }
        btnElement.innerText = el.category;
        categoryContainer?.append(btnElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

const loadVideos = (categoryId) => {
  const videosContainer = document.getElementById("videosContainer");
  fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  )
    .then((res) => res.json())
    .then((data) => {
      data.data.forEach((el) => generateSingleVideo(videosContainer, el));
    });
};

const generateSingleVideo = (container, video) => {
  const { thumbnail, category_id, title, authors, others } = video;

  const element = `<div class="singleVideo" id="singleVideo">
            <div class="videoThumbailContainer" id="videoThumbailContainer">
              <img
                src=${thumbnail}
                class="videoThumbnail"
                alt=""
              />
              <p class="videoLength">Video Length</p>
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
                <p class="videoAuthorName">${authors[0].profile_name}</p>
                <p class="videoViews">${others.views}</p>
              </div>
            </div>
          </div>`;

  container.insertAdjacentHTML("beforeend", element);
};
