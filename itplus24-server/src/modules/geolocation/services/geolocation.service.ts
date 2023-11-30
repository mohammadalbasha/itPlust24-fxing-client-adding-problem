import express, { NextFunction, Request, Response } from 'express';
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { geocode } from '@esri/arcgis-rest-geocoding';
import { BadRequestError, validateRequest } from '../../../shared'
import { Geolocation } from '../models/geolocation.model';
import { sendGeolocationEmail } from '../../../shared/mails/services/sendMail.service'
import { getCache, setCache } from '../../../shared/caching/redis';

;
const apiKey = process.env.ARCGIS_API_KEY!;
const authentication = ApiKeyManager.fromKey(apiKey);


export const AddGeoLocationService = async (req: Request, res: Response, next: NextFunction) => {
    const { address, sendEmail, email, postal, countryCode } = req.body;
    const addressKey = `${countryCode ? countryCode + '/' : ""}${postal ? postal + '/' : ''}${address} `
    const mappedValue = await getCache(addressKey);

    if (mappedValue){
    
        const existingGeolocation = await Geolocation.findOne({ address: mappedValue });
        if (existingGeolocation) {
            if (sendEmail){
                sendGeolocationEmail(email, existingGeolocation);
            }
             return res.status(200).json(existingGeolocation)
        }

    }

    const data = await geocode({
        address: address,
        ...(postal && {postal: postal}),
        ...(countryCode && {countryCode: countryCode}),
        authentication
      })
    
    if (data.candidates.length == 0)
    {next(new BadRequestError("address is invalid"))
    return;
}

    setCache(addressKey, data.candidates[0]?.address);
    const {address: geoAddress, location, score} = data?.candidates[0];
    const geolocation = await Geolocation.build({
        address: geoAddress,
        location: {
            x: location.x,
            y: location.y,
            spatialReference:  {
                wkid: location?.spatialReference?.wkid,
                latestWkid: location?.spatialReference?.latestVcsWkid
            }
        }, 
        score
    });
    
    await geolocation.save();

    if (sendEmail){
        sendGeolocationEmail(email, geolocation);
    }

    res.status(201).send(geolocation); 
  }


  