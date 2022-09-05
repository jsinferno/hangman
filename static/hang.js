const pic = document.getElementsByClassName("gif")[0]
pic.add
pic.remove()

const cvs = document.createElement("canvas")
cvs.height = window.innerHeight*0.45
cvs.width = window.innerWidth*0.4

const ctx = cvs.getContext("2d")
cvs.classList.add("canvas")
document.body.appendChild(cvs)

ctx.lineWidth = "8"
ctx.lineCap = "square"

const answer = document.getElementById("ans")

const letters = document.getElementsByClassName("letter")
const width = 50/(letters.length*3.5)

const draw = (tries) => {
    // 1456 , 582
    // 884 , 398
    if (tries == 8){
        ctx.beginPath()
        ctx.moveTo(50, 380);
        ctx.lineTo(530, 380);
        ctx.stroke()
        return
    } if (tries == 7){
        ctx.beginPath()
        ctx.moveTo(400, 380);
        ctx.lineTo(400, 20);
        ctx.stroke()
        return
    } if (tries == 6){
        ctx.beginPath()
        ctx.moveTo(400, 20);
        ctx.lineTo(150, 20);
        ctx.stroke()
        return
    } if (tries == 1){
        ctx.lineCap = "square"
        ctx.beginPath()
        ctx.moveTo(150, 20);
        ctx.lineTo(150, 50);
        ctx.stroke()
        ctx.lineWidth = "5"
        return
    } if (tries == 5){
        ctx.moveTo(150, 50);
        ctx.beginPath()
        ctx.arc(150, 80, 30, 0, 2 * Math.PI);
        ctx.stroke()
        return
    } if (tries == 4){
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(150, 110);
        ctx.lineTo(150, 230);
        ctx.stroke()
        return
    } if (tries == 3){
        ctx.beginPath()
        ctx.moveTo(150, 230);
        ctx.lineTo(180, 300);
        ctx.moveTo(150, 230);
        ctx.lineTo(120, 300);
        ctx.stroke()
        return
    } if (tries == 2){
        ctx.beginPath()
        ctx.moveTo(150, 170);
        ctx.lineTo(180, 130);
        ctx.moveTo(150, 170);
        ctx.lineTo(120, 130);
        ctx.stroke()
        return
    } if (tries == 0){
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(135, 70);
        ctx.lineTo(145, 90);
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(135, 90);
        ctx.lineTo(145, 70);
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(155, 70);
        ctx.lineTo(165, 90);
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(155, 90);
        ctx.lineTo(165, 70);
        ctx.stroke()
        return
}}

let tries = 8
draw(tries)
document.querySelector("#tries").innerText = tries.toString()

function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

for (let index = 0; index < letters.length; index++) {
    const element = letters[index];
    element.style.width = `${width}vw`
    element.style.animationDelay = `${index/2}s`
}

const sub = document.getElementById("lettersubmit")
const letterinput = document.getElementsByClassName("letterinput")[0]


sub.addEventListener("submit", function(e){
    let values = []
    let inside = false
    

    e.preventDefault();

    let letter = letterinput.value.toUpperCase()

    let con = true

    if (document.getElementById("used").innerText.split(/\W+/).includes(letter.toLowerCase())) {
        con = false
    } 

    if (con){
        document.getElementById("used").innerText += ` ${letter.toLowerCase()},`

    for (let i = 0; i < letters.length; i++){

        const answer = document.getElementById("ans").innerText[i].toUpperCase()
        const element = letters[i]

        if (letter == answer) {
            element.innerText = answer;
            inside = true
        }

        values.push(element.innerText)
    }

    let bottom = 0
    
    if (values.every(ele => ele!="")){
        setTimeout(() => {document.getElementById("lettersubmit").submit()}, 1000)
        bottom = tries
    }
    if (!inside){
        tries--
        if(tries<bottom){tries = bottom}
        draw(tries)
        document.querySelector("#tries").innerText = tries.toString()
    } 
    
    if (tries == 0){
        setTimeout(() => {document.getElementById("failedsubmit").submit()} ,3000)
    }

    sub.reset();
}

})


