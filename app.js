// Inlcuindo a biblioteca
const http = require('http');
const url = require('url'); // Lógica para incluir a URL através do site npmjs.com
const queryString = require('query-string'); // Incluindp NPM de Query string "informação no link do navegador"
const fs = require('fs'); // Trabalhando com File System


// Definição de endereço / URL  
const hostname = '127.0.0.1';
const port = 3000;

// Implementação da regra de negócio (Lógica de programação)
const server = http.createServer((req, res) => {

  var resposta
  const urlparse = url.parse(req.url, true)
  // Receber info do Usuario
  const params = queryString.parse(urlparse.search);


  // Criar um usuario
    if (urlparse.pathname == '/criar-usuario') {


      // Salvar info do Usuario e Atualizar um usuario
      fs.appendFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved!');

      res.statusCode = 200; // Código para "tudo certo" oposição a 404
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
      });

      resposta = 'Usuario criado com sucesso'

    }
    
    // Selecionar um usuario
    else if (urlparse.pathname == '/selecionar-usuario') {
      fs.readFile('users/' + params.id + '.txt', function(err, data) {
        resposta = data

        res.statusCode = 200; // Código para "tudo certo" oposição a 404
        res.setHeader('Content-Type', 'application/json');
        res.end(resposta);
      });
    }


  // Remover um usuario
  else if (urlparse.pathname == '/remover-usuario'){
    fs.unlink('users/' + params.id + '.txt', function (err) {
      console.log('File deleted!');
    });
    resposta = "usuario removido!"
    
    res.statusCode = 200; // Código para "tudo certo" oposição a 404
    res.setHeader('Content-Type', 'application/json');
    res.end(resposta);
  }



});


// Execução do servidor
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// ------------COMANDOS------------
// http://localhost:3000/criar-usuario?nome=murilo&idade=24&id=1
// http://localhost:3000/selecionar-usuario?id=1
// http://localhost:3000/remover-usuario?id=1
