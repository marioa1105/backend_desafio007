
import express, { json }  from "express";
import fs from 'fs';
import Products from './Products.js';
import Archivo from './Archivo.js';

let cntItem = 0;
let cntItems = 0;
const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=> {
    let file = new Archivo('visitas.txt');

    console.log(`Escuchando en puerto ${PORT}`);
})

server.on('error',error => console.log(`Error en el servidor ${error}`));

app.get('/',(req,res)=>{
    
});

app.get('/items',(req, res)=>{
    
    let file = new Archivo('productos.txt');
    cntItems++;
    file.read().then(data =>{
        
        data = JSON.parse(data);
        res.json({
            'Items': data,
            'Cantidad': data.length
        });
    });
    
});

app.get('/item-random',(req, res)=>{
    let file = new Archivo('productos.txt');
    let products = [];
    cntItem++;
    file.read().then((data) =>{
        let obj = {};
        products = JSON.parse(data);
        
        if (products.length > 0){
            let id = random(1 , products.length);
            obj = products.find(x => x.id == id);            
        }
        res.json({
            'Item': obj,            
        });
        
    });
});

app.get('/visitas',(req, res)=>{
    res.json({
        visitas: {
            Items: cntItems,
            Item: cntItem
        }
    });

});

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}