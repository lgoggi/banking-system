
# banking-system

Daplicação web fullstack, dockerizada, que simula um sistema bancário em que usuários consigam realizar transferências internas entre si.


## Documentação da API

#### Cria o registro do usuário

```http
  POST /signup
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | nome de usuário |
| `password` | `string` | senha do usuário |

---
#### Realiza o login
```http
  POST /login
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | nome de usuário |
| `password` | `string` | senha do usuário |

Retorna um token JWT

---
#### Realiza uma transação
```http
  POST /transaction
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `token` | `string` | token JWT |
| `username` | `string` | nome do usuário realizando a transação |
| `targetUser` | `string` | nome do usuário alvo da transação |
| `tempValue` | `string` | valor da transação |


---
#### valida o usuário
```http
  GET /IsAuth
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token` | `string` | token JWT |
| `username` | `string` | nome do usuário |
| `userId` | `integer` | ID do usuário |

---
#### destrói o token do usuário
```http
  GET /logout
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token` | `string` | token JWT |
| `username` | `string` | nome do usuário |
| `userId` | `integer` | ID do usuário |

---
#### Saldo do usuário
```http
  GET /balance
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token` | `string` | token JWT |
| `username` | `string` | nome do usuário |

retorna saldo do usuário

---
#### Histórico bancário do usuário
```http
  GET /getTransactions
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `token` | `string` | token JWT |
| `username` | `string` | nome do usuário |

retorna histórico bancário do usuário

---

## Rodando localmente

Vá para o diretório do projeto e rode: 
```bash
  docker-compose up
```



