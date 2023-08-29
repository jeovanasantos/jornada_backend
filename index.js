const express = require('express')
const app = express()

//End point(rotas)principal
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function (req, res) {
  res.send('Ola mundo')
});

//endpoint de herois
const lista =["Mulher Maravilha", "Capitã Marvel", "Homem de ferro"];

//Read all -> GET /herois
app.get("/herois", function(req,res) {
  res.send(lista);
});
app.listen(3000)