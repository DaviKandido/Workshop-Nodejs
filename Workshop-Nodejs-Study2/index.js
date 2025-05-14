const express = require("express")

const app = express()

const port = 3000

app.listen(port, () => {
    console.log(`escutando na porta ${port}`)
})


app.use(express.static("public")) //Acessa a pasta public dentro do projeto e acessa o index.html

const routerApi = express.Router();
app.use("/api", routerApi)

routerApi.use(express.urlencoded({ extended: true}))
routerApi.use(express.json())


routerApi.use((req, res, next) => {
    console.log( new Date().toString(), req.host, req.method);
    console.log(req.headers);
    next();
})

const produtos = [
    {id: 1, name: "Notebook", price: 1000},
    {id: 2, name: "Smartphone", price: 1000},
    {id: 3, name: "Tablet", price: 1000},
]


//Get
routerApi.get("/produtos", (req, res) => {

    res.status(200).json(produtos)
})


//Post
routerApi.post("/produtos", (req, res) => {

    try{
        const newProduto = {
            id: produtos.length + 1,
            name: req.body.name,
            price: req.body.price,
        }

        produtos.push(newProduto)
        res.status(201).json(produtos)
    }catch(err){
        tes.status(500).json({message: "Erro ao criar o novo Produto"})
    }
})

routerApi.put("/produtos/:id", (req, res) => {
    
    try{
        const prod = produtos.find(prod => prod.id === req.params.id)

        produtos[prod.id] = {
            id: prod.id,
            name: req.body.name,
            price: req.body.price,
        }

        res.status(200).json(produtos)
    }catch(err){
        tes.status(500).json({message: "Erro ao criar o novo Produto"})
    }

})

routerApi.delete("/produtos/:id", (req, res) => {
    
    try{
        produtos.pop({
            id: req.body.name,
            name: req.body.name,
            price: req.body.price,
        })

        res.status(200).json(produtos)
    }catch(err){
        tes.status(500).json({message: "Erro ao criar o novo Produto"})
    }

})



routerApi.use((req, res, next) =>{

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