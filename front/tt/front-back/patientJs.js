function getDocCards() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/systemManagement/admin/getAllDoctors",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var y = result.data;
          
            if (y != null) {
                $.each(y, function(i, item) {
                   
                   $("#hapsiraKryesore").append('<div class="col-md-3" style="float:left"><div class="card mb-2"><img class="card-img-top profile" src="assets/img/femdoc.jpg" alt="Card image cap"><div class="card-body"><h4 class="card-title">' 
                   +item.doctorName+' '+item.doctorSurname+'</h4><p class="card-text">'+item.departmentN+': '+item.doctorSpecialization+'</p><button id="butonisBisedes" class="btn btn-outline-primary " onclick="butoniVlera()" type="submit" data-toggle="modal" data-target="#chatModal">Chat</button><!-- Chat --><div class="modal fade" id="chatModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Chat</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>'
                   +'</button></div><div class="modal-body"><form onsubmit="return false;"><div class="chat-messages"><div class="message-box-holder"><div class="message-box">Hello</div></div>'
                   +'<div class="message-box-holder"><div class="message-sender"> Mamun Khandaker</div><div class="message-box message-partner">Hi.</div></div>'
                   +'</div><input type="text" class="form-control" id="recipient-name" placeholder="Type a message..."><div class="modal-footer"><button class="btn btn-primary">Delete Conversation</button><button class="btn btn-primary">Send</button></div></form></div>'
                   +'</div></div></div></div></div></div>');

                   document.getElementsByClassName("btn btn-outline-primary").val = item.personalNumber;
                   var vveq = document.getElementsByClassName("btn btn-outline-primary").value;
                   console.log(vveq);
                   
                  
                

                  


                });
            } else {
              alert(result.errori)
            }
        },
        error: function(e) {

           
            console.log("ERROR: ", e);
        }
    })
}

function butoniVlera() {
    var val2 =document.getElementsByClassName("btn btn-outline-primary").val;
    alert(val2);
    console.log(val2);

}







/*'<div class="col-md-3" style="float:left"><div class="card mb-2"><img class="card-img-top profile" src="assets/img/femdoc.jpg" alt="Card image cap"><div class="card-body"><h4 class="card-title">' 
+Dr+'</h4><p class="card-text">'+Some+'</p><button class="btn btn-outline-primary " type="button" data-toggle="modal" data-target="#chatModal">'++'</button><!-- Chat --><div class="modal fade" id="chatModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Chat</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>'
+'</button></div><div class="modal-body"><form onsubmit="return false;"><div class="chat-messages"><div class="message-box-holder"><div class="message-box">Hello</div></div>'
+'<div class="message-box-holder"><div class="message-sender"> Mamun Khandaker</div><div class="message-box message-partner">Hi.</div></div>'
+'</div><input type="text" class="form-control" id="recipient-name" placeholder="Type a message..."><div class="modal-footer"><button class="btn btn-primary">Delete Conversation</button><button class="btn btn-primary">Send</button></div></form></div>'
+'</div></div></div></div></div></div>'*/