const Hapi = require('@hapi/hapi');
const routes= require('./routes');
const http = require('http'); 

const requestListerner =(request,response) =>{
    response.setHeader('Content-Type', 'application/json');
}

const init = async() =>{
    const serverBook = Hapi.Server({
        port:5000,
        host:'localhost',
        routes:{
            cors:{ origin:['*'],},
        },
    });

serverBook.route(routes);
await serverBook.start();
console.log(`Server berjalan pada ${serverBook.info.uri}`);
};

init();