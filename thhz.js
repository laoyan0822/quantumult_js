let obj = JSON.parse($response.body);
console.log(obj);
let time = "1924907841";
obj.code = "1";
console.log(obj.code);
obj.viptime = time;
console.log(obj.viptime);
obj.msg.viptime = time;
console.log(obj.msg.viptime);
$done({ body: JSON.stringify(obj) });
