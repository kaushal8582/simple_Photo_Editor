// Write your javascript here
const fileInput = document.querySelector(".file-input")
const choseBtn = document.querySelector(".choose")
const container = document.querySelector(".container")
const image = document.querySelector(".img-div img")
const buttons = document.querySelectorAll(".options .button")
const filterValue = document.querySelector(".filter-info .value")
const slider = document.querySelector(".slider input")
const rotateAll = document.querySelectorAll(".options .rotateicon")
const resetFilter = document.querySelector(".reset-filter")
const saveBtn = document.querySelector(".save")

let britness = 100
let grayscale = 0
let contrast = 100
let invert = 0
let rotate = 0
let scaleTop = 1
let scaleleft = 1

function stlyePhoto() {
    
    image.style.transform = `rotate(${rotate}deg) scale(${scaleTop}, ${scaleleft})`
    image.style.filter = ` brightness(${britness}%) contrast(${contrast}%) grayscale(${grayscale}%) invert(${invert}%)`
}

function reset() {
    britness = 100
    grayscale = 0
    contrast = 100
    invert = 0
    rotate = 0
    scaleTop = 1
    scaleleft = 1
    stlyePhoto()
    click()
}


function click(){
    document.querySelector("#Britness").click()
}

fileInput.addEventListener("change", (e) => {
    reset()
    let file = fileInput.files[0]
    image.src = (URL.createObjectURL(file))
    container.classList.remove("disable")

})

resetFilter.addEventListener("click", ()=>{
    reset()
})

function update(e){
    document.querySelector(".options .active").classList.remove("active")
        e.target.classList.add("active")
        document.querySelector(".filter-info .name").innerText = e.target.innerText
        
        if (e.target.id === "Britness") {
            filterValue.innerText = `${britness}%`
            slider.value = britness
        } else if (e.target.id === "grayscale") {
            slider.value = grayscale
            filterValue.innerText = `${grayscale}%`
        } else if (e.target.id === "contrast") {
            filterValue.innerText = `${contrast}%`
            slider.value = contrast
        } else {
            filterValue.innerText = `${invert}%`
            slider.value = invert
        }
}

choseBtn.addEventListener("click", () => fileInput.click())
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        update(e)
    })
})

slider.addEventListener("input", (e) => {
    filterValue.innerText = `${slider.value}%`
    let activeClass = document.querySelector(".options .active")
    if (activeClass.id === "Britness") {
        britness = slider.value
    } else if (activeClass.id === "grayscale") {
        grayscale = slider.value
    } else if (activeClass.id === "contrast") {
        contrast = slider.value
    } else {
        invert = slider.value
    }
    stlyePhoto()
    console.log(grayscale);
})

rotateAll.forEach((elem) => {
    elem.addEventListener("click", (e) => {
        if (e.target.id === "right") {
            rotate -= 90
        } else if (e.target.id === "left") {
            rotate += 90
        } else if (e.target.id === "top") {
            scaleTop = scaleTop === 1 ? -1 : 1
        } else {
            scaleleft = scaleleft === 1 ? -1 : 1
        }
        stlyePhoto()

    })
})

function saveImage(){
    const canvas = document.createElement("canvas")
    const ctx= canvas.getContext("2d");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    

    ctx.filter = ` brightness(${britness}%) contrast(${contrast}%) grayscale(${grayscale}%) invert(${invert}%)`
    ctx.translate(canvas.width/2, canvas.height/2);
    if(rotate!==0){
        ctx.rotate(rotate * Math.PI /180)
    }
    ctx.scale(scaleTop , scaleleft);
    ctx.drawImage(image,-canvas.width/2, -canvas.height/2, canvas.width,canvas.height)


    const link = document.createElement("a")
    link.download = "image.jpg";
    link.href  = canvas.toDataURL();
    link.click()
}

saveBtn.addEventListener("click",()=> saveImage())




