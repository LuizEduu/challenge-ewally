# Challenge ewally

## tecnologias utilizadas
Para o projeto foi utilizado as seguintes tecnologias:
* Nodejs v16.x
* Typescript v4.6.x
* Express v4.x
* Docker v20.x.x
* Jest v27.x.x


## Como executar

### Com docker
Caso tenha o docker instalado e queira utilizar é necessário apenas acessar a página do projeto e executar o seguinte comando no terminal:
* **docker-compose up -d** o docker vai fazer o build do container e iniciar a aplicação

caso queira acompanhar os logs da aplicação é necessário apenas executar o seguinte comando no terminal:
* **docker container logs -f challenge-ewally**

### Com o node instalado na máquina
Caso queira executar com o node na máquina é necessário ter o node v16.x ou posterior instalado, e apenas acessar a pasta do projeto no terminal e executar os seguintes comandos:

* **npm run install** ou **npm run i** para instalar as dependências
* **npm run dev** para executar o projeto


## Rotas da aplicação
com o projeto em execução para realizar uma request para a rota cadastrada é caso tenha algum software cadastrado:
* Postman ->  [Postman](https://www.postman.com).
* Insomnia -> [Insomnia](https://insomnia.rest/download).

Após isso é necessário realizar uma requisição get para o endereço
* [http://localhost:3333/boleto/{ticketNumber}](http://localhost:3333/boleto/{ticketNumber}).
* A rota aceita o seguinte path param:
* **ticket number** - numero do boleto


ou utilizando o próprio swagger configurado no projeto. para utilizar o swagger é necessário apenar acessar em qualquer navegador o endereço:

* [swagger](http://localhost:3333/api-docs)

Após acessar a interface do swagger é necessário apenar abrir a rota users cadastrada, clicar no botão try out informar o código do boleto e clicar no botão execute.

![Swagger da aplicação.](./images/swagger.png "Swagger")

## Testes da API
Caso deseje executar os testes é necessário apenas acessar a raiz do projeto por qualquer terminal e executar o seguinte comando:
* **npm run test** - sem exibir a cobertura dos testes
* **npm run test:coverage** -- com cobertura dos testes
