const express = require('express')
const app = express()

//habilitamos JSON
app.use(express.json());

//End point(rotas)principal
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/oi', function (req, res) {
  res.send('Ola mundo')
});

//endpoint de herois
const lista = ["Mulher Maravilha", "Capitã Marvel", "Homem de ferro"];


//Read all -> GET /herois
app.get("/herois", function(req,res) {
  res.send(lista);
});

//Create -> POST /herois
app.post("/herois", function(req, res){
  //console.log(req.body, typeof req.body);

  //Extrair o nome do body da Request
  const item = req.body.nome;

  //Inserir item na lista
  lista.push(item);

  //Enviamos uma mensagem de resposta
  res.send("Item criado com sucesso");
});



app.listen(3000)