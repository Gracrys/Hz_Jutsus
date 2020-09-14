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

//Websocket

app.ws.use(route.all('/:id', function(ctx, id, next) {
  // return `next` to pass the context (ctx) on to the next ws middleware
  // clients.push(connection)


  ctx.websocket.on('message', function(message) {
    let message1 = JSON.parse( message )
    // if(message1.hasOwnProperty("room"))
      // games[message.room] =  'ctx'

    // else
      // games[message.room].forEach(c => c.websocket.send(message))
    // clients.forEach(c => c[id].websocket.send(message))
    // do something with the message from client
    console.log(games, id, message1["room"])
  });
  return next(ctx);
}));

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.use(async ctx => {
  ctx.body = 'Hello World';
});


console.log("running app")
app.listen(3000);
