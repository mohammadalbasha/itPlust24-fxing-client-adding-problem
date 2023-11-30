import { response } from 'express';
import transporter from '../index';
import handlebars from 'handlebars';
const fs = require('fs')
require('dotenv').config();
import { join, resolve } from 'path';


const sendGeolocationEmail = (email: string, geolocation: any) => {

    const geolocationTemplateSource = fs.readFileSync( resolve(__dirname,'../templates/geolocation-details.hbs'), 'utf8');
    const geolocationTemplate = handlebars.compile(geolocationTemplateSource);
    
    const link = `${process.env.FRONTEND_DOMAIN}/geolocation?longitude=${geolocation.location.x}&latitude=${geolocation.location.y}&address=${geolocation.address}`
    const geolocationData = {
        link
    }
    const compiledgeolocationTemplate = geolocationTemplate(geolocationData);
    
    
    if (process.env.ENVIRONMENT !='docker' ){
        console.log(process.env.ENVIRONMENT)
        try {

            transporter.sendMail({
                from: '"ITplus24"', // sender address
                to: email, // list of receivers
                subject: " Geolocation Details ✔", // Subject line
                html: `
                <div style="width:100vw;display:flex;flex-direction:column;align-items:center;background-color:#66c;border-radius:10px;color:white">
              <h1>
                  ITplus24
              </h1>
              <h3>
                  The World is in your hands
              </h3>
              <p>for more informations about your address:</p>
              <a style="padding:0.6rem 1.2rem;margin-top: 1rem;padding:1rem 2rem;background-color:rgb(144, 144, 157);border-radius:10px;color:white;cursor:pointer" href=${link}>
              please click
              </a>
          </div>`
              });
        }
        catch(err){
            console.log(err)
        }
    
    }
  };
  
  export { sendGeolocationEmail};