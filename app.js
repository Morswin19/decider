//DOM variables
let options = document.querySelectorAll(".option");
const addOption = document.querySelector("#addOption");
const canvas = document.querySelector('canvas');
const playBtn = document.querySelector('#play');
const inputs = document.querySelector("#inputs");
const decisionsMadeList = document.querySelector("#decisionsMade");
const multiButtons = document.querySelectorAll(".multiButton");
const decisionsMadeTitle = document.querySelector(".nonDisplay");

//wheel variables
let wheelNames = [];
let wheelDeg = 0;
let optionsArray = [];
let drawnElements = [];
let multiple = true;

//construct wheel in canvas
const wheelEngine = () => {
    if (wheelNames.length % 2 == 0) {
        color = ['#EAE9D9', '#F7F9FC'];
    } else if (wheelNames.length % 3 == 0) {
        color = ['#EAE9D9', '#F7F9FC', '#FFEDDA'];
    } else if (wheelNames.length % 5 == 0){
        color = ['#EAE9D9', '#F7F9FC', '#FFEDDA', '#EEEEEE', '#FFE3E3']
    } else {
        color = ['#EAE9D9', '#F7F9FC', '#FFEDDA', "#eeeeee", "#F1ECC3", '#FFE3E3', '#FDF6F0'];
    }
    const slices = wheelNames.length;
    const sliceDeg = 360 / slices;
    let deg = 0;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const center = width / 2;
    function deg2rad(deg) { return deg * Math.PI / 180; }

    function drawSlice(deg, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(center, center);
        ctx.arc(center, center, width / 2, deg2rad(deg), deg2rad(deg + sliceDeg));
        ctx.lineTo(center, center);
        ctx.fill();
    }

    function drawText(deg, text) {
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(deg2rad(deg));
        ctx.textAlign = "left";
        ctx.fillStyle = "#9F9A53";
        if (window.innerWidth < 500) {
            ctx.font = 'bold 15px lato';
            ctx.fillText(text, 40, 4);
        } else if (window.innerWidth < 850 || wheelNames > 30) {
            ctx.font = 'bold 20px lato';
            ctx.fillText(text, 100, 10);
        } else {
            ctx.font = 'bold 30px lato';
            ctx.fillText(text, 100, 10);
        }
        ctx.restore();
    }

    for (var i = 0; i < slices; i++) {
        drawSlice(deg, color[(i % color.length)]);
        drawText(deg + sliceDeg / 2, wheelNames[i]);
        deg += sliceDeg;
    }

    showDrawnElementsList = () => {
        decisionsMadeTitle.classList.remove('nonDisplay');
        const listElements = decisionsMadeList.querySelectorAll('li');
        if (listElements.length > 0) {
            listElements.forEach(element => element.remove());
        }
        for (i = 0; i < drawnElements.length; i++) {
            const li = document.createElement('li');
            li.innerHTML = drawnElements[i];
            decisionsMadeList.appendChild(li);
        }
    }
    if (drawnElements.length > 0) {
        showDrawnElementsList()
    }
}

const addOptionClick = () => {
    const input = document.createElement('input');
    input.className = 'option mb-5';
    input.placeholder = `enter option ${optionsArray.length + 1}`;
    input.onfocus = function (e) { e.target.classList.add('optionActive') }
    input.onblur = function (e) { wheelNamesChanged(e) };
    inputs.appendChild(input);
    wheelNamesChanged()
    input.focus()
};

//handle click to start the wheel
const startWheel = () => {
    window.removeEventListener("keydown", enterEventFunc)
    const deg = Math.floor(Math.random() * 3600);
    if (deg < 1440) {
        return startWheel();
    }
    wheelDeg = wheelDeg + deg
    const canvas = document.querySelector('canvas')
    canvas.style.transform = `rotate(${wheelDeg}deg)`;
    play.disabled = 'true';
    let degLeft = wheelDeg % 360;
    let oneSlice = 360 / wheelNames.length;
    const drawnElement = wheelNames.filter((name, index) => (index * oneSlice < (360 - degLeft)) && ((index + 1) * oneSlice >= (360 - degLeft)))
    if (drawnElement[0] !== undefined) {
        drawnElements.unshift(drawnElement[0]);
    }
    if (multiple === false) {
        setTimeout(() => elementCut(), 7000);
    } else {
        setTimeout(() => {
            play.removeAttribute('disabled');
            wheelEngine();
            window.addEventListener("keydown", enterEventFunc)
        }, 5000)
    }
    canvas.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
}

const wheelNamesChanged = () => {
    optionsArray = [...document.querySelectorAll(".option")];
    wheelNames = [];
    optionsArray.map((option) => wheelNames.push(option.value));
    wheelEngine()
}

multiButtons.forEach(multi => multi.addEventListener('click', (e) => multipleClick(e)));

const multipleClick = (e) => {
    if (multiple === true && e.target.innerHTML == "NO") {
        multiButtons[0].classList.remove('multipleActive');
        multiButtons[0].classList.add('multipleDisactive');
        multiButtons[1].classList.remove('multipleDisactive');
        multiButtons[1].classList.add('multipleActive');
        multiple = false;
    } else if (multiple === false && e.target.innerHTML == "YES") {
        multiButtons[0].classList.remove('multipleDisactive');
        multiButtons[0].classList.add('multipleActive');
        multiButtons[1].classList.remove('multipleActive');
        multiButtons[1].classList.add('multipleDisactive');
        multiple = true;
    }
}

//func to remove drawn option
elementCut = () => {
    play.removeAttribute('disabled')
    let degLeft = wheelDeg % 360;
    let oneSlice = 360 / wheelNames.length;
    const nameToCut = wheelNames.filter((name, index) => (index * oneSlice < (360 - degLeft)) && ((index + 1) * oneSlice >= (360 - degLeft)))
    const index = wheelNames.indexOf(nameToCut[0]);
    wheelNames.splice(index, 1);
    window.addEventListener("keydown", enterEventFunc)
    wheelEngine();
}

wheelNamesChanged()

// function to fit canvas size
const canvasSize = () => {
    if (window.innerWidth <= 500) {
        canvas.setAttribute('width', '250');
        canvas.setAttribute('height', '250');
    }
    else if (window.innerWidth < 700) {
        canvas.setAttribute('width', '450');
        canvas.setAttribute('height', '450');
    }
    else if (window.innerWidth < 1200) {
        canvas.setAttribute('width', '600');
        canvas.setAttribute('height', '600');
    }
    else if (window.innerWidth < 1400) {
        canvas.setAttribute('width', '600');
        canvas.setAttribute('height', '600');
    }
    else {
        canvas.setAttribute('width', '750');
        canvas.setAttribute('height', '750');
    }
}

//func to change canvas size when window is resize
window.addEventListener("resize", () => resizeFunction());

const resizeFunction = () => {
    canvasSize();
    wheelNamesChanged();
}

resizeFunction()

//add event listener to start the wheel whith enter key press
const enterEventFunc = (e) => {
    if (e.keyCode === 13) {
        startWheel();
    };
}

const tabEventFunc = (e) => {
    if (e.keyCode === 9){
        console.log(optionsArray);
        //if option array have '' values, we go to that '' value, we don't create another element
        let checkOptionArrayValues = optionsArray.filter(option => !option.value)
        checkOptionArrayValues.length == 0 ? addOptionClick() : checkOptionArrayValues[0].focus();

        // addOptionClick();
    }
}

window.addEventListener("keydown", enterEventFunc)
window.addEventListener('keyup', tabEventFunc)

