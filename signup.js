const inpUsername = document.getElementById("username");
const inpEmail = document.getElementById("email");
const inpPasswd = document.getElementById("password");
const inpConfPasswd = document.getElementById("confirm-password");
const signupBtn = document.getElementById("signup-btn");

const uNameError = document.getElementById("username-error");
const emailError = document.getElementById("email-error");
const passwdError = document.getElementById("passwd-error");
const confError = document.getElementById("conf-error");


async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Helper Functions
const setError = (element, message, errorElement) => {
    errorElement.textContent = message;
    element.style.borderColor = message ? "red" : "green";
};

const validateUsername = () => {
    const value = inpUsername.value.trim();
    const userList = JSON.parse(localStorage.getItem("users")) || [];
    let errorMsg = "";

    if (value === "") {
        errorMsg = "Username cannot be empty.";
    } else if (/[0-9]/.test(value[0])) {
        errorMsg = "First character can't be a number.";
    } else if (/\s/.test(value)) {
        errorMsg = "Username cannot contain spaces.";
    } else if (userList.some(user => user.name === value)) {
        errorMsg = "Username already taken.";
    }

    setError(inpUsername, errorMsg, uNameError);
    return !errorMsg;
};

const validateEmail = () => {
    const value = inpEmail.value.trim();
    const userList = JSON.parse(localStorage.getItem("users")) || [];
    let errorMsg = "";

    if (value === "") {
        errorMsg = "Email cannot be empty.";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMsg = "Invalid email format.";
    } else if (userList.some(user => user.email === value)) {
        errorMsg = "Email already exists.";
    }

    setError(inpEmail, errorMsg, emailError);
    return !errorMsg;
};

const validatePassword = () => {

    let errorMsg = "";
    const value = inpPasswd.value;
    if (value === "") {
        errorMsg = "Password cannot be empty.";
    } else if (!/[A-Z]/.test(value)) {
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

    setError(inpPasswd, errorMsg, passwdError);
    return !errorMsg;
};

const validateConfirmPassword = () => {
    const value = inpConfPasswd.value.trim();
    let errorMsg = "";

    if (value === "") {
        errorMsg = "Confirm Password cannot be empty.";
    } else if (value !== inpPasswd.value.trim()) {
        errorMsg = "Passwords do not match.";
    }

    setError(inpConfPasswd, errorMsg, confError);
    return !errorMsg;
};

// Event Listeners for Real-Time Feedback
inpUsername.addEventListener("input", validateUsername);
inpEmail.addEventListener("input", validateEmail);
inpPasswd.addEventListener("input", validatePassword);
inpConfPasswd.addEventListener("input", validateConfirmPassword);

// Form Submission
signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        // Save user data in local storage
        const userList = JSON.parse(localStorage.getItem("users")) || [];
        const hashedPassword = await hashPassword(inpPasswd.value.trim());
        const user = {
            name: inpUsername.value.trim(),
            email: inpEmail.value.trim(),
            passwd: hashedPassword
        };
        userList.push(user);
        localStorage.setItem("users", JSON.stringify(userList));

        // Redirect to login page
        window.location.href = "login.html";
    }
});