import express from "express";
import _ from "lodash";

//FAKE AWS KEYS FROM THE AWS DOCUMENTATION
const AWS_ACCESS_KEY_ID = 'AKIAIOSFODNN7EXAMPLF';
const AWS_SECRET_ACCESS_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEF';

const app = express();

// INTENTIONAL RCE VULNERABILITY
app.get('/calculate', (req, res) => {
    const result = eval(req.query.expr);
    res.json({ result });
});

app.get('/', (req, res) => { res.json({ status: "ok" }) });

app.listen(3000, () => { console.log('Running on port 3000') });