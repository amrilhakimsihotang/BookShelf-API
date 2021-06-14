const{ addBookHandler,getAllBooksHandler,
    getBooksByIdHandler,editBookHandler,
    deleteBookByIdHandler} = require('./handler');

const routes =[
    {
        method: 'POST',
        path:'/books',
        handler:addBookHandler,
    },
    
    {
        method:'GET',
        path:'/books',
        handler:getAllBooksHandler,
    }, 
    {   
        method:'GET',
        path:'/books/{id}',
        handler: getBooksByIdHandler,
    },
    {
        method:'PUT',
        path:'/books/{id}',
        handler:editBookHandler,
    },
    {
        method:'DELETE',
        path:'/books/{id}',
        handler:deleteBookByIdHandler,
    }
];

module.exports = routes;