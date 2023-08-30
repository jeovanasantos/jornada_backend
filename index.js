const express = require('express');
const {MongoClient, ObjectId} = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName= "jornada-backend";
const client = new MongoClient(url);


async function main(){
  console.info("Conectando ao banco de dados...");
  await client.connect();
  console.info("Banco de dados conectado com sucesso!");
 
  const db =client.db(dbName);
  const collection = db.collection("herois");

const app = express();

//habilitamos o processamento de JSON
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
app.get("/herois", async function(req,res) {
  const itens = await collection.find().toArray();
  res.send(itens);
});

//Create -> POST /herois
app.post("/herois", async function(req, res){
  //console.log(req.body, typeof req.body);

  //Extrair o nome do body da Request
  const item = req.body;

//Inserir item na collection
  await collection.insertOne(item);
  
  //Enviamos uma mensagem de resposta
  res.send(item);
});

//Read By ID ->[GET] /herois/:
app.get("/herois/:id", function(req,res){

// pegamos o parâmetro pelo id
  const id = req.params.id -1;

//pegamos dados da lista
  const item = lista[id];

// Resultado da endpoint
  res.send(item);
});


//Update -> [PUT] /herois/:id
app.put("/herois/:id", async function (req, res){
  const id = req.params.id;

  await collection.updateOne({_id: new ObjectId(id)}, {$set: item});
  const item = req.body.nome;

  res.send(item);
});

//delete -> [DELETE] /herois/:id
app.delete("/herois/:id", function(req,res){
  
  const id = req.params.id -1;

  delete lista[id];

  res.send("Item excluido com sucesso")
 })
app.listen(3000);
}

main();