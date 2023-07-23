let ctrlDown = false;

window.addEventListener("keydown", function(e){
    if(e.metaKey || e.keyCode === 17) ctrlDown = true;

    else if (e.keyCode === 75){
        e.preventDefault();
        e.stopPropagation();
        document.getElementById("search-input").focus();
    };
})

window.addEventListener("keyup", function(e){
    if(e.metaKey || e.keyCode === 17) ctrlDown = false;
})