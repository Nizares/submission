const {handlerNambahBuku, 
    handlerLihatSemuaBuku,
    handerLihatDetailSalahSatuBuku,
    handlerUpdateBuku,
    handlerDeleteBuku } = require('./handler');


const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: handlerNambahBuku,
    },
    {
        method: 'GET',
        path: '/books',
        handler: handlerLihatSemuaBuku,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: handerLihatDetailSalahSatuBuku,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: handlerUpdateBuku,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: handlerDeleteBuku,
    }
];

module.exports = routes;