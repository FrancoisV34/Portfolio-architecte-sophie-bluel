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
            globalFig.dataset.id = data[i].id;

            globalFig.appendChild(imgWork)
            globalFig.appendChild(figcaptionWork)

            sectionWork.appendChild(globalFig);
        }
    }
})
async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories")
    const categories = await response.json()
    return categories;
}


getWorks().then(data => {
    if (data.length > 0) {
        const divFiltres = document.querySelector(".filtres");

        //Bouton de "réactualisation" des filtres => apparition de tous les projets

        const tousBtn = document.createElement("button")
        tousBtn.dataset.categoryId = "Tous";
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
        getCategories().then(categories => {
            if (data.length > 0) {
                const divFiltres = document.querySelector(".filtres");

                //Bouton de "réactualisation" des filtres => apparition de tous les projets

                const tousBtn = document.createElement("button")
                tousBtn.dataset.categoryId = "Tous";
                tousBtn.innerText = "Tous";
                tousBtn.classList.add("filter-btn")

                divFiltres.appendChild(tousBtn);

                categories.forEach(category => {
                    const filterButton = document.createElement("button")
                    filterButton.classList.add("filter-btn")
                    filterButton.dataset.categoryId = category.id;
                    filterButton.innerText = category.name;

                    divFiltres.appendChild(filterButton);
                })
                const buttons = document.querySelectorAll(".filter-btn")

                buttons.forEach(button => {
                    button.addEventListener("click", function () {
                        buttons.forEach(selectedBtn => {
                            selectedBtn.classList.toggle("selected", selectedBtn === this);
                        });


                        const sectionWork = document.querySelector(".gallery")
                        sectionWork.innerHTML = "";

                        if (this.dataset.categoryId === "Tous") {

                            data.forEach(work => {
                                const globalFig = document.createElement("figure")

                                const imgWork = document.createElement("img");
                                imgWork.src = work.imageUrl

                                const figcaptionWork = document.createElement("figcaption")
                                figcaptionWork.innerText = work.title;



                                globalFig.appendChild(imgWork)
                                globalFig.appendChild(figcaptionWork)

                                sectionWork.appendChild(globalFig);
                            });
                        } else {

                            const categoryId = parseInt(this.dataset.categoryId);
                            const filtered = data.filter(work => work.categoryId === categoryId);

                            filtered.forEach(work => {
                                const globalFig = document.createElement("figure")

                                const imgWork = document.createElement("img");
                                imgWork.src = work.imageUrl

                                const figcaptionWork = document.createElement("figcaption")
                                figcaptionWork.innerText = work.title;

                                globalFig.appendChild(imgWork)
                                globalFig.appendChild(figcaptionWork)

                                sectionWork.appendChild(globalFig);
                            });

                        }
                    });
                });
            }
        });

        const buttons = document.querySelectorAll(".filter-btn")
        buttons.forEach(button => {
            button.addEventListener("click", function () {
                buttons.forEach(selectedBtn => {
                    if (selectedBtn === this) {
                        selectedBtn.classList.add("selected")
                    } else {
                        selectedBtn.classList.remove("selected")
                    }
                });

                const objWorks = data.filter(work => work.categoryId === parseInt(this.dataset.categoryId));
                const sectionWork = document.querySelector(".gallery");
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
        })
    }
})

const selectCategories = document.getElementById("upload-category");
getCategories().then(categories => {
    try {
        const defaultOption = document.createElement("option");
        defaultOption.innerText = "";
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;

        selectCategories.appendChild(defaultOption);

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.innerText = category.name;
            selectCategories.appendChild(option);

        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
});


// Boutons pour select only "Objets"






//get the token 
const token = localStorage.getItem("token")
// use if -> when token ok -> change button login into logout
if (token) {
    const logoutBtn = document.querySelector(".login")
    logoutBtn.innerText = "logout"
    console.log("token ok", token)
    // hide buttons when login
    const divFiltres = document.querySelector(".filtres");
    divFiltres.style.display = "none";

    const divGallery = document.querySelector(".gallery");
    divGallery.style.marginTop = "50px";

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

    //open modale
    modify.addEventListener("click", function () {
        getWorks().then(data => {
            const modale = document.querySelector(".modale");

            const modaleOne = document.querySelector(".modale1")
            modaleOne.style.display = "flex";

            const modaleTwo = document.querySelector(".modale2")
            modaleTwo.style.display = "none";

            modale.style.visibility = "visible";
            modale.removeAttribute("aria-hidden")
            modale.setAttribute("aria-modal", "true");

            console.log(token)


            if (data.length > 0) {
                const modaleWorks = document.querySelector(".modale-works")
                modaleWorks.innerHTML = "";

                for (let i = 0; i < data.length; i++) {

                    const divWork = document.createElement("div");
                    divWork.classList.add("work-item");

                    const imgWork = document.createElement("img");
                    imgWork.src = data[i].imageUrl

                    divWork.dataset.id = data[i].id;

                    const trashImg = document.createElement("img")
                    trashImg.src = "/Portfolio-architecte-sophie-bluel_fv/FrontEnd/assets/icons/trash.png"
                    trashImg.alt = "trash icon"

                    const trashBtn = document.createElement("button")
                    trashBtn.classList.add("trash-icon");

                    trashBtn.appendChild(trashImg);

                    divWork.appendChild(imgWork);
                    divWork.appendChild(trashBtn);

                    modaleWorks.appendChild(divWork);

                    trashBtn.addEventListener("click", async function () {
                        try {
                            const response = await fetch(`http://localhost:5678/api/works/${divWork.dataset.id}`, {
                                method: "DELETE",
                                headers: {
                                    "Authorization": `Bearer ${token}`,
                                    "Content-type": "application/json"
                                }
                            });
                            if (response.ok) {
                                divWork.remove();

                                const deletedFigure = document.querySelector(`figure[data-id="${divWork.dataset.id}"]`);
                                deletedFigure.remove();
                                console.log("Project deleted");
                            } else {
                                console.log("delete failed");
                            }
                        } catch (error) {
                            console.log("Error deleting work:", error);
                        }
                    });
                }
            }
        });

    })

    //make a function and call function if click on the button ...

    const addPhotoBtn = document.querySelector(".add-photo")
    addPhotoBtn.addEventListener("click", function () {
        // hide modale1
        const modale1 = document.querySelector(".modale1")
        modale1.style.display = "none";

        //appear modale2
        const modale2 = document.querySelector(".modale2")
        modale2.style.visibility = "visible";
        modale2.style.display = "flex"

        const modaleContent = document.querySelector(".modale-content")
        modaleContent.appendChild(modale2);

        const backArrow = document.querySelector(".back")
        backArrow.style.visibility = "visible";

        const fileInput = document.getElementById("photoupload");
        const titleInput = document.getElementById("title");
        const categorySelect = document.getElementById("upload-category");
        const logoUploadImg = document.getElementById("logo-upload-img");
        const spanUploadDetails = document.querySelector(".upload-details");
        const labelPhotoupload = document.getElementById("label-photoupload");
        const uploadDiv = document.querySelector(".upload");

        function checkFormComplete() {

            const file = fileInput.files[0];
            const title = titleInput.value.trim();
            const category = categorySelect.value;
            const validationBtn = document.querySelector(".valid-upload");

            if (file) {
                const oldUploadedImage = document.querySelector(".uploaded-image");
                if (oldUploadedImage) {
                    oldUploadedImage.remove();
                }
                const uploadedImage = document.createElement("img");
                uploadedImage.src = URL.createObjectURL(file);
                uploadedImage.alt = "Aperçu de l'image téléchargée";
                uploadedImage.classList.add("uploaded-image");
                logoUploadImg.hidden = true;
                spanUploadDetails.hidden = true;
                labelPhotoupload.hidden = true;

                uploadDiv.appendChild(uploadedImage);
            }


            if (file && title !== "" && category !== "") {

                validationBtn.style.backgroundColor = "#1D6154";
                validationBtn.style.color = "#fff";

                console.log("Formulaire complet");
            }
        }
        fileInput.addEventListener("change", checkFormComplete);
        titleInput.addEventListener("input", checkFormComplete);
        categorySelect.addEventListener("change", checkFormComplete);
    })

    //close modale with click outside the modale, on the xmark and with escape key
    let modaleContent = document.querySelector(".modale-content")
    const modale = document.querySelector(".modale");
    const xmark = document.querySelector(".xmark")

    const closeModale = function (event) {
        if (!modaleContent.contains(event.target) || xmark.contains(event.target)) {
            event.preventDefault();
            document.activeElement.blur();

            modale.style.visibility = "hidden";
            modale.setAttribute("aria-hidden", "true");
            modale.removeAttribute("aria-modal");

            const modale2 = document.querySelector(".modale2")
            modale2.style.visibility = "hidden";


            backArrow.style.visibility = "hidden";
        }
    }
    // back arrow function
    const backArrow = document.querySelector(".back")
    const backModaleOne = function (event) {
        event.preventDefault();
        document.activeElement.blur();

        const modale1 = document.querySelector(".modale1")
        modale1.style.display = "flex";

        const modale2 = document.querySelector(".modale2")
        modale2.style.display = "none";

        modale2.style.visibility = "hidden";
        backArrow.style.visibility = "hidden";
    }
    backArrow.addEventListener("click", backModaleOne)
    modale.addEventListener("click", closeModale);
    xmark.addEventListener("click", closeModale);
    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape" || event.key === "Esc") {
            closeModale(event);
        }
    })
}

function displayWorks(works) {
    const sectionWork = document.querySelector(".gallery");
    sectionWork.innerHTML = "";

    works.forEach(work => {
        const imgWork = document.createElement("img");
        imgWork.src = work.imageUrl;

        const figcaptionWork = document.createElement("figcaption");
        figcaptionWork.innerText = work.title;

        const globalFig = document.createElement("figure");
        globalFig.appendChild(imgWork);
        globalFig.appendChild(figcaptionWork);

        sectionWork.appendChild(globalFig);
    });
}

const uploadForm = document.querySelector(".upload-file-form")
uploadForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    console.log("form déclenché");
    const fileInput = document.getElementById("photoupload");
    const titleInput = document.getElementById("title");
    const categorySelect = document.getElementById("upload-category");

    const file = fileInput.files[0];
    const title = titleInput.value;
    const category = categorySelect.value;

    if (!file || !title || !category) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
        });

        if (response.ok) {
            const newWork = await response.json();
            // ici mettre a jour l'affichage direct dans .gallery

            // Recharge tous les works après ajout
            const updatedWorks = await getWorks();
            displayWorks(updatedWorks);

            //  + aperçu après chargement image et avant submit

            console.log("Nouveau projet ajouté :", newWork);
        } else {
            const errorResponse = await response.json();
            console.error("Erreur lors de l'ajout du projet :", errorResponse);
        }
    } catch (error) {
        console.error("Erreur de réseau :", error);
    }
});

const projectBtn = document.querySelector(".projet")
projectBtn.addEventListener("click", function () {
    window.location.href = "http://127.0.0.1:5500/Portfolio-architecte-sophie-bluel_fv/FrontEnd/index.html"
});

const logBtn = document.querySelector(".login")
logBtn.addEventListener("click", function () {
    const main = document.querySelector("main");
    main.innerHTML = "";

    logBtn.style.fontWeight = "600";
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
    labelEmail.setAttribute("for", "email-login");
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

    //add click submit function
    formSubmit.addEventListener("submit", async function (event) {
        event.preventDefault()
        // get elem email(id email-login) and password(id password)
        const getInputEmail = document.getElementById("email-login")
        const inputEmail = getInputEmail.value;

        const getInputPassword = document.getElementById("password")
        const inputPassword = getInputPassword.value;

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
            localStorage.setItem("token", dataUsers.token);

            // we want to go back to the "accueil" page
            window.location.href = "http://127.0.0.1:5500/Portfolio-architecte-sophie-bluel_fv/FrontEnd/index.html"

        } catch (error) {
        }
    })
}
