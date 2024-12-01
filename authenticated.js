const headingName = document.getElementById("heading");
const logoutBtn = document.getElementById("logout-btn");
const loginList = JSON.parse(localStorage.getItem("isLogin"));
if (loginList) {
    headingName.textContent = loginList.name + " is Logged in!";
    localStorage.setItem("isLogin", JSON.stringify(loginList));
}
logoutBtn.addEventListener("click", () => {
    const loginList = JSON.parse(localStorage.getItem("isLogin"));
    delete loginList;
    console.log(loginList)
    localStorage.setItem("isLogin", JSON.stringify(loginList));
    document.location.href = "index.html";
});