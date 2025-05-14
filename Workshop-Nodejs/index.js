const express = require("express")

const app = express()

const port = 3000

// app.use(express.json())

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use((req, res, next) => {
    console.log( new Date().toString(), req.host, req.method);
    next();
})


app.listen(port, () => {
    console.log(`escutando na porta ${port}`)
})

const jsonNames = [{
    name: "Davi Cândido",
    idade: "19 anos",
    curso: "Ciência da Computação"
},
{
    name: "Gustavo Henrique",
    idade: "19 anos",
    curso: "Ciência da Computação"
},
{
    name: "Otavio Henrique",
    idade: "20 anos",
    curso: "Ciência da Computação"
}]



app.get('/', (req, res)=>{

    res.json(jsonNames)
})

app.get('/ola', (req, res)=>{

    const nome = req.query.nome

    res.send(`Olá ${nome}`)
})

app.get("/registro", (req,res) => {
    //Monte um formulario HTML para receber os dados do usuario

    res.send(`
        <form action="/registro" method="POST">
            <input type="text" name="nome">
            <button>Enviar</button>
        </form>
    `)
})

app.post("/registro", (req,res) => {
    //Monte um formulario HTML para receber os dados do usuario

    res.send(`Seja bem vindo ${req.body.nome}`)
})