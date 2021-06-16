function nrMjekut(){
    var le = localStorage.getItem("persoanlDoc");
    document.getElementById("nrPersonal").innerHTML = "Doctor ID: "+le;
}

$("#shfaqBisedat").click(function(event){
   //$("#hapsiraListes").empty();
    var docNumber = localStorage.getItem("persoanlDoc");
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/conversationManagement/conversationListDoctor/"+docNumber,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            
            var y = result.data;
            if (y != null) {
                $.each(y, function(i, item) {
                   $("#hapsiraListes").append('<div class="person list-group-item list-group-item-action" data-toggle="list" href="#chat-tabela" style="background-color:white!important ;color: darkslategray;"><div class="user">'
                   +'<img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"></div><p class="name-time"><span class="name">'+item.name+' '+item.surname+'</span><button type="button" class="bvepVallai" id="idPacientit">'+item.personalNumber+'</button></p></div>');
                   //localStorage.setItem('idPacienetit' , item.personalNumber);
                 });
            } else {
                $("#hapsiraListes").append(result.errori);
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    })
});

$(document).on('click', '.bvepVallai', function(event){
    
    $("#bisedaShaqet").empty();
    $("#bisedaShaqet2").empty();
    var docNumber = localStorage.getItem("persoanlDoc");
    var patNumber = $(this).text();
    localStorage.setItem("butoniPerPat" ,$(this).text());
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/conversationManagement/allConversation/"+docNumber+"/"+patNumber,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            
            var y = result.data;
            if (y != null) {
             //var emriPac = document.getElementById("emriPacientit").textContent;
             //var mbriemriPac = document.getElementById("mbiemriP").textContent;
            
                $.each(y, function(i, item) {
                    
                   $("#bisedaShaqet").append('<div class="chat-container"><ul id ="fjalttt"class="chat-box chatContainerScroll">');
                  
                   if(item.role == 1){
                    $("#fjalttt").append('<li class="chat-left"><div class="chat-avatar"><img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin">'
                    +'<div class="chat-name">'+item.patientEntity.name+'</div></div><div class="chat-text" style="size:">'+item.conversationDes+'</div>'
                    +'</li>');
                   } else{
                        $("#fjalttt").append(' <li class="chat-right"><div class="chat-text">'+item.conversationDes+'</div>'
                        +'<div class="chat-avatar"><img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"><div class="chat-name">You:</div></div></li>');        
                }

                   
                 });
                 $("#fjalttt").append('<div class="selected-user" id="bisedaShaqet2"></div><form onsubmit="return false" action="#" class="bg-light form-group mt-3 mb-0" "><div class="input-group ">'
                 +'<input type="text " placeholder="Type a message " id="fjaliabisedess" aria-describedby="button-addon2 " class="form-control rounded-0 border-0 py-4 bg-light ">'
                 +'<div class="input-group-append "><button type="button" class="btn btn-outline-secondary btn-sm" id="butoniDeleteee" style="margin-left: 60%;">Delete Chat</button><button id="button-addon2" type="submit " class="btn btn-link "> <i class="fa fa-paper-plane "></i></button></div></div></form>');
            } else {
                $("#bisedaShaqet").append(result.errori);
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    })
});


$(document).on('click', '#button-addon2', function(event){
  // alert("diqka1");
   
    var doctorPersonalNumber = localStorage.getItem("persoanlDoc");
    var personalNumber = localStorage.getItem("butoniPerPat");
    var roli = 2;
    var fjaliaBisedes = document.getElementById("fjaliabisedess").value;

if(fjaliaBisedes != ""){
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/conversationManagement/addNewConversation/"+personalNumber+"/"+doctorPersonalNumber+"/"+fjaliaBisedes+"/"+roli,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            
            var y = result.data;
            if (y != null) {
             //var emriPac = document.getElementById("emriPacientit").textContent;
             //var mbriemriPac = document.getElementById("mbiemriP").textContent;
            
              
                    
                  
                        $("#bisedaShaqet2").append(' <li class="chat-right"><div class="chat-text">'+fjaliaBisedes+'</div>'
                        +'<div class="chat-avatar"><img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"><div class="chat-name">You:</div></div></li>');        
                

                   
                
                   } else {
                $("#bisedaShaqet").append(result.errori);
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
   
    })
} else {
       alert("Please write a message!");       
}
});

$(document).on('click', '#butoniDeleteee', function(event){
    // alert("diqka1");
    var patNumber = localStorage.getItem("persoanlPat");
    var docNumber = localStorage.getItem("butoniPerPat");
    $.ajax({
        url: "http://localhost:8000/api/conversationManagement/deleteConvPat/"+docNumber+"/"+patNumber,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(res) {
           
            alert("U fshi!");   
            window.location.reload();                   
                }
    ,
        error: function(error) {
            console.log(error);
               
        }
    
    })
});
$("#veqFshij").click(function(event){
    $("#krejtTerminet").empty();
});


$("#terminetMjeku").click(function(event){
    //$("#hapsiraListes").empty();
    $("#krejtTerminet").empty();
     var personalNumber = localStorage.getItem("persoanlDoc");
     $.ajax({
         type: "GET",
         url: "http://localhost:8030/api/appointmentManagement/getAppByDoc/"+personalNumber,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function(result) {
           
             var y = result.data;
             if (y != null) {
                 $.each(y, function(i, item) {
                    $("#krejtTerminet").append('<p>'+item.dateAndTime+'</p>');
                    //localStorage.setItem('idPacienetit' , item.personalNumber);
                  });
             } else {
                 $("#krejtTerminet").append(result.errori);
             }
         },
         error: function(e) {
             console.log("ERROR: ", e);
         }
     })
 });


 //Butoni per me shtu termine te lira ende i pa perfunduar
/* $(document).on('click', '#oraTerminit', function(event){
     var oraTerm = $(this).text();
     localStorage.setItem("oraT" , oraTerm);
 });
function validoDaten(){

}

 $("#shtoTermin").click(function(event){
    //$("#hapsiraListes").empty();
    $("#krejtTerminet").empty();
     var personalNumber = localStorage.getItem("persoanlDoc");
     $.ajax({
         type: "GET",
         url: "http://localhost:8030/api/appointmentManagement/getAppByDoc/"+personalNumber,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function(result) {
           
             var y = result.data;
             if (y != null) {
                 $.each(y, function(i, item) {
                 //   $("#krejtTerminet").append('<p>'+item.dateAndTime+'</p>');
                    //localStorage.setItem('idPacienetit' , item.personalNumber);
                    alert(result.mesaazhi);
                  });
             } else {
               //  $("#krejtTerminet").append(result.errori);
                 alert(result.errori);
             }
         },
         error: function(e) {
             console.log("ERROR: ", e);
         }
     })
 });
*/