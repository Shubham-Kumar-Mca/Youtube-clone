let menuIcon = document.querySelector(".menu-icon")
let sidebar = document.querySelector(".sidebar")
let container = document.querySelector(".container")
let listConatiner = document.querySelector(".list-container")
let videoList = document.querySelector(".video-list")

menuIcon.onclick = function () {
    sidebar.classList.toggle("small-sidebar")
    container.classList.toggle("larg-container")
}


let API_KEY = "AIzaSyAgdhgmuh7OOiylIP8--I7dZSTjkAKMpjU";

let getData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&locale=India&maxResults=100&key=${API_KEY}`;
    let res = await fetch(url);
    let data = await res.json();
    data.items.forEach(element => {
        getChannelIcon(element.snippet)
    });
}
getData()


let getChannelIcon = async (video_data) => {
    const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${video_data.channelId}&key=${API_KEY}`;
    let res = await fetch(url);
    let data = await res.json();
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url
    displayData(video_data)
}




const perfectTime = (timeInAnotherFormate) => {
    // Get the current date and time
    const timestamp = new Date(timeInAnotherFormate)
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();

    // Define the time intervals in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    // Calculate the time ago in relative format
    if (diff < minute) {
        return Math.floor(diff / 1000) + " seconds ago";
    } else if (diff < hour) {
        return Math.floor(diff / minute) + " minutes ago";
    } else if (diff < day) {
        return Math.floor(diff / hour) + " hours ago";
    } else if (diff < month) {
        return Math.floor(diff / day) + " days ago";
    } else if (diff < year) {
        return Math.floor(diff / month) + " months ago";
    } else {
        return Math.floor(diff / year) + " years ago";
    }
}

const saveVideo = (element) =>{
    console.log("Obj is", element);
    window.location.href = "./singleVideo.html"
}

let displayData = (SingleVideoData) => {
    let result = perfectTime(SingleVideoData.publishedAt)
    // console.log(SingleVideoData);

    listConatiner.innerHTML += `
    <div class="video-list" onclick="saveVideo('${SingleVideoData.thumbnails.standard.url}')">
        <img src="${SingleVideoData.thumbnails.standard.url}"  class="thumbnail" alt="">
        <div class="flex-div">
            <img src="${SingleVideoData.channelThumbnail}" alt="">
            <div class="video-info">
                <a href="">${SingleVideoData.title}</a>
                <p>${SingleVideoData.channelTitle}</p>
                <p>15k views &bull; ${result}</p>
            </div>
        </div>
    </div>
    `
    
}


/* Searching Data */

const searchQuery = async () =>{
    let query  = document.querySelector("#query").value;
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${query}&key=${API_KEY}`;
    let res = await fetch(url);
    let data = await res.json();
    data.items.forEach(element => {
        getChannelIcon(element.snippet)
    });

    // console.log("Data is", data);
}