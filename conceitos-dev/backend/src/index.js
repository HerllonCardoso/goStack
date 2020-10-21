const express = require('express');  //importa o express
const {uuid} = require('uuidv4'); // importa a lib uuid que atribui IDS unicos e aleatorios.

const app = express(); //constante app usaram o express.

app.use(express.json());  //para podermos receber respostas JSON pelo express.

const projects = []; //criar um array vazio para guardar os projetos.

// aqui criaremos nossa primeira rota, uma função que usará o metodo http GET, que iremos listar todos os projetos.
app.get('/projects', (request, response) => {

  //utilizando o parametro query, que trara a informação title digitada em seu parametro da url.
  const { title } = request.query;
  
  //cria uma variavel com o resultado do title vindo do parametro query.
  const results = title

  //um IF ternário que verifica que
  //Se dentro do projetos possuir um projeto que tenha um titulo igual o titulo passado por parametro, passe o titulo.
  //Se naio tiver, retornar todos os projetos
  ? projects.filter(project => project.title.includes(title))
  : projects;

  //retorna a variavel results em json
  return response.json(results);
});

//Segunda rota iremos criar um projeto com o metodo POST.
app.post('/projects', (request, response) => {
  //Desestruturando o parametro body, que ira trazer o title e o owner.
    const {title, owner} = request.body
 
    //criar uma variavel project que ira receber o ID: vindo da lib UUID, titulo e owner vindos do body da requisição feitas pelo usuario.
    const project = { id: uuid(), title, owner}

    //Iremos fazer o metodo push no array projects, incluindo o project.
    //Ou seja jogaremos os conteudos de project dentro de projects.
    projects.push(project)

    //retornara os projects em JSON.
  return response.json(
  projects, 
);
})

//Criada uma rota para editar o usuario, com o metodo HTTP PUT. que ira identificar o projeto por id e edita-lo
app.put('/projects/:id', (request, response) => {

  //Iremos desestruturar o param e receber o ID do projeto atraves do parametro route params(/:id).
  const {id } = request.params
 //Iremos desestruturar o corpo da requisição e receber o title e owner.
  const {title, owner} = request.body

  // uma variavel que iera receber uma função para encontrar o indice, 
  //temos o array de projects que sera percorrido em busca de um project que o id seja igual ao ID desestruturado vindo do route params.
  const projectIndex = projects.findIndex(project => project.id === id);

  //SE O ID FOR ENCONTRADO, ELE RETORNARA 0;
  //SE O ID NAO FOR ENCONTRADO, ELE RETORNARA -1;

//Com isso esse id caira em uma condição para verificar se esse id existe. 
// se o indice for menor que zero, retornar Projeto nao encontrado.
  if(projectIndex < 0){
    return response.status(400).json({ error: 'Project not found'})
  }

  //entao a variavel project ira receber o id, title, e owner.

  const project = {
    id,
    title, 
    owner
  };
  
  // entao a posição[projectIndex] no array projects irá receber o project atualizados.
  projects[projectIndex] = project;


  //retornar o projects em JSON.
    return response.json(projects);
  })


//A ultima rota é para deletar um usuario
app.delete('/projects/:id', (request, response) => {
  // Iremos desestruturar o ID vindo do route.params(:id)
  const {id} = request.params;

  //Iremos criar uma variavel projetIndex que recebera uma função e percorrera o projects array, em busca do id
  const projectIndex = projects.findIndex(project => project.id === id);
 
  //SE O ID FOR ENCONTRADO, ELE RETORNARA 0;
  //SE O ID NAO FOR ENCONTRADO, ELE RETORNARA -1;

  // Se o id for menor que 0 retornara mensagem de erro.
  if(projectIndex < 0){
    return response.status(400).json({ error: 'Project not found'})
  }

//Usando o metodo splice para remover do array, o indice do projeto.
  projects.splice(projectIndex, 1);
  
  return response.status(204).send();
  })

//app usara o metodo listen para ficar ouvindo todas as alteraçoes na porta 3333
app.listen(3333,() => {
  console.log('Back-end started')
});
