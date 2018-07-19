var steem = require('steem')
var nodemailer = require('nodemailer');
steem.api.setOptions({ url: 'https://api.steemit.com' })

steem.api.getAccounts(["dtube.rewards"], function(err, result) {
     holdings=result[0].balance.split(" ").splice(0,1).join(" ")
     if ( holdings < 50 ) {

       let transporter = nodemailer.createTransport({
           sendmail: true,
           newline: 'unix',
           path: '/usr/sbin/sendmail'
       });
       transporter.sendMail({
           from: 'dtube.rewards@d.tube',
           to: 'daniel@d.tube',
           subject: 'Top up!',
           text: "The DTube.rewards bot currently has"+ holdings +" steem in its reserves and requires a top up"
       }, (err, info) => {
           console.log(info.envelope);
           console.log(info.messageId);
       });
     }
     else{
       console.log(holdings)
     }
});
