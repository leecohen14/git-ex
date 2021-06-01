var gBook = {};
var gBooks = [];
var gFilterBy = { txt: '' }
_createBooks();

function _createBook(name, price, rate = 0, imgUrl = 'https://images3.penguinrandomhouse.com/cover/9780739360385') {
    var book = {
        id: _makeId(),
        name,
        price,
        imgUrl,
        rate,
        details: 'very nice book about harry pottervery nice book about harry pottervery nice book about harry potter'
    }
    return book;
}

function _createBooks() {
    var books = loadFromStorage('books'); // this check should be handled inside the

    if (!books || !books.length) {
        books = [];
        books.push(_createBook('harry potter1', 120));
        console.log('object :>> ', _createBook('harry potter1', 120));
        books.push(_createBook('harry potter2', 125));
        books.push(_createBook('harry potter3', 130));
        books.push(_createBook('harry potter4', 140));

    }
    gBooks = books;
    _saveBooksToStorage();
}


function getBooks() {
    if (gFilterBy.txt === '') return gBooks;
    switch (gFilterBy.txt) {
        case 'price':
            gBooks.sort((bookA, bookB) => {
                return (bookA.price - bookB.price);
            })
            break;
        case 'title':
            gBooks.sort((bookA, bookB) => {
                var textA = bookA.name.charAt(0).toUpperCase();
                var textB = bookB.name.charAt(0).toUpperCase();
                if (textA < textB) return -1;
                if (textA > textB) return 1;
                return 0;
            })
            break;
        case 'id':
            gBooks.sort((bookA, bookB) => {
                var idA = bookA.id.charAt(0).toUpperCase();
                var idB = bookB.id.charAt(0).toUpperCase();
                if (idA < idB) return -1;
                if (idA > idB) return 1;
                return 0;
            })
            break;
    }

    // var regex = new RegExp(gFilterBy.txt, 'i')
    // var rgx = /ab*\dc/ // Cannot use this syntax while creating dynamic regex

    // var books = gBooks.filter((book) => {
    //     return regex.test(book.name)
    // });


    return gBooks;
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex((book) => {
        return book.id === bookId;
    })
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function addBook(name, price) {
    var book = _createBook(name, price);
    gBooks.push(book);
    _saveBooksToStorage()
}

function updateBook(name, price) {
    // gBooks = loadFromStorage('books');
    var bookIdx = gBooks.findIndex((book) => {
        if (book.name === name) return true;
    });
    gBooks[bookIdx].price = price;
    _saveBooksToStorage()
}

function getBookById(bookId) {
    return gBooks.find((book) => {
        return book.id === bookId;
    })
}

function _saveBooksToStorage() {
    saveToStorage('books', gBooks);
}

function ratePlus() {
    var bookIdx = gBooks.findIndex((book) => {
        return (gBook.id === book.id)
    });
    if (gBooks[bookIdx].rate > 9) return;
    gBooks[bookIdx].rate++;
    _saveBooksToStorage();
}

function rateMinus() {
    var bookIdx = gBooks.findIndex((book) => {
        return (gBook.id === book.id)
    });
    if (gBooks[bookIdx].rate < 1) return;
    gBooks[bookIdx].rate--;
    _saveBooksToStorage();
}

function onSetFilter(txt) {
    setFilter({ txt: txt })
    renderBooks();

}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}