$(document).ready(function () {
  var SubscribedTopics = [];
  $('#btn-connect').click(function () {
    client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
    // client.subscribe($("#topic").val());
    $("#status").text("Connecting...");

    client.on("connect", function () {
      $("#status").text("Successfully connected!");
      console.log("success");
    });

    client.on("message", function (topic, payload) {
      console.log("Received { topic: " + topic + "; payload: " + payload + " }");
      var row = $("<tr>");
      $("<td>").text(topic).appendTo($(row));
      $("<td>").text(payload).appendTo($(row));
      $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
      $("#tbl-body-received").append($(row));
    });
  });

  $("#btn-disconnect").click(function () {
    client.end();
    $("#status").text("Disconnected");
    console.log("Disconnected")
  });


  $("#btn-publish").click(function () {
    var topic = $("#topic").val();
    var payload = $("#message").val();
    if (topic == "" && payload == "") {
      alert("Please Fill up the field")
      console.log("Please Fill up the field")
    } else {
      client.publish(topic, payload, function (err) {
        if (err) {
          console.log("Error")
        } else {
          alert("Are you sure you want to publish this topic?")
          console.log("Successfully Published")
          console.log("Published { topic: " + topic + "; payload: " + payload + " }");
        }
        var row = $("<tr>");
        $("<td>").text(topic).appendTo($(row));
        $("<td>").text(payload).appendTo($(row));
        $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
        $("#tbl-body-publish").append($(row));
      });
    }
  });

  $("#btn-subscribe").click(function () {
    var topic = $("#topic-sub").val();
    if (topic == "") {
        alert("Error")
        console.log("Error")
    } else {

        if (!SubscribedTopics.includes(topic)) {
            client.subscribe(topic)
            SubscribedTopics.push(topic)
            var row = $("<tr>").attr("id", "mysub");
            $("<td>").text(topic).appendTo($(row));
            $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
            $("#tbl-body-subscribe").append($(row));
            alert("Are you sure you want to subscribe this topic?")
        } else {
            alert("Already subscribe!")
            console.log("Already subscribe!")
            }
        }
  });


  $("#btn-unsubsribe").click(function () {
    var topic = $("#topic").val();
    client.unsubscribe(topic, function (err) {
      if (err) {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'An error occurs!',
        });
      } else {
        swal.fire({
          title: 'Confirm',
          text: 'Are you sure you want to unsubscribe?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'green'
        });
      }
    });
  });
});

