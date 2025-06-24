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
            console.log(imgWork)

            const figcaptionWork = document.createElement("figcaption")
            figcaptionWork.innerText = data[i].title;
            console.log(figcaptionWork)

            const globalFig = document.createElement("figure")



            globalFig.appendChild(imgWork)
            globalFig.appendChild(figcaptionWork)

            sectionWork.appendChild(globalFig);
        }

    }
})

console.log("caca")
