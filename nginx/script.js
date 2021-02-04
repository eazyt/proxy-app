$(document).ready(function () {
  $.getJSON("/api/", function (res) {
    $("#web").text(
      res['message']
    );
  });
});