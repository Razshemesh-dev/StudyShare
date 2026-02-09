function addGrade() {
  const name = $("#courseName").val().trim();
  const grade = Number($("#courseGrade").val());
  $("#errorBox").text("");

  if (!name || Number.isNaN(grade) || grade < 0 || grade > 100) {
    $("#errorBox").text("בדוק שהשם לא ריק ושהציון בין 0 ל-100.");
    return;
  }

  $("#gradeList").append(
    `<li class="row">
       <span class="cname">${name}</span> - 
       <span class="cgrade">${grade}</span>
       <button class="remove">מחיקה</button>
     </li>`
  );

  $("#courseName").val("");
  $("#courseGrade").val("");
  calcAverage();
}

function calcAverage() {
  const grades = $("#gradeList .cgrade").map(function(){ return Number($(this).text()); }).get();
  if (grades.length === 0) {
    $("#avgDisplay").text("ממוצע: —").removeClass().addClass("score avg normal");
    return;
  }
  const avg = (grades.reduce((a,b)=>a+b,0) / grades.length).toFixed(1);
  $("#avgDisplay").text('ממוצע: ' + avg);

  $("#avgDisplay").removeClass("excellent warning normal");
  if (avg >= 90) $("#avgDisplay").addClass("score avg excellent");
  else if (avg < 60) $("#avgDisplay").addClass("score avg warning");
  else $("#avgDisplay").addClass("score avg normal");
}

$("#addBtn").on("click", addGrade);

$("#gradeList").on("click", ".remove", function(){
  $(this).closest("li").remove();
  calcAverage();
});
