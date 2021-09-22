# Sobre a aplicação:

- Foi basicamente um desafio realizado por mim há algum tempo atras, resolvi colocar no github considerando que é um projeto bem legalzinho :D.
- É desenvolvida utilizando reactjs+typescript, consome uma fake-api feita com miragejs.

## A aplicação possibilita:

- 1. Criar uma conta.

 - ![registro](https://user-images.githubusercontent.com/66435387/134421134-4082b86a-f812-4ee1-961d-6ce3103206ee.gif)

- 2. Logar.

 - ![login](https://user-images.githubusercontent.com/66435387/134421122-0ab53f17-233f-4c08-a2ea-7a155eaae65a.gif)

- 3. Criar um caderno.

 - ![criando-caderno](https://user-images.githubusercontent.com/66435387/134421020-d69db337-3e22-44fe-8d96-0fb6d3835246.gif)

- 4. Criar notas dentro de um caderno.

 - ![criando-nota](https://user-images.githubusercontent.com/66435387/134421048-3f806bb9-43eb-4f1a-9efb-81dc0d58b59d.gif)

--- As listagens já são possíveis visualizar nos gifs exibidos ---
  - 5. Listar cadernos.
  - 6. Listar notas dentro de um caderno.
  - 7. Listar o conteúdo dentro de uma nota.
--- As listagens já são possíveis visualizar nos gifs exibidos ---

- 8. Editar o conteúdo e título de uma nota.

 - ![editando-nota](https://user-images.githubusercontent.com/66435387/134421094-b573c3db-dec0-4ef0-b29b-c14197f11a2a.gif)

# Vale destacar que o layout me foi disponibilizado, apenas reproduzi o mesmo.

# Outra coisa bacana de destacar é que a fake API com miragejs _não fui eu que desenvolvi_, foi disponibilizada como parte do desafio. Apenas consumi a mesma e criei todo front-end com reactjs.

## API

- post => '/auth/login', user.login'
- post => '/auth/signup', user.signup'

- get => '/journals/entries/:id', journal.getEntries'
- get => '/journals/:id', journal.getJournal'

- post => '/journals/', journal.create' _title : String_
- post => '/journals/entry/:id', journal.addEntry' _{content,title} : Object_

- put => '/journals/entry/:id', journal.updateEntry' _{content,title} : Object_
- put => '/journals/:id', journal.updateJournal' _title : String_
