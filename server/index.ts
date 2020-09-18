const Koa = require('koa'),
  route = require('koa-route'),
  websockify = require('koa-websocket'),
  cors = require('@koa/cors'),
  bP = require('koa-bodyparser'),
  IO = require('koa-socket-2');
  

  const app = new Koa()
// const app = websockify(new Koa());
app.use(cors())
app.use(bP())

const io = new IO();
io.attach(app);

let games = []
let clients = []

app.use( route.all('/', function(ctx, next){
      console.log(ctx.request.body) 
      next(ctx)
      
      ctx.body = ctx.request.body
    }
  )
)


io.on('log', (ctx, data) => {
  if(games.length <= 2){

    games.push(data)
    ctx.socket.join(data.room);
    // io.emit('res',{mes:"you are added"})
    app.io.broadcast( 'game', data);
    console.log('client sent data to message endpoint', data);
    ctx.socket.in(data.room).emit('game', { chicken: 'tasty' });
  }else
    app.io.broadcast( 'game', {error: "full room"});
});

//Websocket
/*
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
*/


app.use(async ctx => {
  ctx.body = 'Hello World';
});


console.log("running app")
app.listen(3000);
