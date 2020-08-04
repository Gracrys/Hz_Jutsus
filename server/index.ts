const Koa = require('koa'),
  route = require('koa-route'),
  websockify = require('koa-websocket'),
  cors = require('@koa/cors'),
  bP = require('koa-bodyparser');

const app = websockify(new Koa());
app.use(cors())
app.use(bP())

let games = {}
let clients = []
app.use( route.all('/', function(ctx, next){
      console.log(ctx.request.body) 
      next(ctx)
      ctx.body = ctx.request.body
    }
  )
)

app.ws.use(route.all('/:id', function(ctx, next, id) {
  // return `next` to pass the context (ctx) on to the next ws middleware
  // clients.push(connection)
  games[id] = "11"
  clients.push(ctx)
  ctx.websocket.on('message', function(message) {
  	clients.forEach(c => c.websocket.send(message))
    // do something with the message from client
    console.log(message, id, next)
  });
  return next(ctx);
}));

app.use(async ctx => {
  ctx.body = 'Hello World';
});


console.log("running app")
app.listen(3000);
