let wheelDeg = 0;
const piecesInput = document.querySelector('.piecesForm input');
const piecesSubmit = document.querySelector('.piecesForm button');
const nameInputs = document.querySelector('.nameInputs');
let pieces = 0;
let names = nameInputs.querySelectorAll('input')
let amounts = nameInputs.querySelectorAll('inputHowMany');
let namesSubmit = nameInputs.querySelector('button')
let wheelNames = [];
let randomNumbers = [];
let randomNames = [];
let color = [];
let elementCut = true;

const addInputs = () => {
    pieces = piecesInput.value;
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
    button.className = 'btn btn-primary';
    button.appendChild(document.createTextNode('Submit'));
    nameInputs.appendChild(button);
    names = nameInputs.querySelectorAll('.nameInput');
    amounts = nameInputs.querySelectorAll('.inputHowMany');
    namesSubmit = nameInputs.querySelector('button');
    if (!elementCut) {
        namesSubmit.addEventListener('click', constructWheelWithoutCut);
    } else {
        namesSubmit.addEventListener('click', constructWheelWithCut)
    }
}

const constructWheelWithoutCut = () => {
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
    for (i = 1; i <= wheelNames.length; i++) {

    }
    console.log(wheelNames);
    console.log(amounts);
    if (wheelNames.length % 7 == 1) {
        color = ['#ffed00', 'azure', '#00fff0', '#F8766D', '#00C19C', '#FF62BC'];
    } else {
        color = ['#ffed00', 'azure', '#00fff0', '#F8766D', '#00C19C', '#FF62BC', '#FC717F'];
    }
    // const workersNames = workers.map(person => person.name);
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

    handleClick = () => {
        console.log('Hello Guinea Pig');
        const deg = Math.floor(Math.random() * 3000);
        if (deg < 360) {
            return this.handleClick();
        }
        console.log(deg);
        wheelDeg = wheelDeg + deg
        const canvas = document.querySelector('canvas')
        canvas.style.transform = `rotate(${wheelDeg}deg)`
    }
}

const constructWheelWithCut = () => {
    console.log('Hello Guinea Pig')
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

    if (wheelNames.length % 7 == 1) {
        color = ['#ffed00', 'azure', '#00fff0', '#F8766D', '#00C19C', '#FF62BC'];
    } else {
        color = ['#ffed00', 'azure', '#00fff0', '#F8766D', '#00C19C', '#FF62BC', '#FC717F'];
    }

    wheelEngine = () => {
        if (wheelNames.length % 7 == 1) {
            color = ['#ffed00', 'azure', '#00fff0', '#F8766D', '#00C19C', '#FF62BC'];
        } else {
            color = ['#ffed00', 'azure', '#00fff0', '#F8766D', '#00C19C', '#FF62BC', '#FC717F'];
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
    }

    wheelEngine();

    handleClick = () => {
        const deg = Math.floor(Math.random() * 3000);
        if (deg < 360) {
            return this.handleClick();
        }
        // console.log(wheelNames);
        // console.log(deg);
        wheelDeg = wheelDeg + deg
        // console.log(wheelDeg);
        const canvas = document.querySelector('canvas')
        canvas.style.transform = `rotate(${wheelDeg}deg)`;
        setTimeout(() => elementCut(), 7000);
    }

    elementCut = () => {
        let degLeft = wheelDeg % 360;
        // console.log(degLeft);
        let oneSlice = 360 / wheelNames.length;
        const nameToCut = wheelNames.filter((name, index) => (index * oneSlice < (360 - degLeft)) && ((index + 1) * oneSlice >= (360 - degLeft)))
        // console.log(nameToCut);
        const index = wheelNames.indexOf(nameToCut[0]);
        // console.log('index:', index);
        wheelNames.splice(index, 1);
        // console.log(wheelNames);
        wheelEngine();
    }

}

piecesSubmit.addEventListener('click', addInputs);