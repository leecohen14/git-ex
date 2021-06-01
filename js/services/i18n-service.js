var gTrans = {
    title: {
        en: 'Book Shop',
        es: 'librería',
        he: 'חנות ספרים'
    },
    'id-head': {
        en: 'Id',
        es: 'identificación',
        he: 'מס׳ זהות',
    },
    'title-head': {
        en: 'Title',
        es: 'título',
        he: 'שם הספר',
    },
    'price-head': {
        en: 'price',
        es: 'precio',
        he: 'מחיר'
    },
    'actions-head': {
        en: 'Actions',
        es: 'comportamiento',
        he: 'פעולות',
    },
    // 'book-price': {
    //     en: 'Actions',
    //     es: 'comportamiento',
    //     he: 'פעולות',
    // },
    'read': {
        en: 'Read',
        es: 'mostrar',
        he: 'הצג',
    },
    'update': {
        en: 'Update',
        es: 'actualizar',
        he: 'עדכן',
    },
    'delete': {
        en: 'Delete',
        es: 'borrar',
        he: 'מחק',
    },
    'add-book-name': {
        en: 'Book Name',
        es: 'nombre del libro',
        he: 'שם הספר',
    },
    'add-book-price': {
        en: 'Book Price',
        es: 'precio del libro',
        he: 'מחיר הספר',
    },
    'add-book-btn': {
        en: 'Add Book',
        es: 'agregar libro',
        he: 'הוסף ספר',
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
        // console.log(keyTrans);

    // TODO: if key is unknown return 'UNKNOWN'
    if (!keyTrans) return 'UNKNOWN'
        // TODO: get from gTrans

    var txt = keyTrans[gCurrLang];
    // TODO: If translation not found - use english
    if (!txt) return keyTrans.en

    return txt
}

function doTrans() {
    // TODO: 
    var els = document.querySelectorAll('[data-trans]')
        // console.log(els);

    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    els.forEach(function(el) {
        // console.dir(el)
        var txt = getTrans(el.dataset.trans)
        if (el.nodeName === 'INPUT') el.placeholder = txt;
        else el.innerText = txt
            //    ITP: support placeholder  

        // console.log('el.dataset', el.dataset.trans);       
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    console.log('try to format', gCurrLang);
    var x = new Intl.NumberFormat(gCurrLang).format(num);
    console.log('x :>> ', x);
    return x;
}

function formatCurrency(num) {
    if (gCurrLang === 'he') {
        return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
    } else if (gCurrLang === 'es') {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(num);
    } else {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    }
}

function formatDate(time) {

    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}