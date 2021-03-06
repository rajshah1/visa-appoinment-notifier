# VisaDatesNotifier
Automation Script to create email alarm when VAC dates available US Visa. It helps look for consulor visa dates .

## How to Set UP Automation Script

1. Install Dependecy Cheerio, puppeteer , cron , nodemailer . (See Package.json for Dependecy install with correct Versions)
2. Go to File Location (Tester.js) - Main file where logic is implemented
3. Now we will assign Variable values and password for notification setting to your personal mail
4. Line 7 : executablePath : ( Enter the location of chrome.exe file to open chrome from puppeter ).
5. Line 17 : Enter the URL that is having login textbox. As of now it is : https://cgifederal.secure.force.com/
6. Line 19 : Enter the Dummy Account Email ID .
7. Line 20 : Enter the Dummy Account Password .
8. Line 40 : Enter Your Primary Email ID from where you want to sent email when Counslor Dates are available.
9. Line 41 : Password of that gmail Account. ( Enable this Option :  https://www.google.com/settings/security/lesssecureapps )
10. Line 48 : Enter name and Email ID from where mail will be triggered .
11. Line 49 : To  Mail : (Recipient Email ID)

## How To Use This Automation Script 
How this code will run when you run the node script with node tester.js 
dummy mail and password will be entered automatically .Then cursor will go to captcha where for first login 
user has to enter the captcha in box in 6s .Then script will automatically login if cred are correct then every 1 min browser will be 
refershed automatically and if BB (Blue Box is available with Counselor Dates ) available it will Shoot email with avilable dates.


### Author: Raj Shah
Feel Free to Drop issue if you have any question about script .
