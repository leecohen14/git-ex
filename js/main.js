function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks(); //will be got from a function
    var strHTMLs = books.map((book) => {
        return `<tr text-center> 
        <td>${book.id}</td>
        <td class="bookName" >${book.name}</td>
        <td >${formatCurrency(book.price)}</td>
        <td data-trans="read"  class="read btn btn-success  " onclick="onDetails('${book.id}')">Read</td>
        <td data-trans="update"  class="update btn btn-primary mx-1" onclick="onUpdateBook('${book.name}')" >Update</td>
        <td data-trans="delete"  class="delete btn btn-danger " onclick="onRemoveBook('${book.id}')">Delete</td>
        </tr>`
    });
    document.querySelector('.books-table tbody').innerHTML = strHTMLs.join('');
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook(ev) {
    ev.preventDefault();
    var elName = document.querySelector('input[name=bookName]');
    var elPrice = document.querySelector('input[name=price]');
    addBook(`${elName.value}`, +elPrice.value);
    elName.value = '';
    elPrice.value = '';
    renderBooks();

}

function onUpdateBook(bookId) {
    var bookPrice = +prompt('enter book\'s price');
    updateBook(bookId, bookPrice)
    renderBooks();
}

function onDetails(bookId) {
    var elModal = document.querySelector('.modal');
    if (elModal.style.display === 'none') {
        var book = getBookById(bookId); // the service will handle how to get my current book. try find. write the logic!
        gBook = book;
        var imgStr = `<img class="img-fluid rounded w-50 " src="${book.imgUrl}" alt="">`;
        document.querySelector('.image-span').innerHTML = imgStr;
        document.querySelector('.details').innerHTML = book.details;
        document.querySelector('.rate-num').innerHTML = book.rate;
        elModal.style.display = 'flex';
    } else {
        elModal.style.display = 'none'; // better handle it with a class
    }
}

function onPlus() {
    ratePlus();
    document.querySelector('.rate-num').innerHTML = gBook.rate;
}

function onMinus() {
    rateMinus();
    document.querySelector('.rate-num').innerHTML = gBook.rate;
}

function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class to document.body
    // if (lang === 'he') document.body.classList.add('rtl')
    // else document.body.classList.remove('rtl')
    if (lang === 'he') document.body.setAttribute("dir", "rtl");
    else document.body.removeAttribute("dir", "rtl")
    renderBooks();
    doTrans();
}

function onCloseModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}