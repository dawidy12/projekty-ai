// Funkcja obliczania cyklicznych
function obliczCykliczne(kwota, oprocentowanie, okres) {
    const miesieczneOprocentowanie = oprocentowanie / 1200;
    const iloczyn = 1 + miesieczneOprocentowanie;
    const wyplata = kwota * iloczyn ** okres / (iloczyn - 1);
    return wyplata;
}

// Funkcja obliczania pojedynczych
function obliczPojedyncze(kwota, oprocentowanie, okres) {
    const miesieczneOprocentowanie = oprocentowanie / 1200;
    const iloczyn = 1 + miesieczneOprocentowanie;
    const wynik = kwota * iloczyn ** okres;
    return wynik;
}

// Pobieranie elementów HTML
const formularz = document.getElementById('formularz');
const wyniki = document.getElementById('wyniki');
const historiaList = document.getElementById('historia-list');

// Funkcja zapisywania danych w localStorage
function zapiszDane(kwota, oprocentowanie, okres, typObliczenia, wynik) {
    const dane = {
        kwota: kwota,
        oprocentowanie: oprocentowanie,
        okres: okres,
        typObliczenia: typObliczenia,
        wynik: wynik,
        data: new Date().toLocaleString()
    };

    localStorage.setItem('historia', localStorage.getItem('historia') ?
        JSON.parse(localStorage.getItem('historia')).concat(dane) : [dane]);
    aktualizujHistorię();
}

// Funkcja aktualizowania historii
function aktualizujHistorię() {
    historiaList.innerHTML = ''; // Wyczyść listę historii

    const historia = JSON.parse(localStorage.getItem('historia') || '[]'); // Pobierz historię z localStorage

    historia.forEach(dane => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p>Kwota: ${dane.kwota}</p>
            <p>Oprocentowanie: ${dane.oprocentowanie}%</p>
            <p>Okres: ${dane.okres} miesięcy</p>
            <p>Typ obliczenia: ${dane.typObliczenia}</p>
            <p>Wynik: ${dane.wynik}</p>
            <p>Data: ${dane.data}</p>
        `;
        historiaList.appendChild(li);
    });
}

// Obsługa zdarzenia submit formularza
formularz.addEventListener('submit', function (e) {
    e.preventDefault();

    const kwota = parseFloat(document.getElementById('kwota').value);
    const oprocentowanie = parseFloat(document.getElementById('oprocentowanie').value);
    const okres = parseInt(document.getElementById('okres').value);
    const typObliczenia = document.getElementById('typObliczenia').value;

    let wynik;

    if (typObliczenia === "cykliczne") {
        wynik = obliczCykliczne(kwota, oprocentowanie, okres);
    } else {
        wynik = obliczPojedyncze(kwota, oprocentowanie, okres);
    }

    wyniki.innerHTML = `Wynik: ${wynik.toFixed(2)}`;

    // Zapisz dane w localStorage
    zapiszDane(kwota, oprocentowanie, okres, typObliczenia, wynik);

    // Aktualizuj historię
    aktualizujHistorię();
});

// Pobierz i wyświetl historię przy pierwszym wczytaniu strony
aktualizujHistorię();
