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
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const userList = JSON.parse(localStorage.getItem("users")) || [];
    console.log(userList)
    let isPresent = false;
    if (userList && userList.length > 0) {
        userList.forEach(async (user) => {
            if (user.email == inpEmail.value) {
                isPresent = true;
                const hashedPassword = await hashPassword(inpPasswd.value.trim());
                if (user.passwd == hashedPassword) {
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