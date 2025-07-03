async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works")
    const data = await response.json()
    return data
}

getWorks().then(data => {
    if (data.length > 0) {
        const sectionWork = document.querySelector(".gallery")


        for (let i = 0; i < data.length; i++) {

            const imgWork = document.createElement("img");
            imgWork.src = data[i].imageUrl

            const figcaptionWork = document.createElement("figcaption")
            figcaptionWork.innerText = data[i].title;

            const globalFig = document.createElement("figure")

            globalFig.appendChild(imgWork)
            globalFig.appendChild(figcaptionWork)

            sectionWork.appendChild(globalFig);
        }
    }
})
getWorks().then(data => {
    if (data.length > 0) {
        const divFiltres = document.querySelector(".filtres");

        //Bouton de "réactualisation" des filtres => apparition de tous les projets

        const tousBtn = document.createElement("button")
        tousBtn.id = "Tous";
        tousBtn.innerText = "Tous";
        tousBtn.classList.add("filter-btn")
        tousBtn.addEventListener("click", function () {
            const buttons = document.querySelectorAll(".filter-btn")

            buttons.forEach(button => {
                if (button === this) {
                    button.classList.add("selected")
                } else {
                    button.classList.remove("selected")
                }
            })
            const sectionWork = document.querySelector(".gallery")
            sectionWork.innerHTML = "";

            data.forEach(work => {
                const imgWork = document.createElement("img");
                imgWork.src = work.imageUrl

                const figcaptionWork = document.createElement("figcaption")
                figcaptionWork.innerText = work.title;

                const globalFig = document.createElement("figure")

                globalFig.appendChild(imgWork)
                globalFig.appendChild(figcaptionWork)

                sectionWork.appendChild(globalFig);
            })
        })

        // Boutons pour select only "Objets"

        const objetsBtn = document.createElement("button")
        objetsBtn.id = "Objets";
        objetsBtn.innerText = "Objets";
        objetsBtn.classList.add("filter-btn")
        objetsBtn.addEventListener("click", function () {
            const buttons = document.querySelectorAll(".filter-btn")

            buttons.forEach(button => {
                if (button === this) {
                    button.classList.add("selected")
                } else {
                    button.classList.remove("selected")
                }
            })
            const objWorks = data.filter(data => data.categoryId === 1)
            const sectionWork = document.querySelector(".gallery")
            sectionWork.innerHTML = "";

            objWorks.forEach(work => {
                const figure = document.createElement("figure");

                const img = document.createElement("img");
                img.src = work.imageUrl;

                const caption = document.createElement("figcaption");
                caption.innerText = work.title;

                figure.appendChild(img);
                figure.appendChild(caption);
                sectionWork.appendChild(figure);
            })
        })

        // Bouton pour faire apparaitre only "Appartements"

        const appartBtn = document.createElement("button")
        appartBtn.id = "Appartements";
        appartBtn.innerText = "Appartements";
        appartBtn.classList.add("filter-btn")
        appartBtn.addEventListener("click", function () {
            const buttons = document.querySelectorAll(".filter-btn")

            buttons.forEach(button => {
                if (button === this) {
                    button.classList.add("selected")
                } else {
                    button.classList.remove("selected")
                }
            })

            const appartWorks = data.filter(data => data.categoryId === 2)
            const sectionWork = document.querySelector(".gallery")
            sectionWork.innerHTML = ""

            appartWorks.forEach(work => {
                const figure = document.createElement("figure");

                const img = document.createElement("img");
                img.src = work.imageUrl;

                const caption = document.createElement("figcaption");
                caption.innerText = work.title;

                figure.appendChild(img);
                figure.appendChild(caption);
                sectionWork.appendChild(figure);
            })

        })

        // Bouton only Hôtels & Restaurants

        const hrBtn = document.createElement("button")
        hrBtn.id = "Hotels&Restaurants";
        hrBtn.innerText = "Hôtels & Restaurants";
        hrBtn.classList.add("filter-btn")
        hrBtn.addEventListener("click", function () {
            const buttons = document.querySelectorAll(".filter-btn")

            buttons.forEach(button => {
                if (button === this) {
                    button.classList.add("selected")
                } else {
                    button.classList.remove("selected")
                }
            })

            const hrWorks = data.filter(data => data.categoryId === 3)
            const sectionWork = document.querySelector(".gallery")
            sectionWork.innerHTML = ""

            hrWorks.forEach(work => {
                const figure = document.createElement("figure");

                const img = document.createElement("img");
                img.src = work.imageUrl;

                const caption = document.createElement("figcaption");
                caption.innerText = work.title;

                figure.appendChild(img);
                figure.appendChild(caption);
                sectionWork.appendChild(figure);
            })

        })

        divFiltres.appendChild(tousBtn);
        divFiltres.appendChild(objetsBtn);
        divFiltres.appendChild(appartBtn);
        divFiltres.appendChild(hrBtn);

    }
    //get the token 
    const token = localStorage.getItem("token")
    // use if -> when token ok -> change button login into logout
    if (token) {
        const logoutBtn = document.querySelector(".login")
        logoutBtn.innerText = "logout"
        console.log(token)

        // hide buttons when login
        const filtres = document.querySelector(".filtres")
        filtres.innerHTML = ""

        // create p and img (icon) 
        const modify = document.createElement("button")
        modify.setAttribute("id", "modify-button")
        modify.innerText = "Modifier"

        const modifyIcon = document.createElement("img")
        modifyIcon.setAttribute("alt", "icone modifier")
        modifyIcon.setAttribute("id", "modify-icon")
        modifyIcon.setAttribute("src", "/Portfolio-architecte-sophie-bluel_fv/FrontEnd/assets/icons/Group.png")

        //target section#portfolio 
        const portfolio = document.querySelector(".portfolio-title")


        //appear icon into p

        modify.appendChild(modifyIcon)

        portfolio.appendChild(modify)


        //now if click on the button -> remove token and reload page
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("token")
            window.location.reload()
        })

        modify.addEventListener("click", function () {
            getWorks().then(data => {
                if (data.length > 0) {
                    const modaleWorks = document.querySelector(".modale-works")

                    for (let i = 0; i < data.length; i++) {

                        const imgWork = document.createElement("img");
                        imgWork.src = data[i].imageUrl

                        modaleWorks.appendChild(imgWork);
                    }
                }
            })

        })
    }

})

const logBtn = document.querySelector(".login")
logBtn.addEventListener("click", function () {
    const main = document.querySelector("main");
    main.innerHTML = "";

    //Création titre Log In h2 dans page login
    const pageLogLogin = document.createElement("h2");
    pageLogLogin.classList.add("h2-login-page")
    pageLogLogin.innerText = "Log In";
    main.appendChild(pageLogLogin)

    // Création du form
    const formLogin = document.createElement("form")
    formLogin.id = "login-form"

    //Création label et input email.
    const labelEmail = document.createElement("label")
    labelEmail.setAttribute("for", "email");
    labelEmail.classList.add("labelemail")
    labelEmail.innerText = "E-mail"

    const inputEmail = document.createElement("input")
    inputEmail.setAttribute("id", "email-login")
    inputEmail.setAttribute("type", "email")

    // création label + input mdp.
    const labelPassword = document.createElement("label")
    labelPassword.setAttribute("for", "password")
    labelPassword.classList.add("labelpassword")
    labelPassword.innerText = "Mot de passe"

    const inputPassword = document.createElement("input")
    inputPassword.setAttribute("type", "password")
    inputPassword.setAttribute("id", "password")

    //Create button "se connecter"
    const connectBtn = document.createElement("button")
    connectBtn.innerText = "Se connecter"
    connectBtn.setAttribute("id", "connect-btn")
    connectBtn.setAttribute("type", "submit")

    // Create "Mot de passe oublié"
    const forgetPassword = document.createElement("p")
    forgetPassword.innerText = "Mot de passe oublié"
    forgetPassword.classList.add("forget-user-password")

    // Intégration des éléments créés ci dessus (label et input pour la page login)
    main.appendChild(formLogin)

    formLogin.appendChild(labelEmail)
    formLogin.appendChild(inputEmail)

    formLogin.appendChild(labelPassword)
    formLogin.appendChild(inputPassword)
    formLogin.appendChild(connectBtn)
    formLogin.appendChild(forgetPassword)

    getUsers()
})

async function getUsers() {
    // viser le "form" pour capter meme un appui sur la touche entrée
    const formSubmit = document.querySelector("#login-form")
    console.log("form ready")

    //add click submit function
    formSubmit.addEventListener("submit", async function (event) {
        event.preventDefault()
        console.log("form submitted")
        // get elem email(id email-login) and password(id password)
        const getInputEmail = document.getElementById("email-login")
        const inputEmail = getInputEmail.value;

        const getInputPassword = document.getElementById("password")
        const inputPassword = getInputPassword.value;

        console.log("Email :", inputEmail, "password :", inputPassword)
        try {
            //post user email and password auth ? 
            const userResponse = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: inputEmail,
                    password: inputPassword,
                })
            });

            if (!userResponse.ok) {
                const errorInterface = document.getElementById("login-form")

                //recup errorInterface (the form in login page)
                const errorAppeared = document.getElementById("error-message");

                //create if to let appear just 1 errorMessage
                if (errorAppeared === null) {

                    //create error message
                    const errorMessage = document.createElement("p")

                    // errorMessage.id = errorMessage.setAttribute("id", "error-message") did for training
                    errorMessage.id = "error-message";
                    errorMessage.innerText = "Identifiant ou mot de passe incorrect"

                    // made the message appear in errorInterface
                    errorInterface.appendChild(errorMessage);
                }

                return;
            }
            // get the data of user bc auth ok
            const dataUsers = await userResponse.json();
            const token = dataUsers.token;
            localStorage.setItem("token", dataUsers.token)

            // we want to go back to the "accueil" page
            window.location.href = "http://127.0.0.1:5500/Portfolio-architecte-sophie-bluel_fv/FrontEnd/index.html"

            //and need change login button into logout button



        } catch (error) {
            console.log("error during request", error)
        }
    })
}


