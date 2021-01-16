const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/api/rates', (req,res,next)=>{
        let base = req.query.base;
        let currency = req.query.currency;
        fetch(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`)
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            res.send({
                results:{
                    base: data.base,
                    date: data.date,
                    rates: data.rates
                }
            });
        })
        .catch(error=>{
            res.status(404)
            res.send(error)
        })
})  
app.use((req, res, next)=>{
    res.status(404);
    res.send({
        error: 'Not Found'
    })
})

PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Now running on port ${PORT}!`);
})