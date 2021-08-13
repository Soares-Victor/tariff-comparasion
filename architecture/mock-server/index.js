const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares)
 
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if(!req.body.id){
        let id = Math.floor(Math.random() * 999999) + 1
        req.body.id = id;
        req.body._id = id;
    }
    
    next();
    
})
 
server.use(jsonServer.rewriter({
    "/ms-tariff-comparison/product/listall": "/product",
    "/ms-tariff-comparison/product/create": "/product",
    "/ms-tariff-comparison/product/update/id/:_id": "/product/:_id",
    "/ms-tariff-comparison/product/delete/id/:_id": "/product/:_id"
}))

server.use(router)
server.listen(3004, () => {
  console.log('JSON Server is running')
})