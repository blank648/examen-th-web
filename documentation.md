# Documentatie Proiect

Acest document ofera o prezentare detaliata a proiectului, acoperind structura, baza de date, backend-ul si frontend-ul aplicatiei.

---

## Descrierea Proiectului

Proiectul este o aplicatie web simpla, construita cu **Node.js**, **Express**, si **EJS** ca motor de template-uri, ce afiseaza o lista de produse dintr-o baza de date **PostgreSQL**. Aplicatia calculeaza si afiseaza diverse detalii despre produse, inclusiv preturi reduse, arii, si permite utilizatorului sa calculeze o suma totala a produselor selectate. Stilul aplicatiei este personalizat folosind **SCSS** si **Bootstrap**.

---

## Structura Proiectului

Proiectul este compus din urmatoarele fisiere principale:

* `index.js`: Serverul principal al aplicatiei.
* `database.sql`: Script-ul SQL pentru crearea bazei de date.
* `views/produse.ejs`: Template-ul EJS pentru afisarea listei de produse.
* `custom-bootstrap.scss`: Fisier de stilizare pentru personalizarea Bootstrap.

---

## Baza de Date

Baza de date este definita in fisierul `database.sql`.

* **Tipuri personalizate**:
    * `unitate_masura`: Un tip ENUM ce poate avea valorile 'mm', 'cm', 'm'.
    * `tip_produs`: Un tip ENUM ce poate avea valorile 'rotunda', 'patrata', 'dreptunghiulara'.
* **Tabela `produse`**:
    * `id`: Cheie primara, seriala.
    * `nume`: Numele produsului (VARCHAR).
    * `latime`: Latimea produsului (NUMERIC).
    * `lungime`: Lungimea produsului (NUMERIC, optional).
    * `um`: Unitatea de masura (foloseste tipul `unitate_masura`).
    * `tip`: Tipul produsului (foloseste tipul `tip_produs`).
    * `culori`: O lista de culori (ARRAY de TEXT).
    * `pret`: Pretul produsului (INTEGER, non-negativ).
    * `reducere`: Procentul de reducere (INTEGER, default 0, non-negativ).
    * `data_adaugarii`: Data adaugarii (TIMESTAMP WITH TIME ZONE, default la momentul inserarii).

---

## Backend (Server-side)

Logica server-ului se gaseste in `index.js`.

* **Tehnologii**: Aplicatia foloseste **Express.js** pentru a rula serverul si a gestiona rutele. Se conecteaza la o baza de date **PostgreSQL** folosind pachetul `pg`.
* **Ruta `/produse`**:
    * Defineste o ruta `GET` la `/produse`.
    * Interogheaza baza de date pentru a prelua toate produsele din tabela `produse`.
    * Calculeaza aria pentru fiecare produs, convertind dimensiunile din 'mm' in 'cm' daca este necesar.
    * Daca in URL exista parametrul `arie` (ex: `/produse?arie=true`), calculeaza si trimite catre template aria minima si maxima a tuturor produselor.
    * Randeaza template-ul `produse.ejs`, trimitandu-i lista de produse si, optional, ariile minima si maxima.

---

## Frontend (Client-side)

Partea de frontend este gestionata de fisierul `views/produse.ejs`.

* **Afisarea Produselor**:
    * Parcurge lista de produse primita de la server si afiseaza fiecare produs intr-o sectiune `div` cu clasa `grid-produse`.
    * **Stilizare dinamica**:
        * Aplica o clasa de bordura diferita (`border-c1`, `border-c2`, `border-c3`) in functie de pozitia produsului in grila.
        * Afiseaza o forma geometrica (`cerc`, `patrat`, `dreptunghi`) colorata cu prima culoare din lista de culori a produsului.
    * **Conversie si Afisare Date**:
        * Converteste dimensiunile din 'mm' in 'cm' si le afiseaza cu doua zecimale.
        * Calculeaza si afiseaza aria pentru fiecare produs in 'cm²'.
        * Calculeaza pretul redus daca exista o reducere mai mare de 0 si il afiseaza taiat pe cel vechi, alaturi de cel nou si procentul de reducere.
    * **Tooltip**: Afiseaza un tooltip cu detalii despre produs (nume, tip, culori) la hover.

* **Interactivitate**:
    * **Calcul Suma**:
        * Un buton "calculeaza suma" declanseaza un script JavaScript.
        * Scriptul parcurge toate produsele si aduna preturile selectate (normal, redus, sau niciunul) prin butoanele radio.
        * Suma totala este afisata in `div`-ul cu id-ul `suma-totala`.
    * **Afisare Arii**: Daca serverul trimite `ariaMin` si `ariaMax`, acestea sunt afisate intr-o sectiune speciala in partea de jos a paginii.

* **Stilizare**:
    * Include fisierul `style.css` (care nu este furnizat) si fisierul `custom-bootstrap.scss`.
    * Fisierul `custom-bootstrap.scss` seteaza culoarea primara a Bootstrap la `#b71c1c` (o nuanta de rosu).

---

## Rulare Proiect

Pentru a rula acest proiect, sunt necesari urmatorii pasi:

1.  **Instalare dependinte**: `npm install express pg ejs`
2.  **Configurare Baza de Date**:
    * Asigurati-va ca aveti un server PostgreSQL care ruleaza.
    * Creati o baza de date (ex: `examen_iulie`).
    * Executati scriptul din `database.sql` pentru a crea tabela si tipurile necesare.
    * Actualizati detaliile de conectare la baza de date in fisierul `index.js` (host, port, user, password, database).
3.  **Populati baza de date**: Adaugati date in tabela `produse`.
4.  **Pornire Server**: Rulati comanda `node index.js` in terminal.
5.  **Accesare Aplicatie**: Deschideti un browser si navigati la `http://localhost:3000/produse`.