$('#btn-connect').click(function(){
  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
  client.subscribe($("#topic").val());
  console.log('connect button when clicked');
   $("#status").text("Connecting...");
  
  client.on("connect", function(){
     $("#status").text("Successfully connected!");

  });
  console.log("success");

  $("#btn-disconnect").click(function() {
    Swal.fire({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
      }).then((result) => {
      if (result.value) {
        client.end();
        Swal.fire(
        'Disconnected!',
        'Your are disconnected to the broker.',
        'success'
        );
        $("#status").text("Disconnected");
        client.end();
        }
      })
    client.end();
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
          console.log("published") 
        }
      });
    }
  console.log("Successfully Published")
  console.log("Published { topic: " + topic
  + "; payload: " + payload + " }");
})

  $("#btn-subscribe").click(function() {
    var subscribe = $("#topic-sub").val();
    var topic = $("#topic").val();
    // if (subscribe != topic) {
    //   Swal.fire({
    //     type: 'error',
    //     title: 'Oops...',
    //     text: 'Topic is not available!',
    //   });
    // }
    // else if (subscribe == topic && topic !== "") {
    //   client.subscribe(topic, function(err) {
    //     if(err) {
    //       Swal.fire({
    //         type: 'error',
    //         title: 'Oops...',
    //         text: 'An error occurs!',
    //         });
    //     } else {
    //       Swal.fire('Subscribed successfully!');
    //     }
    //   });
      
    // }
      console.log("Subscribe { topic: " + subscribe + " }");
  })

  client.on("message", function (topic, payload) {
    // console.log([topic, payload].join(": "));
    var row = $("<tr>");
    $("<td>").text(topic).appendTo($(row));
    $("<td>").text(payload).appendTo($(row));
    $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
    $("#tbl-body").append($(row));

  })
});