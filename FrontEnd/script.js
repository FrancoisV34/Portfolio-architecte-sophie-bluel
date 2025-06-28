async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works")
    const data = await response.json();
    return data;
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
        tousBtn.addEventListener("click", function () {
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
        objetsBtn.addEventListener("click", function () {
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
        appartBtn.addEventListener("click", function () {
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
        hrBtn.addEventListener("click", function () {
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
    formLogin.classList.add("login")

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

    //CSS du Form et rajouter lien "mdp oublié"
})


