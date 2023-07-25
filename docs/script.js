let link;

function removeAllChildNodes(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function updateSidebar(data){
    removeAllChildNodes(document.getElementById("desktop-sidebar"));

    data = data.split('\n');

    let newDropdown;
    let headerDiv;
    let bodyDiv;

    for(let i = 0; i < data.length; i++){
        if(data[i][0] === "#"){
            if(i !== 0){
                newDropdown.append(headerDiv, bodyDiv);
                document.getElementById("desktop-sidebar").appendChild(newDropdown);
            }

            newDropdown = document.createElement("div");
            headerDiv = document.createElement("div");
            bodyDiv = document.createElement("div");
            newDropdown.classList.add("sidebar-dropdown");

            const match = data[i].match(/#(.+)<(.+)>/);

            const newImg = document.createElement("img");
            const para = document.createElement("p");
            const arrowDiv = document.createElement("div");
            const arrowImg = document.createElement("img");

            para.innerHTML = match[1];
            arrowImg.src = "../icons/sidebar/expand_down.png";
            newImg.src = `../icons/sidebar/${match[2]}.png`;

            arrowDiv.appendChild(arrowImg);
            headerDiv.append(newImg, para, arrowDiv);
        } else {
            const match = data[i].match(/\((.+)\)\[(.+)]<(.+)>/);

            const newDiv = document.createElement("div");
            const img = document.createElement("img");
            const para = document.createElement("p");

            img.src = `../icons/sidebar/${match[3]}.png`;
            newDiv.addEventListener("click", function(e){
                location.href = `./${match[2]}.html`
            });

            if(location.href.split("/")[location.href.split("/").length - 1] === `${match[2]}.html`){
                newDiv.classList.add("active-sidebar-dropdown-category");

                const locationDiv = document.createElement("div");
                const locationImg = document.createElement("img");
                const locationPara1 = document.createElement("p");
                const locationPara2 = document.createElement("p");

                link = `${match[2]}.html`;
                console.log(link);

                locationPara1.innerHTML = headerDiv.children[1].textContent;
                locationPara2.innerHTML = match[1];
                locationImg.src = "../icons/sidebar/expand_down.png";

                locationDiv.append(locationPara1, locationImg, locationPara2);
                locationDiv.classList.add("location");

                document.getElementById("parent-container").insertBefore(locationDiv, document.getElementById("parent-container").firstChild);
            }

            para.innerHTML = match[1];

            newDiv.append(img, para);
            bodyDiv.appendChild(newDiv);
        }
    }

    newDropdown.append(headerDiv, bodyDiv);
    document.getElementById("desktop-sidebar").appendChild(newDropdown);

    document.querySelectorAll(".sidebar-dropdown").forEach(function(elem){
        elem.children[0].addEventListener("click", function(e){
            if(elem.classList.contains("active-sidebar-dropdown")){
                elem.classList.remove("active-sidebar-dropdown");
            } else {
                elem.classList.add("active-sidebar-dropdown");
            }
        });

        elem.classList.add("active-sidebar-dropdown");
    })
}

async function initialize(){
    await fetch("pages.dat", {
	method: 'GET',
	headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
	mode: 'cors'
    })
        .then((res) => res.text())
        .then((text) => {
            updateSidebar(text);
        })
        .catch((e) => console.error(e));

    for(let i = 0; i < document.getElementsByTagName("h2").length; i++){
        const newLink = document.createElement("a");
        newLink.innerHTML = document.getElementsByTagName("h2")[i].textContent;
        newLink.href = `${link}#${document.getElementsByTagName("h2")[i].textContent}`;

        newLink.onclick = function(){
            setTimeout(function(){
                window.history.pushState("", "", `${link}`);
            },0)
        }

        document.getElementsByTagName("h2")[i].id = `${document.getElementsByTagName("h2")[i].textContent}`;

        document.getElementById("parent-navigation").appendChild(newLink);
    }

    document.querySelectorAll(".accordion").forEach(function(elem){
        for(let i = 0; i < elem.children.length; i++){
            elem.children[i].addEventListener("click", function(e){
                if(elem.children[i].classList.contains("active-accordion")){
                    elem.children[i].classList.remove("active-accordion");
                } else {
                    elem.children[i].classList.add("active-accordion");
                }
            })
        }
    })
}

initialize();