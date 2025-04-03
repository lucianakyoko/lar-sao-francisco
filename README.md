# API ONG Lar São Francisco

API para gerenciar os animais resgatados e suas necessidades dentro da ONG Lar São Francisco.

---

<p align="center">
  <a href="#-recursos">Recursos</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-endpoints">Endpoints</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rotas-protegidas">Rotas Protegidas</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rotas-públicas">Rotas Públicas</a> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar-o-projeto">Como executar</a> 
</p>

---

## 📌 Recursos

- Gerenciamento de animais (CRUD completo)
- Lista de necessidades (needsList) de cada animal (CRUD completo)
- Gerenciamento de Doações
- API RESTful estruturada para facilitar a integração
- Login e senha
- Proteção de rotas privadas 

---

## 🔧 Tecnologias

- NestJS - Framework backend
- MongoDB - Banco de dados
- Mongoose - ODM para MongoDB
- JWT - Autenticação e troca segura de dados
- bcryptjs - Hash de senha

---

## 🔒 Rotas Protegidas
  - Animal <br>
    ➡️ `POST` `/api/v1/animal` <br>
    ➡️ `PATCH` `/api/v1/animal/:id` <br>
    ➡️ `DELETE` `/api/v1/animal/:id`

  - Need Item <br>
    ➡️ `POST` `/api/v1/animal/:id/needs` <br>
    ➡️ `PATCH` `/api/v1/animal/:id/needs/:needId` <br>
    ➡️ `DELETE` `/api/v1/animal/:id/needs/:needId`
  
  - Donation <br>
    ➡️ `GET` `/api/v1/donation` <br>
    ➡️ `GET` `/api/v1/donation/:id` <br>
    ➡️ `GET` `/api/v1/donation/animal/:animalId` <br>
    ➡️ `DELETE` `/api/v1/donation/:id`

---

## 🔓 Rotas Públicas
  - Animal <br>
    ➡️ `GET` `/api/v1/animal` <br>
    ➡️ `GET` `/api/v1/animal/:id`

  - Need Item <br>
    ➡️ `GET` `/api/v1/animal/:id/needs` <br>
    ➡️ `GET` `/api/v1/animal/:id/needs/:needId`

  - Donation <br>
    ➡️ `POST` `/api/v1/donation`

---

## 📍 Endpoints

### 🐾 CRUD para Animal

#### Criar um novo animal:

- `POST` `/api/v1/animal`
- Request Boby:

```
  {
    "name": "Bob",
    "birthDate": "2022-06-15",
    "personality": "Brincalhão e carinhoso",
    "size": "pequeno",
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

- `GET` `/api/v1/animal`
- Response (exemplo):
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

- `GET` `/api/v1/animal/:id`
- Response (exemplo):
  ```
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
    "needsList": [
        {
            "image": "https://exemplo.com.br/racao.jpg",
            "name": "Ração",
            "price": 150,
            "_id": "67e7f606e7cb1fc585003d86"
        },
        {
            "image": "https://exemplo.com.br/petiscos.jpg",
            "name": "Petiscos",
            "price": 30,
            "_id": "67e7f627e7cb1fc585003d8c"
        }
    ],
    "createdAt": "2025-03-28T21:57:23.269Z",
    "updatedAt": "2025-03-29T13:31:19.800Z",
    "__v": 2
  }
  ```

#### Atualizar um animal

- `PATCH` `/api/v1/animal/:id`
- Request Body (exemplo de atualização parcial):
  ```
  {
    "availableForAdoption": false
  }
  ```

#### Remover um animal

- `DELETE` `/api/v1/animal/:id`

---

### Gerenciamento da `needsList` dentro de um animal

#### Adicionar um item à needsList

- `POST` `/api/v1/animal/:id/needs`
- Request (exemplo):
  ```
    {
      "image": "https://exemplo.com.br/racao.jpg",
      "name": "Ração",
      "price": 150
    }
  ```

#### Listar todos os itens da needsList de um animal

- `GET` `/api/v1/animal/:id/needs`
- Response (exemplo):
  ```
    [
    {
        "image": "https://exemplo.com.br/racao.jpg",
        "name": "Ração",
        "price": 150,
        "_id": "67e7f606e7cb1fc585003d86"
    },
    {
        "image": "https://exemplo.com.br/petiscos.jpg",
        "name": "Petiscos",
        "price": 30,
        "_id": "67e7f627e7cb1fc585003d8c"
    }
  ]
  ```

#### Obter detalhes de um item da needsList

- `GET` `/api/v1/animal/:id/needs/:needId`:
- Response (exemplo):
  ```
  {
    "image": "https://exemplo.com.br/racao.jpg",
    "name": "Ração",
    "price": 150,
    "_id": "67e7f606e7cb1fc585003d86"
  }
  ```

#### Atualizar um item da needsList

- `PATCH` `/api/v1/animal/:id/needs/:needId`
- Request Body (exemplo):
  ```
    {
      "price": 180
    }
  ```

#### Remover um item da needsList

- `DELETE` `/api/v1/animal/:id/needs/:needId`

---

### Gerenciamento de `donation`

#### Adicionar uma doação

- `POST` `/api/v1/donation`
- Request Body (exemplo):
  ```
  {
    "donorName": "Carlos Silva",
    "animalId": "67e71b4319010f44134c2b4d",
    "donatedItems": [
      { "itemId": "67e7f606e7cb1fc585003d86", "quantity": 2 },
      { "itemId": "1217f606e7cb1fc585003d36", "quantity": 3 }
    ],
    "extraAmount": 100
  }
  ```

#### Listar todas as doações

- `GET` `/api/v1/donation/`
- Response (exemplo):
  ```
  [
    {
        "_id": "67e84f85946b63e9d0596a09",
        "donorName": "Carlos Silva",
        "animalId": {
            "_id": "67e736725a2ca9429f526ec2",
            "name": "Bob",
            "birthDate": "2022-06-15T00:00:00.000Z",
            "personality": "Brincalhão e carinhoso",
            "size": "grande",
            "vaccinated": true,
            "neutered": true,
            "needsList": [
                {
                    "image": "https://exemplo.com.br/racao.jpg",
                    "name": "Ração",
                    "price": 150,
                    "_id": "67e73a2b2522b23903e25dba"
                }
            ],
            "about": "Bob foi resgatado da rua e ama brincar com outros cachorros.",
            "availableForAdoption": true,
            "createdAt": "2025-03-28T19:54:22.513Z",
            "updatedAt": "2025-03-29T00:09:15.801Z",
            "__v": 5
        },
        "donatedItems": [
            {
                "itemId": "67e73a2b2522b23903e25dba",
                "quantity": 2
            }
        ],
        "extraAmount": 100,
        "createdAt": "2025-03-29T19:52:37.089Z",
        "updatedAt": "2025-03-29T19:52:37.089Z",
        "__v": 0
    }
  ]
  ```

#### Obter detalhes de uma doação

- `GET` `/api/v1/donation/:id`
- Response (exemplo):
  ```
    {
      "_id": "67e84f85946b63e9d0596a09",
      "donorName": "Carlos Silva",
      "animalId": {
          "_id": "67e736725a2ca9429f526ec2",
          "name": "Bob",
          "birthDate": "2022-06-15T00:00:00.000Z",
          "personality": "Brincalhão e carinhoso",
          "size": "grande",
          "vaccinated": true,
          "neutered": true,
          "needsList": [
              {
                  "image": "https://exemplo.com.br/racao.jpg",
                  "name": "Ração",
                  "price": 150,
                  "_id": "67e73a2b2522b23903e25dba"
              }
          ],
          "about": "Bob foi resgatado da rua e ama brincar com outros cachorros.",
          "availableForAdoption": true,
          "createdAt": "2025-03-28T19:54:22.513Z",
          "updatedAt": "2025-03-29T00:09:15.801Z",
          "__v": 5
      },
      "donatedItems": [
          {
              "itemId": "67e73a2b2522b23903e25dba",
              "quantity": 2
          }
      ],
      "extraAmount": 100,
      "createdAt": "2025-03-29T19:52:37.089Z",
      "updatedAt": "2025-03-29T19:52:37.089Z",
      "__v": 0
    }
  ```

#### Obter detalhes de uma doação por animal

- `GET` `/api/v1/donation/animal/:animalId`
- Response (exemplo):

    ```
      {
          "animal": {
              "_id": "67e736725a2ca9429f526ec2",
              "name": "Bob",
              "birthDate": "2022-06-15T00:00:00.000Z",
              "personality": "Brincalhão e carinhoso",
              "size": "grande",
              "vaccinated": true,
              "neutered": true,
              "needsList": [
                  {
                      "image": "https://exemplo.com.br/racao.jpg",
                      "name": "Ração",
                      "price": 150,
                      "_id": "67e73a2b2522b23903e25dba"
                  }
              ],
              "about": "Bob foi resgatado da rua e ama brincar com outros cachorros.",
              "availableForAdoption": true,
              "createdAt": "2025-03-28T19:54:22.513Z",
              "updatedAt": "2025-03-29T00:09:15.801Z",
              "__v": 5
          },
          "donations": [
              {
                  "_id": "67e84f85946b63e9d0596a09",
                  "donorName": "Carlos Silva",
                  "donatedItems": [
                      {
                          "itemId": "67e73a2b2522b23903e25dba",
                          "quantity": 2
                      }
                  ],
                  "extraAmount": 100,
                  "createdAt": "2025-03-29T19:52:37.089Z"
              }
          ]
      }
    ```

#### Remover uma doação

- `DELETE` `/api/v1/donation/:id`

---

### Autenticação

### Login do usuário

- `POST` `/api/v1/auth/login`
- Request Body (exemplo):
  ```
    {
      "username": "user",
      "password": "senha"
    }
  ```

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

3. Na raiz do projeto, crie o arquivo `.env` e adicione a variável de ambiente

```
//.env
MONGO_URI=[variavel]
```

4. Inicie a aplicação

```
npm run start:dev
```
