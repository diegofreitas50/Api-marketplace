### Todo

- [x] Finalizar service e controller da entidade transações (Create(Finalizar transação!),findOne,findAll,update(Estornos!))

### In Progress

- [x] create-transaction (incluir disconnect de produtos e delete dos produtos incluídos)

### Done ✓

- [x] Estrutura do banco de dados
- [x] criar os relacionamentos entre as entidades
- [x] swagger
- [x] Deploy
- [x] incluir função isOwner em todas as rotas ligadas a Bag (área restrita ao usuário)
- [x] incluir função isOwner nos campos update e delete products  (área restrita ao usuário)
- [x] CRUD completo de todas as entidades
- [x] Incluir a função loggedUser nos campos devidos
- [x] Criar a rota de criação de usuário nível "ADM".
- [x] criar a rota que faz a busca apenas de produtos disponíveis.
- [x] Incluir a função isAdmin nos campos devidos
- [x] Readme
- [x] Testar API

### CHANGED
- [x] alterar controller e service da Bag (Create,findOne e update(AddProduct))
- [x] No service do product, função findAll, incluir o nome do usuário
- [x] Na entidade product, será necessário alterar o price para aceitar números flutuantes
- [x] Incluída a entidade transaction para executar diversas transações:Depósito,transferências e pagamentos. (Ainda não testado!)
