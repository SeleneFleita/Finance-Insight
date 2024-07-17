import jwt from 'jsonwebtoken';

export const generarJWT = (id) => {
    return new Promise ((res, rej)=>{
        jwt.sign(id, 'mysecret', {
            expiresIn: 60*60
        }, (err, token)=> {
                (err)?rej(err):res(token);
            })
    })
}

export {jwt}