
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const bodyParser=require('body-parser')
const cognito=require('./cognito.js')
global.fetch=require('node-fetch')

app.set('port', port)
app.use(bodyParser.json())
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

app.post('/',function(req,res){
  consola.log("request")
  res.json({
    token:'test_token'
  })
})

app.post('/signUp',(req,res)=>{
  const id=req.body.id;
  const password=req.body.password;

  cognito.signUp(id,password).then(
    (result)=>{
      res.json({
        token:result
      })
    },(err)=>{
      console.log(err)
      res.json({
        token:err
      })
    }
  )
})

app.post('/login',(req,res)=>{
  const id = req.body.id;
  const password=req.body.password;
  
  cognito.logIn(id,password).then(
    (result)=>{
      res.json({
        token:result
      })
  },(err)=>{
    res.json({
      token:err
    })
  })
})

app.post('/verify',(req,res)=>{
  const id=req.body.id;
  const verifyCode=req.body.verifyCode;

  cognito.verify(id,verifyCode).then(
    (result)=>{
      res.json({
        token:result
      })
    },
    (err)=>{
      res.json({
        token:err
      })
    }
  )
})