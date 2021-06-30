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


function noDataAdd(){
    var input=document.getElementById("titulli").value;
    var input1=document.getElementById("subject").value;


    if (input.trim() == '' || input1.trim() == '' ) {
        alert("Please fill the required fields!");
    }else{
        window.open('doctor.html');
    }
}


function noDataEdit(){
    var input2=document.getElementById("degree").value;
    var input3=document.getElementById("special").value;


    if (input2.trim() == '' || input3.trim() == '' ) {
        alert("Please fill the required fields!");
    }else{
    window.open('doctor.html');
}
}

function noDataEditt(){
    var input4=document.getElementById("date").value;
    var input5=document.getElementById("name").value;
    var input6=document.getElementById("age").value;
    var input7=document.getElementById("adress").value;
    var input8=document.getElementById("tel").value;
    var input9=document.getElementById("blood").value;
    var inpu510=document.getElementById("height").value;
    var input11=document.getElementById("weight").value;


    if (input4.trim() == '' || input5.trim() == ''|| input6.trim() == '' || input7.trim() == ''|| input8.trim() == ''|| 
     input9.trim() == ''|| input10.trim() == '' || input11.trim() == '' ) {
        alert("Please fill the required fields!");
    }else{
    window.open('doctor.html');
}
}


$("#veqFshij").click(function(event){
    $("#krejtTerminet").empty();
    $("#krejtTerminet2").empty();
});


$("#terminetMjeku").click(function(event){
    //$("#hapsiraListes").empty();
    $("#krejtTerminet").empty();
   
    $("#krejtTerminet2").empty();
    $("#krejtTerminetCan").empty();
     var personalNumber = localStorage.getItem("persoanlDoc");
     $.ajax({
         type: "GET",
         url: "http://localhost:8030/api/appointmentManagement/getAppByDoc/"+personalNumber,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function(result) {
          //  $("#krejtTerminet").append("Total Appointments:");
             var y = result.data;
             if (y != null) {
               $("#krejtTerminet").append("Free Appointments:");
               $("#krejtTerminet2").append("All Appointments:");
               $("#krejtTerminetCan").append("Canceled Appointments:");
                 $.each(y, function(i, item) {
                    
                   //  var date = new Date(item.dateAndTime);
                     //var dita = date.getDay();
                     //var muji = date.getMonth();
                     //var viti = date.getFullYear();
                     if(item.freeAppoint == true && item.canceledByDoc == false){
                     var myDate = item.dateAndTime;
                     var sdi = myDate.split("T");
                     
                    // myDate.format("mm/dd/yy");
                    $("#krejtTerminet").append('</br><button>'+sdi[0]+'  at: '+item.time+'</button></br>');
                    //localStorage.setItem('idPacienetit' , item.personalNumber);
                     }else if(item.freeAppoint == false && item.canceledByPat == true){
                        var myDate = item.dateAndTime;
                     var sdi = myDate.split("T");
                    $("#krejtTerminetCan").append('</br><button>'+sdi[0]+'  at: '+item.time+' - canceled by patient!</button></br>');
                     }
                     else{
                        var myDate = item.dateAndTime;
                        var sdi = myDate.split("T");
                        $("#krejtTerminet2").append('</br><button>'+sdi[0]+'  at: '+item.time+'</button></br>');
                     }
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

 $("#terminetSot").click(function(event){
    //$("#hapsiraListes").empty();
    $("#krejtTerminet").empty();
    $("#krejtTerminet2").empty();
    $("#krejtTerminetCan").empty();
    
    
    $("#listaTermineveSot").empty();
     var docId = localStorage.getItem("persoanlDoc");
     $.ajax({
         type: "GET",
         url: "http://localhost:8030/api/appointmentManagement/getTodaysAppDoc/"+docId,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function(result) {
           // $("#krejtTerminet").append("Total Appointments:");
             var y = result.data;
             if (y != null) {

                 $.each(y, function(i, item) {
                    
                   //  var date = new Date(item.dateAndTime);
                     //var dita = date.getDay();
                     //var muji = date.getMonth();
                     //var viti = date.getFullYear();
                     var myDate = item.dateAndTime;
                     var sdi = myDate.split("T");
                   if(item.freeAppoint == false && item.canceledByPat == false && item.canceledByDoc == false){
                     $("#listaTermineveSot").append('<li>'+sdi[0]+'  at: '+item.time+'</li>');
                    // myDate.format("mm/dd/yy");
                   }else if(item.canceledByPat == true){
                    $("#listaTermineveSot").append('<li>'+sdi[0]+'  at: '+item.time+'- Canceled</li>');
                   }
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

 function notification2(){
    var docId = localStorage.getItem("persoanlDoc");
    $.ajax({
        type: "GET",
        url: "http://localhost:8030/api/appointmentManagement/getTodaysAppDoc/"+docId,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
          // $("#krejtTerminet").append("Total Appointments:");
            var y = result.data;
            if (y != null) {
                $.each(y, function(i, item) {
                    if(item.freeAppoint == false && item.canceledByDoc == false){
                document.getElementById("terminetSot").style.background="#FF0000";
                    }
                
            });
            } else {
                
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    })   
 }

$(document).on('click', '#oraTerminit', function(event){
     var oraTerm = $(this).text();
     localStorage.setItem("oraPerTermin" , oraTerm);
    document.getElementById("inputPerOre2").innerHTML = oraTerm;
    // localStorage.setItem("oraPerTermin" , oraTerm);
    // alert(localStorage.getItem("oraT"));
    // alert(localStorage.getItem("oraT"));
    
 });


 //Butoni per me shtu termine te lira ende i pa perfunduar
/*$(document).on('click', '#oraTerminit', function(event){
     var oraTerm = $(this).text();
     localStorage.setItem("oraT" , oraTerm);
 });*/


 function validate4() {
     var int = document.getElementById("datepicker").value;
    // alert(int);
     var int2 = document.getElementById("inputPerOre2").textContent;
    
   //  alert(int +' prov '+int2);
    // var prov =localStorage.getItem("persoanlDoc");
     $("#krejtTerminet").append("<button id ='nrPer'>"+localStorage.getItem("persoanlDoc")+"</button>");
     $("#krejtTerminet").append("<button id ='nrPer2'>"+localStorage.getItem("oraPerTermin")+"</button>");

   // alert("diqka");
    addfreeApp = {
        data: $("#datepicker").val(),
      //  doctorPersonalNumber: localStorage.getItem("persoanlDoc")
    }

    if(int.trim() == ""  || int2.trim() == ""){
        alert("Please chose date and time");
        return false;
    }
    return true;
}
addfreeApp = {
    data: 0,
  //doctorPersonalNumber:0
}

 $("#shtoTermin").click(function(event){
    $("#krejtTerminet").empty();
    $("#krejtTerminet2").empty();
    $("#krejtTerminetCan").empty();
    //$("#hapsiraListes").empty();
    if(validate4()){
    $("#krejtTerminet").empty();
    $("#krejtTerminet2").empty();
    
     var doctorPersonalNumber = localStorage.getItem("persoanlDoc");
     var oraTerminit = localStorage.getItem("oraPerTermin");
     $.ajax({
         type: "post",
         url: "http://localhost:8030/api/appointmentManagement/addNewAppointmentDoc/"+oraTerminit+"/"+doctorPersonalNumber,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         data: JSON.stringify(addfreeApp),
         success: function(result) {
//         alert("erdh kerksa");
//           window.location.reload();
             var y = result.data;
             if (y != null) {
               //  $.each(y, function(i, item) {
                 //   $("#krejtTerminet").append('<p>'+item.dateAndTime+'</p>');
                    //localStorage.setItem('idPacienetit' , item.personalNumber);
                    alert("Appointment added");
                    
                    
                 // });
             } else {
               //  $("#krejtTerminet").append(result.errori);
               $("#krejtTerminet").append(result.errori);
             }
         },
         error: function(e) {
             console.log("ERROR: ", e);
         }
     })
    }
 });
 

 $("#fshijTerminin").click(function(event){
    $("#krejtTerminet").empty();
    $("#krejtTerminet2").empty();
    $("#krejtTerminetCan").empty();
    //$("#hapsiraListes").empty();
    if(validate4()){
    $("#krejtTerminet").empty();
    $("#krejtTerminet2").empty();
    
     var doctorPersonalNumber = localStorage.getItem("persoanlDoc");
     var oraTerminit = localStorage.getItem("oraPerTermin");
     $.ajax({
         type: "post",
         url: "http://localhost:8030/api/appointmentManagement/cancelAppointment/"+oraTerminit+"/"+doctorPersonalNumber,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         data: JSON.stringify(addfreeApp),
         success: function(result) {
//         alert("erdh kerksa");
//           window.location.reload();
             var y = result.data;
             if (y != null) {
               //  $.each(y, function(i, item) {
                 //   $("#krejtTerminet").append('<p>'+item.dateAndTime+'</p>');
                    //localStorage.setItem('idPacienetit' , item.personalNumber);
                    alert("Appointment Canceled");
                    
                    
                 // });
             } else {
               //  $("#krejtTerminet").append(result.errori);
               $("#krejtTerminet").append(result.errori);
             }
         },
         error: function(e) {
             console.log("ERROR: ", e);
         }
     })
    }
 });

 //shto keshill

 $("#add").click(function(event){
  
    //$("#hapsiraListes").empty();
    if(validate5()){
    var title = document.getElementById("titulli").value;
    var content = document.getElementById("subject").value;
    var nrPersonal = localStorage.getItem("persoanlDoc");
   //  var oraTerminit = localStorage.getItem("oraPerTermin");
     $.ajax({
         type: "post",
         url: "http://localhost:8010/api/doctorLogicManagement/addAdvice/"+title+"/"+content+"/"+nrPersonal,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         data: JSON.stringify(addfreeApp),
         success: function(result) {
//         alert("erdh kerksa");
//           window.location.reload();
             var y = result.errori;
             if (y == null) {
               //  $.each(y, function(i, item) {
                 //   $("#krejtTerminet").append('<p>'+item.dateAndTime+'</p>');
                    //localStorage.setItem('idPacienetit' , item.personalNumber);
                    alert("Advice Added");
                    
                    
                 // });
             } else {
               //  $("#krejtTerminet").append(result.errori);
               alert(result.errori);
             }
         },
         error: function(e) {
             console.log("ERROR: ", e);
         }
     })
    }
 });

 
 function validate5() {
    var int = document.getElementById("titulli").value; 
    var int2 = document.getElementById("subject").value;
   if(int.trim() == null || int2.trim() == null){
       return false;
   }
   return true;

}
function validate6() {
    var int = document.getElementById("titulli").value; 
 
   if(int.trim() == null){
       return false;
   }
   return true;
}



$("#deleteAdvice").click(function(event){
  
    //$("#hapsiraListes").empty();
    if(validate6()){
    var title = document.getElementById("titulli").value;

    var docId = localStorage.getItem("persoanlDoc");
   //  var oraTerminit = localStorage.getItem("oraPerTermin");
     $.ajax({
         type: "post",
         url: "http://localhost:8010/api/doctorLogicManagement/deleteAdvice/"+title+"/"+docId,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         data: JSON.stringify(addfreeApp),
         success: function(result) {
//         alert("erdh kerksa");
//           window.location.reload();
             var y = result.errori;
             if (y == null) {
               //  $.each(y, function(i, item) {
                 //   $("#krejtTerminet").append('<p>'+item.dateAndTime+'</p>');
                    //localStorage.setItem('idPacienetit' , item.personalNumber);
                    alert("Advice Deleted!");
                    
                    
                 // });
             } else {
               //  $("#krejtTerminet").append(result.errori);
               alert(result.errori);
             }
         },
         error: function(e) {
             console.log("ERROR: ", e);
         }
     })
    }
 });