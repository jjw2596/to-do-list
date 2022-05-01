const images = [
    "back1.png", "back2.png", "back3.png"
];

const chooseImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.src = `img/${chooseImage}`;

document.body.appendChild(bgImage)