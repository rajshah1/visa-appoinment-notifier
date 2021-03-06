const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const $ = require('cheerio');
const nodemailer = require('nodemailer');

const chromeoptions = {
    executablepath: 'Eneter your chrome.exe file path here',
    headless: false,
    slowMo: 8,
    defaultViewport: null
};
(async() => {
    const browser = await puppeteer.launch(chromeoptions);
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    await page.goto('https://cgifederal.secure.force.com/');

    await page.type('.stylizedInput1', 'Example@gmail.com');// Username Email Dummy Account
    await page.type('[id*=password]', 'tester'); // Password for Dummy account
    await page.$$eval("input[type='checkbox']", checks => checks.forEach(c => c.checked = true));
    await page.waitFor(6000);


    await Promise.all([
        page.waitForNavigation(), page.click('[id*=loginButton]')
    ]).catch(() => { console.error("Error Occured.") });

    async function RelaodPageOnce() {
        await page.evaluate(() => {
            location.reload(true)
        });
    }

    async function sendNotification(availableDate) {
        var dtb = new Date();
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'Enter Your Primary Email ID from where you want to sent email when Counslor Dates are available',
                pass: 'Password Of Gmail Account'
            }
        });

        let textToSend = 'Date is Available : ' + availableDate + " AT " + dtb;

        let info = await transporter.sendMail({
            from: '"User name" <emailId from where email will be sent when BB is availble >',
            to: "Recipient Email ID ",
            subject: 'Date Available  ' + availableDate,
            text: textToSend,
        });

        console.log("Message sent: %s", info.messageId);
    }


    async function checkBBAval() {
        RelaodPageOnce();
        await page.waitForNavigation();
        let html = await page.evaluate(() => document.body.innerHTML);
        $('.leftPanelText', html).each(function() {
            var currentvalBB = $(this).text();
            if (typeof(currentvalBB) != 'undefined' && currentvalBB != null) {
                var dt = new Date();
                console.log("**************************************\n");
                console.log("currentvalBB is available  for  : " + currentvalBB + " AT " + dt);
                console.log("\n**************************************\n");
                sendNotification(currentvalBB);
            }
        });



    }
    async function startTracking() {
        let job = new CronJob('* * * * *', function() { //runs every 1 minutes in this config
            checkBBAval();
        }, null, true, null, null, true);
        job.start();
    }
    startTracking();
})();