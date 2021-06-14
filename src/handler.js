const books = require('./books');
const { nanoid } = require('nanoid');

//addBookHandler
const addBookHandler = (request, h) => {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = false;

    const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };

    //validasi field name,readPage,pageCount
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;
     if (isSuccess) { // jika validasi berhasil, dilanjutkan ke proses POST data
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }else if(!isSuccess)  {
        const response = h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',
        });
        response.code(500);
        return response;
    }


};


//getAllBooksHandler
const getAllBooksHandler = (request,h) => {
    const {name,reading,finished} =request.query;
    if(!name && !reading && !finished){
        const response = h.response({
            status: 'success',
            data:{
                books: books.map((books) =>({
                    id: books.id,
                    name: books.name,
                    publisher: books.publisher,
                })),
            }

        });
        response.code(200);
        return response;
    }
    if(name){
        const bookFilterName = books.filter((book) => book.name);
        const response = h.response({
            status: 'success',
            data:{
                books: bookFilterName.map((books) =>({
                    id: books.id,
                    name: books.name,
                    publisher: books.publisher,
                })),
            }

        });
        response.code(200);
        return response;
    }

    if(reading){
        const bookReadingFilter = books.filter((book)=> Number(book.reading) === Number(reading),);
        const response = h.response({
            status: 'success',
            data:{
                books: bookReadingFilter.map((books) =>({
                    id: books.id,
                    name: books.name,
                    publisher: books.publisher,
                })),
            }
        });
        response.code(200);
        return response;
    }
    if(finished){

            const bookFinished = books.filter((book) => Number(book.finished)=== Number(finished),);
            const response = h.response({
                status: 'success',
                data:{
                    books: bookFinished.map((books) =>({
                        id: books.id,
                        name: books.name,
                        publisher: books.publisher,
                    })),
                }
    
            });
            response.code(200);
            return response;
        }

    //error generic
    const response = h.response({
        status: 'fail',
        message: 'ada Kesalahan',
    });
    response.code(500);
    return response;
    
  }; 

//getBooksByIdHandler

const getBooksByIdHandler =(request, h) =>{
    const { id } = request.params;
    const book = books.filter((n) => n.id === id)[0];
    if (book != undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

//editBookHandler
const editBookHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    let finished = false;
    if(readPage === pageCount){
        finished = true;
    }
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const index = books.findIndex((book) => book.id === id);
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;

    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;

    }
    if (index !== -1) {
        books[index] = {
            ...books[index], 
            name, year, author, 
            summary, publisher, pageCount, readPage,finished,reading,insertedAt,updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',

        });
        response.code(200);
        return response;

        
    } else if (index == -1) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    } 

};

//deleteBookByIdHandler
const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
        response.code(404);
        return response;
};

module.exports = {
    addBookHandler,getAllBooksHandler,
    getBooksByIdHandler,editBookHandler,
    deleteBookByIdHandler,
};