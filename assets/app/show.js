var left = 0;
var leftMax = 180;
var loading = document.querySelector('.loading_bar');
var timer = document.querySelector('.expire_highlight');
var numbers = document.querySelector('.numbers');
var qrImage = document.querySelector(".qr_image");

var qrCode;

setLeft();
function setLeft(){
    if (left == 0){
        generateQR();
        left = leftMax;
    }
    var min = parseInt(left/60);
    var sec = parseInt(left - min*60);
    if (min == 0){
        timer.innerHTML = sec + " sek."
    }else{
        timer.innerHTML = min + " min " + sec + " sek."
    }
    loading.style.width = (left/leftMax)*100 + "%"
    left--;
    delay(1000).then(() => {
        setLeft()
    })
}

function generateQR(){
    var randomCode = Math.random(100000, 999999).toString().substring(2, 8);
    
    var complexQRData = JSON.stringify({
        "v": "2.1",
        "t": "auth", 
        "domain": generateRandomString(),
    });
    
    qrCode = complexQRData;
    
    qrImage.innerHTML = "";
    qr = new QRCode(qrImage, {
        text: qrCode,
        width: 300,
        height: 300,
        correctLevel: QRCode.CorrectLevel.H 
    });

    numbers.innerHTML = randomCode;
}

function generateRandomString() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let result = '';
    var length = Math.random(256, 512)
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
