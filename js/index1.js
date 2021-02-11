const search = document.getElementById("search")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const main = document.getElementById("main")
let page=1;
let nothing = false;
let total_pages;

async function getImages(text){
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${text}&client_id=`)
    const json = await response.json();
    if(page==1){
        prev.classList.remove("prev-h")
    }
    else{
        prev.classList.add("prev-h")
    }
    if(page == json.total_pages){
        next.classList.remove("next-h")
    }
    else{
        next.classList.add("next-h")
    }
    
    if(json.total===0){
        nothing = true;
        
    }
    total_pages = json.total_pages
    console.log(json)
    return json.results;
}

function imageHTML(photos){
    let myPhotos = photos.map(photo=>{
        return `<div class="container">
                    <img class="img" src="${photo.urls.regular}">
                    <div class="content">
                        <div class="desc">${photo.alt_description}</div>
                        <div class="likes">👍 ${photo.likes}</div>
                    </div>
                </div>
                `            
    }).join('');
    const main = document.getElementById("main")
    main.innerHTML = `<div class="elements">${myPhotos}</div>`
}

async function displayImages(){
    const searchText = await document.getElementById("text").value
    console.log(searchText)
    await getImages(searchText).then(imageHTML)
    if(nothing==false){
        next.style.display = "block";
        prev.style.display = "block";
    }
    else{
        const err = `<div class="error">
            <h3>⚠️ No items found with the name ${searchText} ...</h3>
        </div>`
        main.innerHTML = err;
        next.style.display = "none";
        prev.style.display = "none";
        nothing=false;
    }
}
search.addEventListener("click", function(){
    page=1;
    displayImages()
})

document.addEventListener("keyup", e=>{
    const searchText = document.getElementById("text").value
    if(e.keyCode===13 && searchText){
        page=1;
        displayImages()
    }
})

next.addEventListener("click", function(){
    page++;
    displayImages()
    console.log("Page: "+ page)
    
})
prev.addEventListener("click", function(){
    page--;
    displayImages()
    console.log("Page: "+ page)
    
})
