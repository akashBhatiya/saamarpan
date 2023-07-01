const express = require('express');
const port = process.env.PORT || 8000;
const path = require('path');
const mailer = require('nodemailer');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));


app.post('/send-email', function(req,res){
    const {name,phone,message} = req.body;

    const transporter = mailer.createTransport({
        service : 'Gmail',
        auth:{
            user: 'asbhatiya8888@gmail.com',
            pass: 'yifujqtxnrgrrlgu',
        },
    });

    const mailOptions = {
        from: phone,
        to: 'asbhatiya7777@gmail.com',
        subject: 'New Form Submission',
        text: `
            Name: ${name}
            Phone: ${phone}
            Message: ${message}
        `,
    };

    transporter.sendMail(mailOptions, (error,info) => {
        if(error){
            console.error(error);
            res.status(500).send('Error sending email');
        }
        else{
            console.log('Email sent',info.response);
            return res.send("<h1>email sent successfully</h1>");
        }
    })

})


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'));
})

app.listen(port,function(err){
    if(err){
        console.log('error conacting to the server');
    }
    console.log('Express server is running');
})
