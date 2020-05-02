//DOM variables
const piecesInput = document.querySelector('.piecesForm input');
const piecesSubmit = document.querySelector('.piecesForm button');
const piecesDiv = document.querySelector('.piecesForm div');
const newWheelBtn = document.querySelector('.new-wheel');
const nameInputs = document.querySelector('.nameInputs');
const radioNot = document.querySelector('#notCut');
const radioYes = document.querySelector('#elementCut');
let names = nameInputs.querySelectorAll('input')
let amounts = nameInputs.querySelectorAll('inputHowMany');
let namesSubmit = document.querySelector('.names-submit');
const wheelContainer = document.querySelector('.container');
const startWheel = document.querySelector('.btn-danger');
const drawnElementsList = document.querySelector('.drawnElementsList');
const countSpan = document.querySelector('.actual span');

//other variables
let wheelDeg = 0;
let wheelNames = [];
let randomNumbers = [];
let randomNames = [];
let color = [];
let drawnElements = [];
let startCount = 0;

//add inputs after submit wheel type and parts amount
const addInputs = () => {
    piecesSubmit.setAttribute('disabled', true);
    newWheelBtn.style.display = 'inline-block';
    const pieces = piecesInput.value;
    //elements for every part
    for (i = 1; i <= pieces; i++) {
        const div = document.createElement('div');
        div.className = 'nameDiv';
        const label = document.createElement('label');
        label.appendChild(document.createTextNode(`${i}. element:`));
        const input = document.createElement('input');
        input.className = `nameInput input${i}`;
        const label2 = document.createElement('label');
        label2.appendChild(document.createTextNode(`how many:`));
        const input2 = document.createElement('input');
        input2.className = `inputHowMany inputHowMany${i}`;
        input2.setAttribute('value', '1')
        input2.setAttribute('type', 'number')
        input2.setAttribute('min', '0');
        nameInputs.appendChild(div)
        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(label2);
        div.appendChild(input2);
    }
    const button = document.createElement('button');
    button.className = 'btn btn-info names-submit';
    button.appendChild(document.createTextNode('Submit'));
    nameInputs.parentNode.appendChild(button);
    button.style.marginBottom = '10px';
    names = nameInputs.querySelectorAll('.nameInput');
    amounts = nameInputs.querySelectorAll('.inputHowMany');
    namesSubmit = document.querySelector('.names-submit');
    namesSubmit.addEventListener('click', constructWheelWithCut)
}

// main function to construct wheel from parts input
const constructWheelWithCut = () => {
    startWheel.removeAttribute('disabled');
    wheelContainer.style.display = 'flex';
    namesSubmit.parentElement.style.display = 'none';
    piecesDiv.style.display = 'none';
    piecesSubmit.style.display = 'none';
    namesSubmit.disabled = 'true';
    names.forEach((name, index) => {
        for (i = 1; i <= amounts[index].value; i++) {
            const number = Math.floor(Math.random() * 1000);
            randomNames.push(number + '&8&' + name.value)
            randomNames = randomNames.sort();
            wheelNames = randomNames.map(name => {
                let index = name.indexOf('&8&')
                return name.slice(index + 3);
            }
            )
        }
    });

    //construct wheel in canvas
    wheelEngine = () => {
        if (wheelNames.length % 10 == 1) {
            color = ['#f40552', '#c3edea', '#fc7e2f', '#f8f3eb', '#6886c5', '#ffacb7', '#ffe0ac', '#43d8c9', '#f4eeff', '#ffd868', '#baf1a1'];
        } else {
            color = ['#f40552', '#c3edea', '#fc7e2f', '#f8f3eb', '#6886c5', '#ffacb7', '#ffe0ac', '#43d8c9', '#f4eeff', '#ffd868'];
        }
        const slices = wheelNames.length;
        const sliceDeg = 360 / slices;
        let deg = 0;
        const canvas = document.querySelector('canvas');
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
            ctx.fillStyle = "#003f8a";
            ctx.font = 'bold 30px sans-serif';
            ctx.strokeStyle = "#FF0000"
            ctx.fillText(text, 120, 10);
            ctx.restore();
        }

        for (var i = 0; i < slices; i++) {
            drawSlice(deg, color[(i % color.length)]);
            drawText(deg + sliceDeg / 2, wheelNames[i]);
            deg += sliceDeg;
        }

        showDrawnElementsList = () => {
            const listElements = drawnElementsList.querySelectorAll('li');
            if (listElements.length > 0) {
                listElements.forEach(element => element.remove());
            }
            for (i = 0; i < drawnElements.length; i++) {
                const li = document.createElement('li');
                li.innerHTML = drawnElements[i];
                drawnElementsList.appendChild(li);
            }
        }

        showDrawnElementsList()
    }

    wheelEngine();

    handleClick = () => {
        const deg = Math.floor(Math.random() * 3000);
        if (deg < 360) {
            return this.handleClick();
        }
        wheelDeg = wheelDeg + deg
        const canvas = document.querySelector('canvas')
        canvas.style.transform = `rotate(${wheelDeg}deg)`;
        startWheel.disabled = 'true';
        let degLeft = wheelDeg % 360;
        let oneSlice = 360 / wheelNames.length;
        const drawnElement = wheelNames.filter((name, index) => (index * oneSlice < (360 - degLeft)) && ((index + 1) * oneSlice >= (360 - degLeft)))
        if (drawnElement[0] !== undefined) {
            drawnElements.unshift(drawnElement[0]);
        }
        if (radioYes.checked == true) {
            setTimeout(() => elementCut(), 7000);
        } else {
            setTimeout(() => {
                (startWheel.removeAttribute('disabled'));
                wheelEngine();
                startCount++;
                countSpan.innerHTML = `(${startCount})`;
            }, 5000)
        }
    }

    //function to cutting elements in remove element version
    elementCut = () => {
        startWheel.removeAttribute('disabled')
        let degLeft = wheelDeg % 360;
        let oneSlice = 360 / wheelNames.length;
        const nameToCut = wheelNames.filter((name, index) => (index * oneSlice < (360 - degLeft)) && ((index + 1) * oneSlice >= (360 - degLeft)))
        const index = wheelNames.indexOf(nameToCut[0]);
        wheelNames.splice(index, 1);
        startCount++;
        countSpan.innerHTML = `(${startCount})`;
        wheelEngine();
    }
}

piecesSubmit.addEventListener('click', addInputs);
newWheelBtn.addEventListener('click', () => location.reload());

