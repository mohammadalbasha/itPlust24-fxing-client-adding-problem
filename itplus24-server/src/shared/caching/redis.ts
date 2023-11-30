// ** this is not the best practise to work with redis in nestjs ** //

const Redis = require("redis")
const redisClient = Redis.createClient({url : process.env.REDIS_URL}) //  url for production instance of redis // or ()
redisClient.connect();

export const getOrSetCache =  (key: string, cb:any) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key)
                    .then (async (data: any, error: any) => {
                        if (error){
                            console.log(error)
                            return reject(error)
                        }
                        if (data){
                            console.log("cache hit")
                            return resolve(JSON.parse(data));
                        }
                        console.log("cache miss");
                        const new_data = await cb();
                        redisClient.setEx(key, 3600, JSON.stringify(new_data));
                        resolve(new_data);
                    })

    })
}


export const getCache =  (key: string) => {
        return redisClient.get(key)
                    .then ((data: any, error: any) => {
                        if (error){
                            return false;
                        }
                        else if (data){
                            console.log("cache hit")
                            return JSON.parse(data);
                        }
                        else {
                            console.log("cache miss");
                            return false;
                        }

                       
                    })

  
}

export const setCache = (key:string, value:any) => {
    redisClient.setEx(key, 3600, JSON.stringify(value));
}
export const clearCache = (key: string) => {
    return redisClient.del(key)
                        .then(() => {})
}