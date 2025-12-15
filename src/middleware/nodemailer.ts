import nodemailer from "nodemailer"

//create a test account for transporter
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: 'earline.hermiston65@ethereal.email',
        pass: 'HgJuQdscyWyTGpj6Yx'
    }
});
//callback fn
//transporter.verify((error, success) => {
 //   if (error) {
 //       console.log(error)
 //   }
 //   else {
 //       console.log("server is ready to send messages")
  //  }
//})   


(async()=>{
    const info = await transporter.sendMail({
        from:'"Earline Hermiston"<earline.hermiston65@ethereal.email>',
        to: "briangaturu03@gmail.com",
        subject: "Hello",
        text: "Hello World",
        html: "<b>Hello World</b>"
    });
    console.log("message sent:", info.messageId)
})()