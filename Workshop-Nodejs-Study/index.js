const express = require("express")

const app = express()

const port = 3000

// app.use(express.json())

app.use( "/public", express.static("public")) //Acessa a pasta public dentro do projeto e acessa o index.html
app.use(express.urlencoded({ extended: true}))
app.use(express.json())


app.use((req, res, next) => {
    console.log( new Date().toString(), req.host, req.method);
    next();
})

app.use("/", (req, res, next) =>{
    console.log(req.headers);
    // console.log(req.accepted);
    // console.log(req.body);
    // console.log(req.params);
    // console.log(req.baseUrl);
    // console.log(req.method);
    // console.log(req.url);    
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

    res.status(200).json(jsonNames)
})


app.get('/img', (req, res)=>{

    res.setHeader("Content-Type", "image/png")
    res.setHeader("Content-Disposition", "attachment; filename=logo.png")
    res.sendFile(__dirname + "/logo.png").status(200).json(jsonNames)
})


app.post('/post', (req, res)=>{

    //Criar um novo objeto com os dados do jsonNames

    try{
        const newName = {
            name: req.body.name,
            idade: req.body.idade,
            curso: req.body.curso
        }

        jsonNames.push(newName)
        res.status(201).json(jsonNames)

    }catch(err){
        tes.status(500).json({message: "Erro ao criar o novo objeto"})
    }


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


app.use((req, res, next) =>{

    //Enviar um titulo h1 alinhado ao centro da pagina verticalmente e horizontalmente 
    console.log("Rota não encontrada!")
    res.status(404).send(
        `
        <h1 style="text-align: center; justify-content: center; margin-top: 300px">
            404 Not Found: ${req.url} nao encontrado
        </h1>
        `
    )
})