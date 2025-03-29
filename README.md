# API ONG Lar São Francisco
API para gerenciar os animais resgatados e suas necessidades dentro da ONG Lar São Francisco.

---

<p align="center">
  <a href="#-recursos">Recursos</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-endpoints">Endpoints</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar-o-projeto">Como executar</a> 
</p>

---

## 📌 Recursos
- Gerenciamento de animais (CRUD completo)
- Lista de necessidades (needsList) de cada animal (CRUD completo)
- API RESTful estruturada para facilitar a integração

---

## 🔧 Tecnologias
- NestJS - Framework backend
- MongoDB - Banco de dados
- Mongoose - ODM para MongoDB

---

## 📍 Endpoints
### 🐾 CRUD para Animal

#### Criar um novo animal:
  - ```POST``` ```/api/v1/animal```
  - Request Boby:
  ```
    {
      "name": "Bob",
      "birthDate": "2022-06-15",
      "personality": "Brincalhão e carinhoso",
      "size": "small",
      "vaccinated": true,
      "neutered": true,
      "needsList": [
        { "image": "https://example.com/racao.jpg", "name": "Ração Premium", "price": 50.00 },
        { "image": "https://example.com/cama.jpg", "name": "Caminha confortável", "price": 120.00 }
      ],
      "about": "Bob foi resgatado da rua e ama brincar com outros cachorros.",
      "availableForAdoption": true
    }
  ```
#### Listar todos os animais
  - ```GET``` ```/api/v1/animal```
  - Resposta (exemplo):
    ```
    [
      {
          "_id": "67e71b4319010f44134c2b4d",
          "name": "Mia",
          "birthDate": "2022-06-15T00:00:00.000Z",
          "personality": "Carinhosa",
          "size": "pequeno",
          "vaccinated": true,
          "neutered": true,
          "about": "Bob foi resgatado da rua e ama brincar com outros cachorros.",
          "availableForAdoption": true,
          "needsList": [],
          "createdAt": "2025-03-28T21:57:23.269Z",
          "updatedAt": "2025-03-28T21:57:23.269Z",
          "__v": 0
      },
      {
          "_id": "67e736725a2ca9429f526ec2",
          "name": "Bob",
          "birthDate": "2022-06-15T00:00:00.000Z",
          "personality": "Brincalhão e carinhoso",
          "size": "grande",
          "vaccinated": true,
          "neutered": true,
          "needsList": [],
          "about": "Bob foi resgatado da rua e ama brincar com outros cachorros.",
          "availableForAdoption": true,
          "createdAt": "2025-03-28T19:54:22.513Z",
          "updatedAt": "2025-03-28T23:57:54.810Z",
          "__v": 4
      }
    ]
    ```

#### Obter detalhes de um animal específico
  - ```GET``` ```/api/v1/animal/:id```

#### Atualizar um animal
  - ```PATCH``` ```/api/v1/animal/:id```
  - Request Body (exemplo de atualização parcial):
    ```
    {
      "availableForAdoption": false
    } 
    ``` 

#### Remover um animal
- ```DELETE``` ```/api/v1/animal/:id```

---

### Gerenciamento da ```needsList``` dentro de um animal
#### Adicionar um item à needsList
- ```POST``` ```/api/v1/animal/:id/needs```
  ```
    {
      "image": "https://exemplo.com.br/racao.jpg",
      "name": "Ração",
      "price": 150
    }
  ```

#### Listar todos os itens da needsList de um animal
  - ```GET``` ```/api/v1/animal/:id/needs```

#### Obter detalhes de um item da needsList
  - ```GET``` ```/api/v1/animal/:id/needs/:needId```

#### Atualizar um item da needsList
  - ```PATCH``` ```/api/v1/animal/:id/needs/:needId```
  - Request Body (exemplo):
    ```
      {
        "price": 180
      }
    ```

#### Remover um item da needsList
- ```DELETE``` ```/api/v1/animal/:id/needs/:needId```

---

## 🛠 Como Executar o Projeto
1. Clone o repositório
  ```
  git clone https://github.com/lucianakyoko/lar-sao-francisco.git
  ```
2. Navegue até o diretório do projeto e instale as dependências
  ```
    cd lar-sao-francisco
    npm install
  ```
3. Na raiz do projeto, crie o arquivo ```.env``` e adicione a variável de ambiente
  ```
  //.env
  MONGO_URI=[variavel]
  ```
4. Inicie a aplicação
  ```
  npm run start:dev
  ```
