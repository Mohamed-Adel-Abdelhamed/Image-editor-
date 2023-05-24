// JavaScript source code
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hue_rotate = document.getElementById("hue_rotate");


let download = document.getElementById("download");
let upload = document.getElementById("upload");
let img = document.getElementById("img");
let img_box = document.querySelector('.img_box');
let reset = document.querySelector('span');

let canvas = document.getElementById("canvas");
const cnx = canvas.getContext('2d');

function reset_value() {
    img.style.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hue_rotate.value = '0';
}

window.onload = function () {
    download.style.display = 'none';
    reset.style.display = 'none';
    img.style.display = 'none';
}
upload.onchange = function () {
    reset_value();
    download.style.display = 'block';
    reset.style.display = 'block';
    img.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function () {
        img.src = file.result;
    }
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        cnx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = 'none';
    }
}

let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
    filter.addEventListener('input', function () {
        cnx.filter = `
                saturate(${saturate.value}%)
                contrast(${contrast.value}%)
                brightness(${brightness.value}%)
                sepia(${sepia.value}%)
                grayscale(${grayscale.value})
                blur(${blur.value}px)
                hue-rotate(${hue_rotate.value}deg)
        `
        cnx.drawImage(img, 0, 0, canvas.width, canvas.height);
    })
})

download.onclick = function () {
    download.href = canvas.toDataURL();
}