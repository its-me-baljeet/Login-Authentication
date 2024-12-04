const inpUsername = document.getElementById("username");
const inpEmail = document.getElementById("email");
const inpPasswd = document.getElementById("password");
const inpConfPasswd = document.getElementById("confirm-password");
const signupBtn = document.getElementById("signup-btn");

const errorDiv = document.getElementById("password-error");

inpPasswd.addEventListener("input", () => {
    const value = inpPasswd.value.trim();
    let errorMsg = "";

    if (!/[A-Z]/.test(value)) {
        errorMsg = "Password must include at least one uppercase letter.";
    } else if (!/[a-z]/.test(value)) {
        errorMsg = "Password must include at least one lowercase letter.";
    } else if (!/[0-9]/.test(value)) {
        errorMsg = "Password must include at least one number.";
    } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) {
        errorMsg = "Password must include at least one special character.";
    } else if (/\s/.test(value)) {
        errorMsg = "Password cannot contain spaces.";
    } else if (value.length < 8) {
        errorMsg = "Password must be at least 8 characters long.";
    }

    errorDiv.textContent = errorMsg;
    inpPasswd.style.borderColor = errorMsg ? "red" : "green";
});

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const username = inpUsername.value.trim();
    const email = inpEmail.value.trim();
    const passwd = inpPasswd.value.trim();
    const confPasswd = inpConfPasswd.value.trim();

    if (validateForm(username, email, passwd, confPasswd)) {
        // Save user data in local storage
        const userList = JSON.parse(localStorage.getItem("users")) || [];
        const user = { name: username, email: email, passwd: passwd };
        userList.push(user);
        localStorage.setItem("users", JSON.stringify(userList));

        // Redirect to login page
        window.location.href = "login.html";
    }
});

function validateForm(username, email, passwd, confPasswd) {
    let isValid = true;
    if (username === "") {
        displayError(inpUsername, "Username cannot be empty");
        isValid = false;
    }

    if (email === "") {
        displayError(inpEmail, "Email cannot be empty");
        isValid = false;
    }

    if (passwd === "") {
        displayError(inpPasswd, "Password cannot be empty");
        isValid = false;
    }

    if (confPasswd !== passwd) {
        displayError(inpConfPasswd, "Passwords do not match");
        isValid = false;
    }

    return isValid;
}

function displayError(field, message) {
    field.placeholder = message;
    field.style.borderColor = "red";
}
