$('#btn-connect').click(function(){
  client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
  client.subscribe($("#topic").val());
  console.log('connect button when clicked');
   $("#status").text("Connecting...");
  
  client.on("connect", function(){
     $("#status").text("Successfully connected!!!!");
   
    Swal.fire({
      position: 'center',
      type: 'success!!',
      title: 'your sucessfully connected to the broker!',
      showConfirmButton: false,
      timer: 2000
      })
    console.log("success");
  });

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
        // $("#status").removeClass("alert-warning");
        // $("#status").addClass("alert-secondary");
      }
      })
    
  });

  $("#btn-publish").click(function() {
    var topic = $("#topic").val();
    var payload = $("#message").val();
    if (topic == "" && payload == "") {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Please provide inputs!',
      });
    }
    else { 
      client.publish(topic,payload, function(err) {
          if (err){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'There is an error!',
            });
        } else {
          console.log("published")
          Swal.fire(' topic has been published successfully!')
        }
      });
      
      
    }

  });
  $("#btn-subscribe").click(function() {
    var subscribe = $("#topic-sub").val();
    var topic = $("#topic").val();
    if (subscribe != topic) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Topic is not available!',
      });
    }
    else if (subscribe == topic && topic !== "") {
      client.subscribe(topic, function(err) {
        if(err) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'An error occurs!',
            });
        } else {
          Swal.fire('Subscribed successfully!');
        }
      });
      
    }
      
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