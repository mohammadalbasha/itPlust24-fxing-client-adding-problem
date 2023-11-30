import  mongoose  from 'mongoose';

interface GeolocationAttr { 
    address: string;
    score: number,
    location : {
        x: number,
        y: number,
        spatialReference? : {
            wkid?: number;
            latestWkid?: number;
        }
    },


}

interface GeolocationDoc extends mongoose.Document { 
    address: string;
    score: number,
    location : {
        x: number,
        y: number,
        spatialReference : {
            wkid: number;
            latestWkid: number;
        }
    }
    updatedAt: string;
    createdAt: string;
}

export interface GeolocationModel extends mongoose.Model<GeolocationDoc>{
    build(user:GeolocationAttr): GeolocationDoc;
}

const geolocationSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        index: true
    },
    score: {
        type: Number
    },
    location: {
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        },
        spatialReference: {
            wkid: {
                type: Number
            },
            latestWkid: {
                type: Number
            }}
    }
    
  
},
{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
        }
    }
}
)


geolocationSchema.statics.build = (geolocation: GeolocationAttr) => {
    return new Geolocation(geolocation);
}

export const Geolocation = mongoose.model<GeolocationDoc,GeolocationModel>('Geolocation', geolocationSchema);