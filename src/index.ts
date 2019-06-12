const logo: HTMLObjectElement = document.getElementById("logo") as HTMLObjectElement;
const catchcopy: HTMLElement = document.getElementById("catchcopy");
const dummy = document.createElement('div');
logo.parentNode.insertBefore(dummy, logo.nextSibling);

const locateLogo = () => {
    let isAnimating = true;
    let logoClientRect = logo.contentDocument.getElementById("svg-main").getClientRects()[0];
    let initHeight = logoClientRect.height;
    let initWidth = logoClientRect.width;

    logo.style.height = `${initHeight}px`;

    let initX = logo.offsetLeft;
    let initY = logo.offsetTop;

    logo.style.position = 'fixed';
    dummy.style.height = `${initHeight}px`;
    dummy.style.width = `${initWidth}px`;

    catchcopy.style.visibility = logo.style.visibility = 'visible';

    let dHeight = (initHeight - 25) / initY;
    let dX = (initX + 25) / initY;

    let timer = 0;

    window.addEventListener('resize', () => {
        if (timer > 0) {
            clearTimeout(timer);
        }

        timer = window.setTimeout(() => {
            console.log("chagned!");
            isAnimating = false;

            dummy.remove();
            logo.removeAttribute('style');

            logoClientRect = logo.contentDocument.getElementById("svg-main").getClientRects()[0];
            initHeight = logoClientRect.height;
            initWidth = logoClientRect.width;

            logo.style.height = `${initHeight}px`;

            initX = logo.offsetLeft;
            initY = logo.offsetTop;

            logo.style.position = 'fixed';
            dummy.style.height = `${initHeight}px`;
            dummy.style.width = `${initWidth}px`;

            catchcopy.style.visibility = logo.style.visibility = 'visible';

            dHeight = (initHeight - 25) / initY;
            dX = (initX + 25) / initY;
            isAnimating = true;
        }, 200);
    });


    const setLogPlace = () => {
        if (isAnimating) {
            const pageY = window.pageYOffset;
            const y = logo.offsetTop;
            logo.style.top = `${Math.max(initY - window.pageYOffset, 25)}px`;
            logo.style.height = `${Math.max((initY - pageY) * dHeight + 25, 25)}px`;
            logo.style.left = `${Math.max((initY - pageY) * dX - 25, 25)}px`;
        } else {
            logo.removeAttribute('style');
        }
        window.requestAnimationFrame(setLogPlace);
    }
    window.requestAnimationFrame(setLogPlace);
}

logo.addEventListener('load', () => {
    locateLogo();
});
