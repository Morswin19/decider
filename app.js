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
    // console.log('hello Guinea pig')
    if (wheelNames.length % 10 == 1) {
        color = ['#9F9A53', '#F7F9FC', '#6b5b95', '#d64161', '#6886c5', '#ffacb7', '#ffe0ac', '#43d8c9', '#c1946a', '#ffd868', '#baf1a1'];
    } else {
        color = ['#9F9A53', '#F7F9FC', '#6b5b95', '#d64161', '#6886c5', '#ffacb7', '#ffe0ac', '#43d8c9', '#c1946a', '#ffd868'];
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

    if (window.innerWidth > '850px') {

    }
    function drawText(deg, text) {
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(deg2rad(deg));
        ctx.textAlign = "left";
        ctx.fillStyle = "#F7F9FC";
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

// showDrawnElementsList = () => {
//     decisionsMadeTitle.classList.remove('nonDisplay');
//     const listElements = decisionsMadeList.querySelectorAll('li');
//     if (listElements.length > 0) {
//         listElements.forEach(element => element.remove());
//     }
//     for (i = 0; i < drawnElements.length; i++) {
//         const li = document.createElement('li');
//         li.innerHTML = drawnElements[i];
//         decisionsMadeList.appendChild(li);
//     }
// }

const addOptionClick = () => {
    const input = document.createElement('input');
    input.className = 'option mb-5';
    input.placeholder = `enter option ${optionsArray.length + 1}`;
    input.onfocus = function (e) { e.target.classList.add('optionActive') }
    input.onblur = function (e) { wheelNamesChanged(e) };
    inputs.appendChild(input);
    // optionsArray = [...document.querySelectorAll(".option")];
    wheelNamesChanged()
    wheelEngine()
};

const handleClick = () => {
    const deg = Math.floor(Math.random() * 3600);
    if (deg < 720) {
        return handleClick();
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
            // (startWheel.removeAttribute('disabled'));
            play.removeAttribute('disabled');
            wheelEngine();
            // startCount++;
            // countSpan.innerHTML = `(${startCount})`;
        }, 5000)
    }
}

const wheelNamesChanged = () => {
    optionsArray = [...document.querySelectorAll(".option")];
    wheelNames = [];
    for (i = 0; i < optionsArray.length; i++) {
        wheelNames.push(optionsArray[i].value)
    }
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

elementCut = () => {
    play.removeAttribute('disabled')
    let degLeft = wheelDeg % 360;
    let oneSlice = 360 / wheelNames.length;
    const nameToCut = wheelNames.filter((name, index) => (index * oneSlice < (360 - degLeft)) && ((index + 1) * oneSlice >= (360 - degLeft)))
    const index = wheelNames.indexOf(nameToCut[0]);
    wheelNames.splice(index, 1);
    // startCount++;
    // countSpan.innerHTML = `(${startCount})`;
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
    // if (piecesSubmit.disabled) {
    //     if (piecesSubmit.disabled) {
    //         wheelEngine();
    //     }
    // }
}

window.addEventListener("resize", () => resizeFunction());

const resizeFunction = () => {
    canvasSize();
    wheelNamesChanged();
}

resizeFunction()

