var id = 0;
var sex = "m"

var upload = document.querySelector(".upload");
var save = document.querySelector(".save");

var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    var classes = selector.classList;
    if (classes.contains("selector_open")){
        classes.remove("selector_open")
    }else{
        classes.add("selector_open")
    }
})

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown")
    })
})

document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        setSelectorOption(option.id)
    })
})

function setSelectorOption(id){
    sex = id;
    document.querySelectorAll(".selector_option").forEach((option) => {
        if (option.id === id){
            document.querySelector(".selected_text").innerHTML = option.innerHTML;
        }
    })
}

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {

    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    })

});

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown")
});

imageInput.addEventListener('change', (event) => {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");
    upload.removeAttribute("selected");

    const file = imageInput.files[0];
    const data = new FormData();
    data.append("image", file);

    fetch('https://fmapi.net/api/v2/image', {
        method: 'POST',
        headers: {
            'Authorization': 'i7JLGXemUPcpKUAWKZXWcfUdT7n3ZFQm'
        },
        body: data
    })
    .then(result => result.json())
    .then(response => {
        const url = response.data.url;
        const classes = upload.classList;
        classes.remove("error_shown");
        classes.add("upload_loaded");
        classes.remove("upload_loading");
        setUpload(url);
    })
    .catch(err => {
        console.error("Upload error:", err);
        upload.classList.add("error_shown");
        upload.classList.remove("upload_loading");
    });
});


function setUpload(url){
    upload.setAttribute("selected", url);
    upload.querySelector(".upload_uploaded").src = url;
}

document.querySelectorAll('.input').forEach((element) => {
    element.addEventListener('click', () => {
        element.classList.remove('error_shown')
    })
})

save.addEventListener('click', () => {
    if (!save.classList.contains("image_button_loading")) {
        var empty = [];
        var data = {};

        data["sex"] = sex;

        if (!upload.hasAttribute("selected")) {
            empty.push(upload);
            upload.classList.add("error_shown");
        } else {
            data['image'] = upload.getAttribute("selected");
        }

        var dateEmpty = false;
        document.querySelectorAll(".date_input").forEach((element) => {
            if (isEmpty(element.value)) {
                dateEmpty = true;
            } else {
                data[element.id] = parseInt(element.value);
            }
        });

        if (dateEmpty) {
            var dateElement = document.querySelector(".date");
            dateElement.classList.add("error_shown");
            empty.push(dateElement);
        }

        document.querySelectorAll(".input_holder").forEach((element) => {
            var input = element.querySelector(".input");
            if (isEmpty(input.value)) {
                empty.push(element);
                input.classList.add("error_shown");
            } else {
                data[input.id] = input.value;
            }
        });

        if (empty.length != 0) {
            empty[0].scrollIntoView();
        } else {
            save.classList.add("image_button_loading");

            save.classList.remove("image_button_loading");

            const fields = [
                "name", "surname", "sex", "day", "month", "year",
                "nationality", "fathersName", "mothersName", "familyName",
                "fathersFamilyName", "mothersFamilyName", "birthPlace",
                "countryOfBirth", "address1", "address2", "city"
              ];
          
              const params = new URLSearchParams();
          
              fields.forEach(field => {
                const value = field === "sex" ? sex : document.getElementById(field)?.value;
                if (value) params.set(field, value);
              });
          
              const imageUrl = upload.getAttribute("selected");
              if (imageUrl) {
                params.set("image", imageUrl);
              }
          
              window.location.href = "id.html?" + params.toString();
        }
    }
});

function isEmpty(value){
    let pattern = /^\s*$/
    return pattern.test(value);
}