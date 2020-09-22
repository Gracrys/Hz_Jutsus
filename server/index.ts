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

type Games = {
  [key: string] : any[]
}

let games:Games = {}
let gamesArr = []

app.use( route.all('/', function(ctx, next){
      console.log(ctx.request.body) 
      next(ctx)
      
      ctx.body = ctx.request.body
    }
  )
)


io.on('log', (ctx, data) => {

  if (games[data.room]) {
      games[data.room].push(data.name)
  }else{
      games[data.room] = [data.name]
  }
    console.log(games)
  if(games[data.room].length <= 2){
    ctx.socket.join(data.room);
    app.io.broadcast( 'game', data);
    console.log('client sent data to message endpoint', data);
    // ctx.socket.in(data.room).emit('game', { chicken: 'tasty' });
  } else
    app.io.broadcast( 'game', {error: "full room"});
});


io.on('game', (ctx, data) => {
  ctx.socket.to(data.room).emit('game', { message: data?.jutsu });
})

app.use(async ctx => {
  ctx.body = 'Hello World';
});


console.log("running app")
app.listen(3000);
