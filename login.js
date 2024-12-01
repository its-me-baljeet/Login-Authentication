const inpEmail = document.getElementById("email");
const inpPasswd = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
console.log(loginBtn);

let loginName;

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const userList = JSON.parse(localStorage.getItem("users")) || [];
    console.log(userList)
    let isPresent = false;
    if (userList && userList.length > 0) {
        userList.forEach(user => {
            if (user.email == inpEmail.value && user.passwd == inpPasswd.value) {
                loginName = user.name;
                isPresent = true;
                localStorage.setItem("isLogin", JSON.stringify({ name: loginName }));
                window.location.href = "authenticated.html";
            }
        });
    }
    if (!isPresent) {
        console.log("No accounts");
    }
    localStorage.setItem("users", JSON.stringify(userList));
})