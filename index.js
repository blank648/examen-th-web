const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'examen_iulie',
});
module.exports = pool;

app.use(express.static('views'));

//1B 
app.get('/produse', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM produse');
        const produse = result.rows;
        //1D
        let arii = [];//stocheaza ariile produselor
        produse.forEach(prod => {//parcurge pentru fiecare produs
            
            let factor = 1;
            if (prod.um === 'mm') factor = 0.1;
            const latime = prod.latime * factor;
            const lungime = prod.lungime ? prod.lungime * factor : null;
            let arie = null;
            if (prod.tip === 'rotunda') {
                arie = Math.PI * Math.pow(latime / 2, 2);
            } else if (prod.tip === 'patrata') {
                arie = Math.pow(latime, 2);
            } else if (prod.tip === 'dreptunghiulara') {
                arie = (lungime || 0) * latime;
            }
            if (arie !== null && !isNaN(arie)) {
                arii.push(arie);
            }
        });

        let ariaMin = null, ariaMax = null;
        if (req.query.arie && arii.length > 0) {//verif daca este paramentrul arie in url si daca array-ul arii nu este gol
            ariaMin = Math.min(...arii);//gaseste valoarea minima din array
            ariaMax = Math.max(...arii);//gaseste valoarea maxima din array
        }
        //1B,3A
        res.render('produse', {
            produse,
            ariaMin: ariaMin ? ariaMin.toFixed(2) : null,
            ariaMax: ariaMax ? ariaMax.toFixed(2) : null,
            ariaUnit: 'cm 8' // cm²
        });
    } catch (error) {
        console.error('Eroare la interogarea produselor:', error);
        res.status(500).send('Eroare la interogarea produselor');
    }
});

app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
    console.log(`Accesează /produse pentru a vedea lista produselor.`);
});
