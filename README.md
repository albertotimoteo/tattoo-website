Tattoo Website

Este site foi criado para dar informações e ajudar no gerenciamento de reservas de horários da tatuadora Marilinger de BH. 

O site foi feito utilizando React e Javascript. Para realizar a alimentação da tela de lista de flashes e para salvar as informações referentes aos agendamentos, bem como obter opções customizáveis do site, foi utilizada uma integração com planilhas do google, através da lib google-spreadsheet (https://www.npmjs.com/package/google-spreadsheet). Para salvar imagens em uma pasta do google drive foi utilizada a lib google-drive-connect (https://www.npmjs.com/package/google-drive-connect). Para pleno funcionamento da google-drive-connect, também foi utilizada a lib file-to-array-buffer (https://www.npmjs.com/package/file-to-array-buffer)

Para estas integrações funcionarem, existem dois arquivos importantes que devem estar dentro da pasta utils do projeto, o primeiro sendo o google_credentials.json, que você pode obter no console do google. Além desde json, na pasta utils existe o arquivo googleData.example.js. Este arquivo possui informações como e-mail de acesso do google console, chave de acesso e ids das planilhas que o sistema interage. Para utilizar em seu projeto, substitua com as suas informações e retire o .example. do nome do arquivo. Esta implementação pode ser feita utilizando .env (e é mais recomendado que seja feito assim), a escolha foi somente por questões de tempo e praticidade no momento do projeto.

Roteamento: react-router-dom 
Estilização: styled-components
Componentes: material-ui e composição própria

