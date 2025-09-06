// new

var confirmElement = document.querySelector(".confirm");

var time = document.getElementById("time");

if (localStorage.getItem("update") == null){
    localStorage.setItem("update", "24.12.2024")
}

var date = new Date();

var dataReloadEvent = (data) => {
    loadReadyData(data);
}

var imageReloadEvent = (image) => {
    setImage(image);
}

var updateText = document.querySelector(".bottom_update_value");
updateText.innerHTML = localStorage.getItem("update");

var update = document.querySelector(".update");
update.addEventListener('click', () => {
    var newDate = date.toLocaleDateString("pl-PL", options);
    localStorage.setItem("update", newDate);
    updateText.innerHTML = newDate;

    scroll(0, 0)
});

setClock();
function setClock(){
    date = new Date();
    time.innerHTML = "Czas: " + date.toLocaleTimeString("pl-PL", optionsTime) + " " + date.toLocaleDateString("pl-PL", options);    
    delay(1000).then(() => {
        setClock();
    })
}

var unfold = document.querySelector(".info_holder");
unfold.addEventListener('click', () => {

    if (unfold.classList.contains("unfolded")){
      unfold.classList.remove("unfolded");
    }else{
      unfold.classList.add("unfolded");
    }

})

if (params.has("name")) {
    const result = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
  
    loadReadyData(result);
}

if (params.has("image")) {
    const imageUrl = params.get("image");
    setImage(imageUrl);
}


function loadReadyData(result){
    Object.keys(result).forEach((key) => {
      result[key] = htmlEncode(result[key])
    })

    var day = result['day'];
    var month = result['month'];
    var year = result['year'];
    
    var birthdayDate = new Date();
    birthdayDate.setDate(day)
    birthdayDate.setMonth(month-1)
    birthdayDate.setFullYear(year)
    
    birthday = birthdayDate.toLocaleDateString("pl-PL", options);
    
    var sex = result['sex'];
    
    var textSex;
    if (sex === "m"){
        textSex = "Mężczyzna"
    }else if (sex === "k"){
        textSex = "Kobieta"
    }

    var seriesAndNumber = localStorage.getItem('seriesAndNumber');
    if (!seriesAndNumber){
        seriesAndNumber = "";
        var chars = "ABCDEFGHIJKLMNOPQRSTUWXYZ".split("");
        for (var i = 0; i < 4; i++){
            seriesAndNumber += chars[getRandom(0, chars.length)];
        }
        seriesAndNumber += " ";
        for (var i = 0; i < 5; i++){
            seriesAndNumber += getRandom(0, 9);
        }
        localStorage.setItem('seriesAndNumber', seriesAndNumber);
    }

    setData('seriesAndNumber', localStorage.getItem('seriesAndNumber'));
    setData("name", result['name'].toUpperCase());
    setData("surname", result['surname'].toUpperCase());
    setData("nationality", result['nationality'].toUpperCase());
    setData("fathersName", result['fathersName'].toUpperCase());
    setData("mothersName", result['mothersName'].toUpperCase());
    setData("birthday", birthday);
    setData("familyName", result['familyName'].toUpperCase());
    setData("sex", textSex.toUpperCase());
    setData("fathersFamilyName", result['fathersFamilyName'].toUpperCase());
    setData("mothersFamilyName", result['mothersFamilyName'].toUpperCase());
    setData("birthPlace", result['birthPlace'].toUpperCase());
    setData("countryOfBirth", result['countryOfBirth'].toUpperCase());
    setData("adress", ("ul. " + result['address1'] + "<br>" + result['address2'] + " " + result['city']).toUpperCase());
    
    var givenDate = birthdayDate;
    givenDate.setFullYear(givenDate.getFullYear() + 18);
    setData('givenDate', givenDate.toLocaleDateString("pl-PL", options));

    var expiryDate = givenDate;
    expiryDate.setFullYear(expiryDate.getFullYear() + 5);
    setData('expiryDate', expiryDate.toLocaleDateString("pl-PL", options));

    if (!localStorage.getItem("homeDate")){
      var homeDay = getRandom(1, 25);
      var homeMonth = getRandom(0, 12);
      var homeYear = getRandom(2012, 2019);
    
      var homeDate = new Date();
      homeDate.setDate(homeDay);
      homeDate.setMonth(homeMonth);
      homeDate.setFullYear(homeYear)
    
      localStorage.setItem("homeDate", homeDate.toLocaleDateString("pl-PL", options))
    }
    
    document.querySelector(".home_date").innerHTML = localStorage.getItem("homeDate");

    var later;
    
    if (sex === "m"){
      later = "0295"
    }else{
      later = "0382"
    }
    
    if (day < 10){
      day = "0" + day
    }
    
    if (month < 10){
      month = "0" + month
    }

    var pesel = year.toString().substring(2) + month + day + later + "7";
    setData("pesel", pesel);
}

function setImage(image){
    document.querySelector(".id_own_image").style.backgroundImage = `url(${image})`;
}

function setData(id, value){
    document.getElementById(id).innerHTML = value;
}