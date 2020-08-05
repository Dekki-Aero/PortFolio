let themeDots = document.querySelectorAll(".theme-dot");
let theme = localStorage.getItem("theme");
let selectedTheme;

if (theme == null) {
  selectedTheme = "blue";
} else {
  selectedTheme = theme;
}

glanceTheme = (mode) => {
  if (mode === "light")
    document.querySelector("#theme-style").href = "default.css";
  else if (mode === "green")
    document.querySelector("#theme-style").href = "green.css";
  else if (mode === "blue")
    document.querySelector("#theme-style").href = "blue.css";
  else if (mode === "purple")
    document.querySelector("#theme-style").href = "purple.css";
};
setTheme = (mode) => {
  themeDiv[selectedTheme].classList.toggle("selected-theme");
  themeDiv[mode].classList.toggle("selected-theme");
  selectedTheme = mode;
  localStorage.setItem("theme", selectedTheme);
  if (mode === "light")
    document.querySelector("#theme-style").href = "default.css";
  else if (mode === "green")
    document.querySelector("#theme-style").href = "green.css";
  else if (mode === "blue")
    document.querySelector("#theme-style").href = "blue.css";
  else if (mode === "purple")
    document.querySelector("#theme-style").href = "purple.css";
};

let themeDiv = {};
themeDots.forEach((element) => {
  let mode = element.dataset.mode;
  themeDiv[mode] = element;
  if (mode === selectedTheme) {
    setTheme(mode);
    element.classList.add("selected-theme");
  }
  element.addEventListener("click", () => {
    setTheme(mode);
  });
});

themeDots.forEach((element) => {
  let mode = element.dataset.mode;
  element.addEventListener("mouseenter", () => {
    glanceTheme(mode);
  });
});

themeDots.forEach((element) => {
  let mode = element.dataset.mode;
  element.addEventListener("mouseleave", () => {
    setTheme(selectedTheme);
  });
});

localStorage.setItem("theme", selectedTheme);

let scrollLength = document.querySelector(".post-wrapper");

let leftBtn = document.querySelector(".arrow-btn.left");
let rightBtn = document.querySelector(".arrow-btn.right");

// leftBtn.classList.add("btn-hide");

scroll = (value) => {
  scrollLength.scrollLeft += value;
  if (scrollLength.scrollLeft <= 0) {
    leftBtn.classList.add("btn-hide");
    setTimeout(() => {
      if (scrollLength.scrollLeft > 0) {
        leftBtn.classList.remove("btn-hide");
      }
    }, 100);
  } else if (
    scrollLength.scrollLeft + scrollLength.offsetWidth >=
    scrollLength.scrollWidth
  ) {
    setTimeout(() => {
      rightBtn.classList.add("btn-hide");
    }, 10);
  } else {
    setTimeout(() => {
      rightBtn.classList.remove("btn-hide");
    }, 10);
  }
};

leftBtn.addEventListener("click", async () => {
  scroll(-scrollLength.clientWidth);
});

rightBtn.addEventListener("click", () => {
  scroll(scrollLength.clientWidth);
});

scrollLength.addEventListener("wheel", (event) => {
  scroll(event.deltaX * 10);
  scroll(event.deltaX * scrollLength.clientWidth);
});

var form = $("form#contact-form"),
  url =
    "https://script.google.com/macros/s/AKfycbxEhZFD5bi7Sv05YDUnV5UViAyhRxyndeNqs0su97H-EStdshQ/exec",
  sucessMessage = document.querySelector(".alert");
formvalidate = () => {
  var name = document.forms["contact-form"]["name"];
  var email = document.forms["contact-form"]["email"];
  var message = document.forms["contact-form"]["message"];
  var subject = document.forms["contact-form"]["subject"];
  let emailValidated = false,
    nameValidated = false,
    messageValidated = false,
    subjectValidated = false;
  if (!email.value.includes("@") || email.value.length < 5) {
    if (!subject.classList.contains("error-border")) {
      email.classList.toggle("error-border");
    }
    // window.alert("Please enter a valid e-mail address.");
    email.focus();
    emailValidated = false;
  } else if (email.classList.contains("error-border")) {
    email.classList.toggle("error-border");
    emailValidated = true;
  } else emailValidated = true;

  if (name.value.length < 5) {
    if (!subject.classList.contains("error-border")) {
      name.classList.toggle("error-border");
    }
    // window.alert("Please enter a name with atleast 5 charecters");
    name.focus();
    nameValidated = false;
  } else if (name.classList.contains("error-border")) {
    name.classList.toggle("error-border");
    nameValidated = true;
  } else nameValidated = true;

  if (message.value == "") {
    if (!message.classList.contains("error-border")) {
      message.classList.toggle("error-border");
    }
    // window.alert("Please write your message");
    message.focus();
    messageValidated = false;
  } else if (message.classList.contains("error-border")) {
    message.classList.toggle("error-border");
    messageValidated = true;
  } else messageValidated = true;

  if (subject.value == "") {
    if (!subject.classList.contains("error-border")) {
      subject.classList.toggle("error-border");
    }
    // window.alert("Please write some subject");
    subject.focus();
    subjectValidated = false;
  } else if (subject.classList.contains("error-border")) {
    subject.classList.toggle("error-border");
    subjectValidated = true;
  } else subjectValidated = true;
  
  if (emailValidated && messageValidated && nameValidated && subjectValidated) return true
  else return false
};

$("#submit-btn").on("click", (e) => {
  e.preventDefault();
  let validated = formvalidate();
  if (validated == true) {
    var mssg = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: form.serializeArray(),
      success: () => {
        $("#intro-section")[0].scrollIntoView();
        form[0].reset();
      },
    });

    sucessMessage.style.display = "block";
    setTimeout(() => {
      sucessMessage.style.display = "none";
    }, 10000);
  }
});
