
$('#btn-connect').click(function(){
  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
  // client.subscribe($("#topic").val());
   $("#status").text("Connecting...");
  
  client.on("connect", function(){
     $("#status").text("Successfully connected!");
     console.log("success");
  });

    client.on("message", function (topic, payload) {
    console.log("Received { topic: " + topic + "; payload: " + payload + " }");
    // var row = $("<tr>");
    // $("<td>").text(topic).appendTo($(row));
    // $("<td>").text(payload).appendTo($(row));
    // $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
    // $("#tbl-body").append($(row));
  });
});
 
$("#btn-disconnect").click(function() {  
  client.end();   
  $("#status").text("Disconnected");
  console.log("Disconnected")
});


  $("#btn-publish").click(function() {
    var topic = $("#topic").val();
    var payload = $("#message").val();
    if (topic == "" && payload == "") {
        console.log("Please Fill up the field")
    }else { 
      client.publish(topic,payload, function(err) {
          if (err){
          console.log("Error")
        } else {
          console.log("Successfully Published")
          console.log("Published { topic: " + topic + "; payload: " + payload + " }");
        }
      });
    }
});

  $("#btn-subscribe").click(function() {
    var subscribe = $("#topic-sub").val();
    var topic = $("#topic").val();
    if (subscribe != topic) {
      console.log("Topic is not available")
    }
    else if (subscribe == topic && topic !== "") {
      client.subscribe(topic, function(err) {
        if(err) {
          console.log("Error")
        } else {
          console.log("Subscribed successfully!")
          console.log("Subscribe { topic: " + subscribe + " }");
        }
      });     
    }
  });

  $("#btn-unsubsribe").click(function() {
            var topic = $("#topic").val();
            client.unsubscribe(topic, function(err) {
                if(err) {
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
    })

  // client.on("message", function (topic, payload) {
  //   // console.log([topic, payload].join(": "));
  //   console.log("Received { topic: " + topic + "; payload: " + payload + " }");
  //   var row = $("<tr>");
  //   $("<td>").text(topic).appendTo($(row));
  //   $("<td>").text(payload).appendTo($(row));
  //   $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
  //   $("#tbl-body").append($(row));
  // })
// });
