$(document).ready(function(){
  $('#add-task').on("click", function(){
    $('.todo-list-div ul').append(
      "<li>"+$("#add-input").val()+" <a><i class='fa fa-check'></i></a></li>"
    )
  })
})
