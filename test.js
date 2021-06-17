
var data = {
  VERSION: "2006-10-27.a",
  JOBNAME: "EXEC_",
  JOBHOST: "Test",
  LSFQUEUE: "45",
  LSFLIMIT: "2006-10-27",
  NEWUSER: "3",
  NEWGROUP: "2",
  NEWMODUS: "640",
};

const result = {}

Object.keys(data).forEach(function (key) {
    result[":" + key] = data[key]
  console.log("Key : " + key + ", Value : " + data[key]);
});
console.log(result)