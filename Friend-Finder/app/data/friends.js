var Mockaroo = require('mockaroo');
var Friends=[];
var client = new Mockaroo.Client({
    apiKey: 'bfdd9cd0' // see http://mockaroo.com/api/docs to get your api key
})

module.exports = client.generate({
    count: 10,
    schema: 'Friends'
    
});
// var Friends = [
// {"name":"Mercie","photo":"http://dummyimage.com/177x118.png/ff4444/ffffff","scores":[3,2,2,3,3,4,3,4,4,4]},
// {"name":"Lorilyn","photo":"http://dummyimage.com/196x148.png/cc0000/ffffff","scores":[5,2,4,5,5,2,4,5,2,4]},
// {"name":"Dieter","photo":"http://dummyimage.com/132x108.jpg/dddddd/000000","scores":[2,5,5,3,1,2,5,2,4,4]},
// {"name":"Hildagard","photo":"http://dummyimage.com/133x233.png/5fa2dd/ffffff","scores":[5,3,3,3,1,1,2,1,2,1]},
// {"name":"Gayel","photo":"http://dummyimage.com/222x181.jpg/dddddd/000000","scores":[4,5,3,2,3,1,4,5,2,4]},
// {"name":"Shelley","photo":"http://dummyimage.com/192x187.jpg/dddddd/000000","scores":[2,1,2,5,5,2,3,5,3,4]},
// {"name":"Donelle","photo":"http://dummyimage.com/111x142.bmp/cc0000/ffffff","scores":[4,2,2,4,4,3,4,5,1,3]},
// {"name":"Kaspar","photo":"http://dummyimage.com/118x203.bmp/dddddd/000000","scores":[5,5,2,5,1,3,5,2,2,3]},
// {"name":"Victor","photo":"http://dummyimage.com/238x245.bmp/5fa2dd/ffffff","scores":[4,1,4,3,1,5,4,3,4,5]},
// {"name":"Jeremias","photo":"http://dummyimage.com/138x215.jpg/dddddd/000000","scores":[1,1,5,3,1,5,3,1,4,3]}]
// console.log(Friends);
 //module.exports = Friends;
  