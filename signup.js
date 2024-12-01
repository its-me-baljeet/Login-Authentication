const inpUsername = document.getElementById("username");
const inpEmail = document.getElementById("email");
const inpPasswd = document.getElementById("password");
const inpConfPasswd = document.getElementById("confirm-password");
const signupBtn = document.getElementById("signup-btn");

const usernamePlacehld = inpUsername.placeholder;

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const username = inpUsername.value;
    const email = inpEmail.value;
    const passwd = inpPasswd.value;
    const confPasswd = inpConfPasswd.value;
    validateForm(inpUsername, inpEmail, inpPasswd, inpConfPasswd)

    //saving in local storage
    const userList = JSON.parse(localStorage.getItem("users")) || [];
    const user = {
        name: username,
        email: email,
        passwd: passwd,
        confPasswd: confPasswd
    }
    userList.push(user);
    localStorage.setItem("users", JSON.stringify(userList));
    window.location.href = "login.html"
});
function validateForm(inpUsername, inpEmail, inpPasswd, inpConfPasswd) {
    checkUsername(inpUsername);
    checkEmail(inpEmail);
    checkPasswd(inpPasswd);
    checkConfPasswd(inpPasswd, inpConfPasswd);
};

function checkUsername(inpUsername) {
    checkEmpty(inpUsername);
}
function checkEmail(inpEmail) {
    checkEmpty(inpEmail);
}
function checkPasswd(inpPasswd) {
    checkEmpty(inpPasswd);
}
function checkConfPasswd(inpPasswd, inpConfPasswd) {
    checkEmpty(inpConfPasswd);
}
function checkEmpty(field) {
    if (field.value.length == 0) {
        field.placeholder = "This field can't be empty";
        field.style.borderColor = "red"
        console.log("cant empty");
    }
}