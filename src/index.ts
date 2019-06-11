const logo = document.getElementById("logo");
const dummy = document.createElement('div');
logo.parentNode.insertBefore(dummy, logo.nextSibling);

const initX = logo.offsetLeft;
const initY = logo.offsetTop;
const initHeight = logo.offsetHeight;
const initWidth = logo.offsetWidth;

logo.style.position = 'fixed';
logo.style.top = `${initY}px`;
logo.style.left = `${initX}px`;
dummy.style.height = `${initHeight}px`;
dummy.style.width = `${initWidth}px`;

const dHeight = (initHeight - 25) / initY;
const dX = (initX + 25) / initY;

console.log(dHeight);

window.addEventListener('scroll', () => {
    const pageY = window.pageYOffset;
    const y = logo.offsetTop;

    if (y > 25 || pageY + 25 < initY) {
        logo.style.top = `${initY - window.pageYOffset}px`;
        logo.style.height = `${Math.max((initY - pageY) * dHeight, 25)}px`;
        logo.style.left = `${Math.max((initY - pageY) * dX, 25)}px`;
    }
});