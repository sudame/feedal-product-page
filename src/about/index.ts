window.addEventListener('DOMContentLoaded', () => {

    let logo: HTMLObjectElement = document.getElementById("logo") as HTMLObjectElement;
    let catchcopy: HTMLElement = document.getElementById("catchcopy");
    let dummy = document.createElement('div');
    logo.parentNode.insertBefore(dummy, logo.nextSibling);

    let requestID;

    const locateLogo = () => {

        let logoClientRect = logo.contentDocument.getElementById("svg-main").getBoundingClientRect();
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
                logo = document.getElementById("logo") as HTMLObjectElement;
                window.cancelAnimationFrame(requestID);

                dummy.remove();
                logo.removeAttribute('style');

                logoClientRect = logo.contentDocument.getElementById("svg-main").getBoundingClientRect();
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

                logo.parentNode.insertBefore(dummy, logo.nextSibling);

                requestID = window.requestAnimationFrame(setLogPlace);
            }, 200);
        });


        const setLogPlace = () => {
            const pageY = window.scrollY;
            const y = logo.offsetTop;
            logo.style.top = `${Math.max(initY - pageY, 25)}px`;
            logo.style.height = `${Math.max((initY - pageY) * dHeight + 25, 25)}px`;
            logo.style.left = `${Math.max((initY - pageY) * dX - 25, 25)}px`;
            requestID = window.requestAnimationFrame(setLogPlace);
        }
        requestID = window.requestAnimationFrame(setLogPlace);
    }


    logo.addEventListener('load', () => {
        locateLogo();
    });
});