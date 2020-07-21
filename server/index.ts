const Koa = require('koa'),
  route = require('koa-route'),
  websockify = require('koa-websocket');

const app = websockify(new Koa());

const clients = []

app.ws.use(function(ctx, next) {
  // return `next` to pass the context (ctx) on to the next ws middleware
  // clients.push(connection)
  clients.push(ctx)
  ctx.websocket.on('message', function(message) {
  	clients.forEach(c => c.websocket.send(message))
    // do something with the message from client
    console.log(message)
  });
  return next(ctx);
});

app.use(async ctx => {
  ctx.body = 'Hello World';
});


console.log("running app")
app.listen(3000);