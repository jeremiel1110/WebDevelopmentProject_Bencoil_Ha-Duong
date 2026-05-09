let newsData = [];
let currentIndex = 0;

fetch("../JSON/News.json")
.then(response => response.json())
.then(data => {
    newsData = data;
    currentIndex = Math.floor(Math.random() * newsData.length);
    renderNews(currentIndex);
});

const prevBtn = document.getElementById("news-prev");
const nextBtn = document.getElementById("news-next");

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        if (!newsData.length) return;
        currentIndex = (currentIndex - 1 + newsData.length) % newsData.length;
        renderNews(currentIndex);
    });
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        if (!newsData.length) return;
        currentIndex = (currentIndex + 1) % newsData.length;
        renderNews(currentIndex);
    });
}

function renderNews(index) {
    const news = newsData[index];
    if (!news) return;
    document.getElementById("news-title").textContent = news.title;
    document.getElementById("news-text").textContent = news.content;
    document.getElementById("news-img").src = news.img;
    document.getElementById("news-img").alt = news.title;
}