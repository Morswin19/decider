const inputs = document.querySelector(".option")

let wheelNames = ["Lusia", "Jaga", "Diesel", "Gadolina"];
const canvas = document.querySelector('canvas');
const playBtn = document.querySelector('#play')

//construct wheel in canvas
const wheelEngine = () => {
    // console.log('hello Guinea pig')
    if (wheelNames.length % 10 == 1) {
        color = ['#f40552', '#c3edea', '#fc7e2f', '#f8f3eb', '#6886c5', '#ffacb7', '#ffe0ac', '#43d8c9', '#f4eeff', '#ffd868', '#baf1a1'];
    } else {
        color = ['#f40552', '#c3edea', '#fc7e2f', '#f8f3eb', '#6886c5', '#ffacb7', '#ffe0ac', '#43d8c9', '#f4eeff', '#ffd868'];
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
        ctx.fillStyle = "#003f8a";
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

    // showDrawnElementsList = () => {
    //     const listElements = drawnElementsList.querySelectorAll('li');
    //     if (listElements.length > 0) {
    //         listElements.forEach(element => element.remove());
    //     }
    //     for (i = 0; i < drawnElements.length; i++) {
    //         const li = document.createElement('li');
    //         li.innerHTML = drawnElements[i];
    //         drawnElementsList.appendChild(li);
    //     }
    // }

    // showDrawnElementsList()
}

wheelEngine()

let wheelDeg = 0

const handleClick = () => {
    const deg = Math.floor(Math.random() * 3000);
    if (deg < 360) {
        return this.handleClick();
    }
    wheelDeg = wheelDeg + deg
    const canvas = document.querySelector('canvas')
    canvas.style.transform = `rotate(${wheelDeg}deg)`;
    // startWheel.disabled = 'true';
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