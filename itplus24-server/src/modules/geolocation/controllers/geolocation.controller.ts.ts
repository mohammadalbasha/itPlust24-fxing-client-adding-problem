import express from 'express';

import AddGeolocationValidator from '../validation/add-geolocation.validator';
import { AddGeoLocationService } from '../services/geolocation.service';
import { validateRequest } from '../../../shared';


const router = express.Router();

router.post(
  '',
  AddGeolocationValidator,
  validateRequest,
  AddGeoLocationService
);



export { router as GeolocationRouter };
