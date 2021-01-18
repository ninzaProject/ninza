
$(function() {

    $("p").on("click", function() {

       $("p").css("color", "blue");

    });
    alert(_.min([3, 5]));
});

var todoModel = Backbone.Model.extend({

  initialize: function(){

    alert("Initialising Todo List");

    this.on("change:name", function(){
      alert("Name Changed so I am firing");
    });
  }

});

$(document).ready(function(){
  var TodoModelObject = new todoModel({name:"Ravi",age: "30", profession: "web developer"});
  alert(TodoModelObject.get("name"));
  // Setting the model
  TodoModelObject.set("name","Shankar");
    alert(TodoModelObject.get("name"));
});
