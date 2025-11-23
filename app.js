document.getElementById("uploadBtn").addEventListener("click", () => {
let fileInput = document.getElementById("photo");
let file = fileInput.files[0];

if (!file) {
alert("請選一張照片");
return;
}

// 取得 GPS 位置
navigator.geolocation.getCurrentPosition(pos => {
let lat = pos.coords.latitude;
let lng = pos.coords.longitude;

let reader = new FileReader();
reader.onload = () => {
let data = {
img: reader.result,
lat,
lng,
time: new Date().toLocaleString()
};

// 存到 localStorage
let saved = JSON.parse(localStorage.getItem("records") || "[]");
saved.push(data);
localStorage.setItem("records", JSON.stringify(saved));

displayRecords();
};
reader.readAsDataURL(file);
}, () => {
alert("無法取得位置，請開啟定位功能！");
});
});

function displayRecords() {
let list = document.getElementById("records");
list.innerHTML = "";

let saved = JSON.parse(localStorage.getItem("records") || "[]");
saved.forEach(item => {
let card = `
<div class="card">
<img src="${item.img}">
<p>📍 座標：${item.lat}, ${item.lng}</p>
<p>⏱ 時間：${item.time}</p>
</div>
`;
list.innerHTML += card;
});
}

window.onload = displayRecords;
