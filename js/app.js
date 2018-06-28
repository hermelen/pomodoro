var todoList = document.getElementById('todo-list-ul');
var currentList = document.getElementById('current-task-ul');
var doneList = document.getElementById('done-task-ul');

var sortable = Sortable.create(todoList);

var start = document.getElementById('start');
var stop = document.getElementById('stop');
var pause = document.getElementById('pause');
var displayTimer = document.getElementById('timer-section');

var timerStatus = "disabled";

start.addEventListener('click', function() {
  var firstTodoLi = todoList.childNodes[1];
  if (firstTodoLi) {

    this.classList.remove("start");
    stop.classList.remove("hidden");
    pause.classList.remove("hidden");
    this.classList.add("hidden");
    firstTodoLi = todoList.childNodes[1];
    currentList.appendChild(firstTodoLi);
    var pauseStatus = "started";
    var pomodoroDuration = 1 * 10;
    var pomodoroTimer = new Timer({
      tick: 1,
      ontick: function(ms) {
        displayTimer.innerHTML = msToHMS(ms);
      },
      onstart: function() {
        displayTimer.classList.remove("paused");
        displayTimer.classList.add("started");
      },
      onpause: function() {
        displayTimer.classList.remove("started");
        displayTimer.classList.add("pause");
      },
      onstop: function() {
        displayTimer.innerHTML = "00:00";
        firstCurrentLi = currentList.childNodes[1];
        doneList.appendChild(firstCurrentLi);
        pause.classList.add("hidden");
        stop.classList.add("hidden");
        start.classList.remove("hidden");
      },
    });

    pomodoroTimer.start(pomodoroDuration).on('end', function() {
      displayTimer.innerHTML = "C'est fini!";
      firstCurrentLi = currentList.childNodes[1];
      doneList.appendChild(firstCurrentLi);
      pause.classList.add("hidden");
      stop.classList.add("hidden");
      start.classList.remove("hidden");
    });
    pause.addEventListener('click', function() {
      if (pauseStatus == "started") {
        displayTimer.classList.remove("started");
        displayTimer.classList.add("paused");
        pomodoroTimer.pause();
        pauseStatus = "paused";
        this.innerHTML = "Reprendre";
      } else {
        pomodoroTimer.start();
        pauseStatus = "started";
        this.innerHTML = "Pause";
      }
    })

    stop.addEventListener('click', function() {
      this.classList.add("hidden");
      start.classList.remove("hidden");
      displayTimer.innerHTML = "00:00";
      pomodoroTimer.stop();
      pause.innerHTML = "Pause";
      pause.classList.add("hidden");
    })
  }
})


function msToHMS(ms) {
  var seconds = parseInt(ms / 1000);
  var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
  seconds = seconds % 60;

  seconds < 10 ? displaySeconds = "0" + seconds : displaySeconds = seconds;
  minutes < 10 ? displayMinutes = "0" + minutes : displayMinutes = minutes;
  hours < 10 ? displayHours = "0" + hours : displayHours = hours;
  return (displayMinutes + ":" + displaySeconds);
}



$(document).ready(function() {
  var num = 0;
  $('#add-task').on("click", function() {
    num++;
    if ($("#add-input").val() != "") {
      var listItem = $("<li>"+$("#add-input").val() + ": " + num+"</li>")
      var trash = $("<a class='trash'><i class='fa fa-trash'></i></a></li>")
      trash.on("click", function() {
        console.log($(this).parent());
        $(this).parent().remove();
      })
      listItem.append(trash)
      $('.todo-list-div ul').append(listItem)
    }
  })

})
