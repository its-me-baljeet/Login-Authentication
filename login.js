const inpEmail = document.getElementById("email");
const inpPasswd = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const errorMsg = document.getElementById("error-msg");
console.log(loginBtn);

let loginName;

inpEmail.addEventListener("input", () => {
    errorMsg.textContent = "";
})
inpPasswd.addEventListener("input", () => {
    errorMsg.textContent = "";
})
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const userList = JSON.parse(localStorage.getItem("users")) || [];
    console.log(userList)
    let isPresent = false;
    if (userList && userList.length > 0) {
        userList.forEach(user => {
            if (user.email == inpEmail.value) {
                isPresent = true;
                if (user.passwd == inpPasswd.value) {
                    loginName = user.name;
                    localStorage.setItem("isLogin", JSON.stringify({ name: loginName }));
                    window.location.href = "authenticated.html";
                }
                else {
                    errorMsg.textContent = "Incorrect Password!";
                }
            }
        });
    };
    if (!isPresent) {
        console.log("No accounts");
        errorMsg.textContent = "Account doesn't exist!";
    }
    localStorage.setItem("users", JSON.stringify(userList));
})