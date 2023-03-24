const { nanoid } = require('nanoid');
const books = require('./books');

const errorHandlerTambahBuku = (h) => {
    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan... silahkan ulang kembali',
    });
    response.code(500);
    return response;
};

const handlerNambahBuku = (request, h) => {
    try {
        const { name, 
            year,
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            reading } = request.payload;

        const id = nanoid(16);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        const finished = readPage === pageCount;

        const newBook = {
            id, 
            name, 
            year, 
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            finished,
            reading, 
            insertedAt, 
            updatedAt,
        };

        if (!name || name === '' || name === undefined) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }

        if (readPage > pageCount) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }

        books.push(newBook);
        const isSuccess = books.filter((book) => book.id === id).length > 0;
        if (isSuccess) {
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id,
                },
            });
            response.code(201);
            return response;
        }
        return errorHandlerTambahBuku(h);
    } catch (error) {
        return errorHandlerTambahBuku(h);

    }
};

const errorHandlerLihatBuku = (h) => {
    const response = h.response({
        status: 'error',
        message: 'Buku gagal dilihat... silahkan ulang kembali',
    });
    response.code(500);
    return response;
};
const handlerLihatSemuaBuku = (request, h) => {
    try {
        let listSemuaBuku = books.map((book) => ({ ...book }));
        const { name, reading, finished } = request.query;
        if (name !== undefined && name !== '') {
            listSemuaBuku = listBuku.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (reading !== undefined && reading !== '') {
            listSemuaBuku = listBuku.filter((book) => {
                if (reading === 1) {
                    return book.reading === reading;
                }
                return book.reading === 0;
            });
        }
        if (finished !== undefined && finished !== '') {
            listSemuaBuku = listBuku.filter((book) => {
                if (finished === 1) {
                    return book.finished === finished;
                }
                return book.finished === 0;
            });
        }
        const bookMaps = (book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        });
        listSemuaBuku = listSemuaBuku.map(bookMaps);
        const response = h.response({
            status: 'success',
            data: {
                books: listSemuaBuku,
            },
        });
        response.code(200);
        return response;
    } catch (error) {
        return errorHandlerLihatBuku(h);
    }
};

const handerLihatDetailSalahSatuBuku = (request, h) => {
    try {
        const { id } = request.params;

        const book = books.filter((b) => b.id === id)[0];

        if (book !== undefined) {
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
        })
        response.code(404);
        return response;
    } catch (error) {
        return errorHandlerLihatBuku(h);
    }
};

const errorHandlerUpdateBuku = (h) => {
    const response = h.response({
        status: 'error',
        message: 'Buku gagal diperbarui... silahkan ulang kembali',
    });
    response.code(500);
    return response;
};

const handlerUpdateBuku = (request, h) => {
    try {
        const { id } = request.params;

        const { name, 
            year,
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            reading } = request.payload;
    

        if (!name || name === '' || name === undefined) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }

        if (readPage > pageCount) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }
        const updatedAt = new Date().toISOString();
        const index = books.findIndex((book) => book.id === id);
        const finished = readPage === pageCount;

        if (index !== -1) {
            books[index] = {
                ...books[index],
                name, 
                year, 
                author,
                summary, 
                publisher, 
                pageCount, 
                readPage,
                finished, 
                reading, 
                updatedAt,
            };
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
            });
            response.code(200);
            return response;
        }
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    } catch (error) {
        return errorHandlerUpdateBuku(h);
    }
};

const errorHandlerDeleteBuku = (h) => {
    const response = h.response({
        status: 'error',
        message: 'Buku gagal dihapus... silahkan ulang kembali',
    });
    response.code(500);
    return response;
};
const handlerDeleteBuku = (request, h) => {
    try {
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
    } catch (error) {
        return errorHandlerDeleteBuku(h);
    }
};
module.exports = {
    handlerNambahBuku,
    handlerLihatSemuaBuku,
    handerLihatDetailSalahSatuBuku,
    handlerUpdateBuku,
    handlerDeleteBuku
};