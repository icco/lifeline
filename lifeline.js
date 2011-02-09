$(document).ready(function(){
   var data = $.ajax({ url: "./data.json", async: false }).responseText;
   console.log(data);
});
