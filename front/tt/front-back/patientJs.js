function refresh(){
    window.location.reload();
}
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
                   +item.doctorName+' '+item.doctorSurname+'</h4><p class="card-text">'+item.departmentN+': '+item.doctorSpecialization+'</p><p>Chat: </p><button class="bvepVallai" type="button" data-toggle="modal" data-target="#chatModal" id="butonisBisedes">'+item.personalNumber+'</button><!-- Chat --><div class="modal fade" id="chatModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Chat</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick = "refresh()"><span aria-hidden="true">&times;</span>'
                   +'</button></div><div class="modal-body"><form onsubmit="return false;"><div class="chat-messages"><div id="sendFjalet" class="message-box-holder"></div><div id="sendFjalet2" class="message-box-holder"></div>'
                   +'<div id="fjalet" class="message-box-holder"></div>'
                   +'</div><input type="text" class="form-control" id="recipient-name" placeholder="Type a message..."><div class="modal-footer"><button class="btn btn-primary" id="butoniFshijBiseden">Delete Conversation</button><button id="dergoMesazhin" class="btn btn-primary">Send</button></div></form></div>'
                   +'</div></div></div></div></div></div>');
                 
                 
                   
                   //var vveq = document.getElementsByClassName("btn btn-outline-primary").value;
                   //console.log(vveq);
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

function faqjaEPersonalizuar(){

 var nrP = localStorage.getItem("persoanlPat");

 document.getElementById("nrPersonal").innerHTML = "PatientNumber: "+ nrP;



}

$(document).on('click', '.bvepVallai', function(event) {
//not finished!!!!
$("#fjalet").empty();
$("#sendFjalet").empty();
$("sendFjalet2").empty();
    
    var patNumber = localStorage.getItem("persoanlPat");
    var docNumber = $(this).text();
    localStorage.setItem("butoniPerDoc" ,$(this).text());
    
   
    $.ajax({
        url: "http://localhost:8000/api/conversationManagement/allConversation/"+docNumber+"/"+patNumber,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(res) {
           
                   var e = res.errori;
                  
                   // localStorage.setItem('admin')
                   if(e == null){
                       var y = res.data;
                    $.each(y, function(i, item) {
                        if(item.role == 1){
                            $("#sendFjalet").append('You:<div class="message-box">'+item.conversationDes+'</div>');
                        }else{
                        $("#sendFjalet").append('<div class="message-sender">Doctor:<div class="message-box message-partner" >'+item.conversationDes+'</div></div>');
                        console.log(res.data.conversationDes);
                        }
    
                      });
                      
                   }else{
                    $("#sendFjalet").append(e);
                   }
                }
    ,
        error: function(error) {
            console.log(error);
               
        }
    })
});

/*$(document).on('click', '.bvepVallai', function(event) {
    //not finished!!!!
    $("#fjalet").empty();
    $("#sendFjalet").empty();
        
        var patNumber = localStorage.getItem("persoanlPat");
        var docNumber = $(this).text();
        localStorage.setItem("butoniPerDoc" ,$(this).text());
        
       
        $.ajax({
            url: "http://localhost:8000/api/conversationManagement/allConversation/"+docNumber+"/"+patNumber,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(res) {
               
                       var e = res.errori;
                      
                       // localStorage.setItem('admin')
                       if(e == null){
                           var y = res.data;
                        $.each(y, function(i, item) {
                            if(item.role == 1){
                                $("#sendFjalet").append('You:<div class="message-box">'+item.conversationDes+'</div>');
                            }else{
                            $("#sendFjalet").append('<div class="message-sender">Doctor:<div class="message-box message-partner" >'+item.conversationDes+'</div></div>');
                            console.log(res.data.conversationDes);
                            }
        
                          });
                          
                       }else{
                        $("#sendFjalet").append(e);
                       }
                    }
        ,
            error: function(error) {
                console.log(error);
                   
            }
        })
    });
*/
$("#shfaqBisedat").click(function(event) {
    var patNumber = localStorage.getItem("persoanlPat");
    
    $.ajax({
        url: "http://localhost:8000/api/conversationManagement/conversationListPatient/"+patNumber,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(res) {
                   
                   var e = res.errori;
                   var m
                   // localStorage.setItem('admin')
                   if(e == null){
                       var y = res.data;
                       

                    $.each(y, function(i, item) {
                        $("#convList").append('<li><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg" alt=""><div><h2>'+item.doctorName+' '+item.doctorSurname+'</h2></div></li>');
                        console.log(res.data.conversationDes);
    
                      });
                      
                   }else{
                    $("#convList").append(e);
                   }
                }
    ,
        error: function(error) {
            console.log(error);
               
        }
    })
});

//'<li><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg" alt=""><div><h2>'+Prénom Nom+'</h2></div></li>'


$(document).on('click', '#dergoMesazhin', function(event) {
    
    $("#fjalet").empty();
    
        
        var personalNumber = localStorage.getItem("persoanlPat");
        var doctorPersonalNumber = localStorage.getItem("butoniPerDoc");
        var roli = 1;
        var fjaliaBisedes =document.getElementById("recipient-name").value;

        
       if(fjaliaBisedes ==""){
        
            alert("Please write a message!");
        }else{
        $.ajax({
            url: "http://localhost:8000/api/conversationManagement/addNewConversation/"+personalNumber+"/"+doctorPersonalNumber+"/"+fjaliaBisedes+"/"+roli,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(res) {
                   
                            
                              $("#sendFjalet2").append('You:<div class="message-box">'+fjaliaBisedes+'</div>');
                                console.log(res.mesazhin);
                            
        
                         
                          
                      
                    }
        ,
            error: function(error) {
                console.log(error);
                   
            }
        
        })
    }
    });


    $(document).on('click', '#butoniFshijBiseden', function(event) {
        
 
        var patNumber = localStorage.getItem("persoanlPat");
        var docNumber = localStorage.getItem("butoniPerDoc");
    
        $.ajax({
            
            url: "http://localhost:8000/api/conversationManagement/deleteConvPat/"+docNumber+"/"+patNumber,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(res) {
                $("#fjalet").empty();
                $("#sendFjalet").empty();
                $("#sendFjalet2").empty();
                $("#sendFjalet").append("There is no conversation!");      
                                
                    }
        ,
            error: function(error) {
                console.log(error);
                   
            }
        
        })
    
    });