const replaceTemplete=(temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.Image);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%PRICE%}/g, product.Price);
    output = output.replace(/{%PACKEGING%}/g, product.Packaging);
    output = output.replace(/{%SALE%}/g, product.Sale);
    output = output.replace(/{%CATE%}/g, product.cate);
    output = output.replace(/{%ID%}/g, product.id);
     return output;
  }


  const http=require('http');
const url=require('url');
const fs=require('fs');

const homepage=fs.readFileSync(`${__dirname}/Untitled-1.html`,'utf-8');
const cardDeck=fs.readFileSync(`${__dirname}/data/card-data.html`,'utf-8');
const data=fs.readFileSync(`${__dirname}/data/data.json`,'utf-8');
const productCard=fs.readFileSync(`${__dirname}/data/product.html`,'utf-8');
const dataObj=JSON.parse(data);

const server=http.createServer((req,res)=>{
    const {query,pathname }=url.parse(req.url,true);
  if (pathname=="/home" || pathname=='/'){
    res.writeHead(200,{'Content-type':'text/html'});
    const cardsHtml=dataObj.map(el => replaceTemplete(cardDeck,el)).join('');
    const output=homepage.replace('{%CARD_CONTENT%}',cardsHtml);
    res.end(output);
  }else if (pathname=="/product"){
    const product=dataObj[query.id];
    const output=replaceTemplete(productCard,product);
    res.end(output);
  }

})

server.listen(8000,'127.0.0.1',()=>{
    console.log("Server is listining");
});