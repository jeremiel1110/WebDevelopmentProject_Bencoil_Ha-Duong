let newsData = [];

fetch("../JSON/News.json")
.then(response => response.json())
.then(data => {
    newsData = data;
    loadRandomNews();
});

function loadRandomNews() {
    const random = Math.floor(Math.random() * newsData.length);
    const news = newsData[random];

    document.getElementById("news-title").textContent = news.title;
    document.getElementById("news-text").textContent = news.content;
    document.getElementById("news-img").src = news.img;
}