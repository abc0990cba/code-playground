import addon from "napi-physics-modeling-oop";

export default function echo(req, res) {
  
const arr = [];
const condition = [2,2,2,2,2];
const data = addon.getData(condition);
console.log(data);
//arr[0] -- first layer
//arr[1] -- last layer

Object.values(data).forEach(el => arr.push(el));
   res.status(200);
   res.json({data: arr});
}