# Xô Papada — Área de Membros

Plataforma do protocolo de 15 dias (site estático: HTML, CSS e JS).

## Onde editar o conteúdo
Todo o conteúdo fica em **`js/data.js`**: dados da expert, exercícios, links dos vídeos, os 15 dias, hábitos e bônus.

Para liberar os 15 dias de uma vez, troque `LIBERAR_TODOS_OS_DIAS` para `true` no início de `js/app.js`.

## Publicação
Conectado à Vercel: cada envio para a branch `main` atualiza o site automaticamente.
Ao mudar arquivos, aumente o número de `CACHE` em `sw.js` (ex.: `xopapada-v2`) para quem instalou o app receber a versão nova.
