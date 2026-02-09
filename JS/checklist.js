$("#addTask").click(function () {
    const task = $("#taskInput").val().trim();
    if (task === "") return;

    $("#taskList").append("<li class='task'>" + task + "</li>");
    $("#taskInput").val("");
});

$("#taskList").on("click", ".task", function () {
    $(this).toggleClass("done");
});
