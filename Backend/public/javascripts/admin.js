var adminName = "test";
var adminPassword = "1234";

var page = document.getElementById("mainPage");

console.log(localStorage);
MainPage();

function MainPage() {
    if (localStorage.getItem("admin") == adminPassword) {
        AdminPage();
    }
    else {
        LoginPage();
    }
}

function LoginPage() {
    page.innerHTML = "";
    page.insertAdjacentHTML("beforeend", "<div><h2>Logga in som admin</h2></div><div><form><div><input class='login' type='text' id='username' placeholder='Användarnamn'></div></br><div><input class='login' type='password' id='password' placeholder='Lösenord'></div></form><button id='loginBtn' type='button' class='loginBtn'>Logga in</button></div>");

    let loginButton = document.getElementById("loginBtn");

    loginButton.addEventListener("click", function () {
        let name = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if (name == adminName && password == adminPassword) {
            localStorage.setItem(adminName, adminPassword)
            console.log("Inloggad");
            AdminPage();

        }
        else {
            console.log("Misslyckad inloggning");
            page.innerHTML = "";
            page.insertAdjacentHTML("beforeend", "<div><h3>Inloggning misslyckades!</h3><button id='loginBtn' onclick='LoginPage()'>Försök igen</button></div>")
        }
    });
}

function AdminPage() {
    page.innerHTML = "";
    page.insertAdjacentHTML("beforeend",
        `
    <div><h1 class="header">Administration</h1><div>
    <div class="container">
        <div class="column"><button id="btn-standard" onclick="showAllUsers()"> Visa alla användare </button></div>
        <div class="column"><button id="btn-standard" onclick="showAllSubscribers()"> Visa alla prenumeranter </button></div>
        <div class="column"><button id="btn-standard" onclick="logout()"> Logga ut </button></div>
    </div>

    `);
}

function showAllUsers() {
    fetch('http://localhost:9000/users')
        .then(res => res.json())
        .then(function (json) {
            page.innerHTML = "";
            page.insertAdjacentHTML("beforeend", "<div><h3>Alla användare:</h3></div>");

            for (i = 0; i < json.length; i++) {
                page.insertAdjacentHTML("beforeend", "<ul><li> Namn: " + json[i].userName + "</li><li> Email: " + json[i].userEmail + "</li><li> Prenumerant: " + json[i].subscribe + "</li></ul>");
            }

            page.insertAdjacentHTML("beforeend", "<div><button id='goBackButton' onclick='AdminPage()'> Gå tillbaka </button></div>");
        })
}

function showAllSubscribers() {
    fetch('http://localhost:9000/users')
        .then(res => res.json())
        .then(function (json) {
            page.innerHTML = "";
            page.insertAdjacentHTML("beforeend", "<div><h3>Prenumererar på nyhetsbrevet:</h3></div>");
            
            let allSubscribers = "";
            var subscribers = json.filter(a => a.subscribe == true);

            for (i = 0; i < subscribers.length; i++) {
                allSubscribers += subscribers[i].userEmail + ", ";
            }

            page.insertAdjacentHTML("beforeend", "<div>" + allSubscribers + "</div>");
            page.insertAdjacentHTML("beforeend", "<div><button id='goBackButton' onclick='AdminPage()'> Gå tillbaka </button></div>");
        })
}

function logout() {
    localStorage.clear();
    MainPage();
}

