const { test,expect } = require('../utils/fixtures.js');
const qaTestData = JSON.parse(JSON.stringify(require('../test-data/qa/testData.json')));
const regTestData = JSON.parse(JSON.stringify(require('../test-data/reg/testData.json')));

test.describe('Login Test Suite', () => {
    let testData = qaTestData;
    if (process.env.ENV == 'reg') {
        testData = regTestData;
    }
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.GotoLoginPage(process.env.WEB_URL);
    });

    test('Logint with valid credentials', async ({ loginPage }) => {
        await loginPage.Login(process.env.username, process.env.password);
        await loginPage.AssertLoggedInUserDetails(testData.user);
    });

    // test('Landing page visual comparison', async ({ page, loginPage }) => {
    //     await loginPage.GotoLoginPage();
    //     await expect(page).toHaveScreenshot('landing.png');
    // });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
    
});



let color;
let buttons = document.querySelectorAll('.color');
let fullscreenelement = document.getElementById('fullscreenelement');
let iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
let vid = false;
buttons.forEach(function(e){
   e.onclick = function(){
       color = e.dataset.color;
       fullscreenelement.style.backgroundColor = color;
       allscreen(color);
   }
});

function allscreen(){
    if (iOS) {
        if (!vid) {
            let e = document.createElement('video');
            e.src = color.substring(1) + '.mp4?v=2';
            e.autoplay = true;
            e.loop = true;
            e.playsInline = true;
            e.controls = true;
            document.body.appendChild(e);
            e.addEventListener('loadedmetadata', function () {
                e.webkitEnterFullscreen();
            }, false);
            vid = e;
        } else {
            vid.src = color.substring(1) + '.mp4?v=2';
            vid.addEventListener('loadedmetadata', function () {
                vid.webkitEnterFullscreen();
            }, false);
        }

    }

    if (fullscreenelement.requestFullscreen) {
        fullscreenelement.requestFullscreen();
    } else if (fullscreenelement.webkitRequestFullscreen) { /* Safari */
        fullscreenelement.webkitRequestFullscreen();
    } else if (fullscreenelement.msRequestFullscreen) { /* IE11 */
        fullscreenelement.msRequestFullscreen();
    }

}



