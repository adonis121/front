function nrMjekut(){
    var le = localStorage.getItem("persoanlDoc");
    document.getElementById("nrPersonal").innerHTML = "Doctor ID: "+le;
}

$("#shfaqBisedat").click(function(event){
   $("#hapsiraListes").empty();
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
  
  $("#hapsiraListes").empty();
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

 $("#edit").click(function(event) {

    var docId = localStorage.getItem("persoanlDoc");
    var specialization = document.getElementById("special").value;
  
    if (specialization != "") {

        $.ajax({
            url: "http://localhost:8090/api/systemManagement/doctor/editP/"+docId+"/"+specialization,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function(res) {
               alert("Profile edited successfully!");
            },
            error: function(e) {

                $("#resultdiv").html("<strong>Error</strong>");
                console.log("ERROR: ", e);
            }
        })

    }else {
        alert("Please fill all the forms!");
    }
});

function dropBoxPacientit() {    
var docID = localStorage.getItem("persoanlDoc");
    $.ajax({
        url: "http://localhost:8030/api/appointmentManagement/listOfPats/"+docID,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(res) {

            var e = res.errori;
            var m
                // localStorage.setItem('admin')
            if (e == null) {
                var y = res.data;
                $.each(y, function(i, item) {
                          if(item != null){
                    //if(item.depId == depNumber){
                    //  alert("erdh kerksa");
                    $("#doctorss").append('<option id="opsioni" >' + item.name + " " + item.surname + ' <button>' + item.personalNumber + '</button></option>');
                    document.getElementById("opsioni").value = item.personalNumber;
                          }

                    //}
                });

            } else {
                $("#doctorss").append("No doctors to choose");
            }
        },
        error: function(error) {
            console.log(error);

        }
    })
}
$(document).on('click', '#opsioni', function(event) {
    var vlera = $(this).text();
    var vleraDuhur = vlera.split(" ");
    document.getElementById("inputPerOre4").innerHTML = vlera;
    localStorage.setItem("idPacientitDropbox", vleraDuhur[2]);
    //localStorage.setItem("emriMjekut", vleraDuhur[0] + "" + vleraDuhur[1])    
  

});
$(document).on('click', '#opsioni', function(event) {
    $("#profiliPacieentit").empty();
    var nrPersonal = localStorage.getItem("idPacientitDropbox");
   $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/PatientByPersonal/" + nrPersonal,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
         
            if (result != null) {

                $("#profiliPacieentit").append('<label for="fname "><i class="fa fa-user "></i>Patient Name: </label><p type="text "  style="border:2px; border-style:solid; border-color:black; width:130% ">'+result.name+'</p>'+
                '<label for="fname "><i class="fa fa-user "></i>Patient Surname: </label><p type="text "  style="border:2px; border-style:solid; border-color:black; width:130% ">'+result.surname+'</p>'+
                '<label for="fname "><i class="fa fa-user "></i>Patient Personal Number: </label><p type="text "  style="border:2px; border-style:solid; border-color:black; width:130% ">'+result.personalNumber+'</p>'+
                '<label for="fname "><i class="fa fa-user "></i>Blood Type: </label><p type="text "  style="border:2px; border-style:solid; border-color:black; width:130% ">'+result.bloodG+'</p>'+
                '<label for="fname "><i class="fa fa-user "></i>Height: </label><p type="text "  style="border:2px; border-style:solid; border-color:black; width:130% ">'+result.height+'m</p>'+
                '<label for="fname "><i class="fa fa-user "></i>Weight: </label><p type="text "  style="border:2px; border-style:solid; border-color:black; width:130% ">'+result.weight+'kg</p>');


            } else {
                $("#profiliPacieentit").append('<p>No data for this patient!</p>');
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    })

});
$(document).on('click', '#opsioni', function(event) {
   
    var patId = localStorage.getItem("idPacientitDropbox");
   $("#diagnozatt").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:8010/api/doctorLogicManagement/getDiagnosisByPat/" + patId,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            // $("#krejtTerminet").append("Total Appointments:");
            var y = result.data;
            if (y != null) {
              
               
                 
               $.each(y, function(i, item) {
                   
                $("#diagnozatt").append("<hr><li>"+i+".Diagnosis: </li></br>");
                    var myDate = item.dateOfChange;
                    var sdi = myDate.split("T");
                    $("#diagnozatt").append("Last updated: " + sdi[0]);
                    $("#diagnozatt").append("Diagnosis ID:<button> "+item.diagnosisId+"</button></br>");
                    var le = item.diseases;

                    $.each(le, function(j, item2) {
                    
                      //  document.getElementById("subject1").value +=' Diseas: ' + item2.diseaseName;
                        $("#diagnozatt").append('<li>Diseas: ' + item2.diseaseName + ' ID:<button>'+item2.diseasesId+'</button></li>');
                   //      $("#diagnozatt").append('<li>Treatment: ' + item.treatment + '</li></br>' );

                    });
                    var le2 = item.treatment;

                    $.each(le2, function(k, item3) {
                        var data1 = item3.startDate;
                        var starD = data1.split("T");
                        var data2 = item3.endDate;
                        var endD = data2.split("T");
                        $("#diagnozatt").append('<li>Treatment: ' + item3.treatmentName + ' ID:<button>'+item3.treatmentId+'</button></li><li> Use From: ' +
                            starD[0] + '</li>  Until: ' + endD[0] + '</li><hr>');

                    });
                });
            } else {

            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    })

});


$(document).on('click', '#edit1', function(event) {

   var docId = localStorage.getItem("persoanlDoc");
    var patId = localStorage.getItem("idPacientitDropbox");
    var tN = document.getElementById("subject3").value;
    var dN = document.getElementById("subject2").value;
    var sD =  document.getElementById('subject4').value;
    var eD =  document.getElementById('subject5').value;
    var inputi2 = document.getElementById("inputPerOre4").textContent;
 if(tN!= "" && dN !="" && sD !="" && eD !="" && inputi2 !=""){
     
    $.ajax({
        type: "POST",
        url: "http://localhost:8010/api/doctorLogicManagement/addDiagnosis/"+docId+"/"+patId+"/"+tN+"/"+dN+"/"+sD+"/"+eD,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            // $("#krejtTerminet").append("Total Appointments:");
            var y = result.errori;
            if (y == null) {
              alert("New diagnosis added!");
            } else {
              alert(y);
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    })
}else {
    
    alert("Please fill all the fields for adding a new diagosis!");
}

});



$("#edit3").click(function(event){
  var dId = document.getElementById("subject6").value;
  var patID = localStorage.getItem("idPacientitDropbox");
  var inputi2 = document.getElementById("inputPerOre4").textContent;
   
    if(dId != "" && inputi2 != ""){
  
     $.ajax({
         type: "post",
         url: "http://localhost:8010/api/doctorLogicManagement/deleteDiseases/"+dId+"/"+patID,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         data: JSON.stringify(addfreeApp),
         success: function(result) {
       
             var y = result.errori;
             if (y == null) {
              
                    alert("Disease Deleted!");
                    
                
             } else {
           
               alert(result.errori);
             }
         },
         error: function(e) {
             console.log("ERROR: ", e);
         }
     })
    }else{
    alert("please choose the patient and his/her's disease");
    }
 });

 $("#edit4").click(function(event){
     
    var treatId = document.getElementById("subject6").value;
    var patId = localStorage.getItem("idPacientitDropbox");
    var inputi2 = document.getElementById("inputPerOre4").textContent;
     
      if(treatId != "" && inputi2 != ""){
    
       $.ajax({
           type: "post",
           url: "http://localhost:8010/api/doctorLogicManagement/deleteTreatment/"+treatId+"/"+patId,
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           data: JSON.stringify(addfreeApp),
           success: function(result) {
         
               var y = result.errori;
               if (y == null) {
                
                      alert("Treatment Deleted!");
                      
                  
               } else {
             
                 alert(result.errori);
               }
           },
           error: function(e) {
               console.log("ERROR: ", e);
           }
       })
      }else{
      alert("please choose the patient and his/her's disease");
      }
   });


$(document).on('click', '#edit2', function(event) {

    var dID = document.getElementById("subject6").value;
     var patID = localStorage.getItem("idPacientitDropbox");
     var tN = document.getElementById("subject3").value;
     var eD =  document.getElementById('subject5').value;
     var inputi2 = document.getElementById("inputPerOre4").textContent;
  if(tN!= "" && eD !="" && inputi2 !="" && dID !=""){
      
     $.ajax({
         type: "POST",
         url: "http://localhost:8010/api/doctorLogicManagement/editTreatment/"+dID+"/"+eD+"/"+tN+"/"+patID,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function(result) {
             // $("#krejtTerminet").append("Total Appointments:");
             var y = result.errori;
             if (y == null) {
               alert("Treatment name and ending date edited!");
             } else {
               alert(y);
             }
         },
         error: function(e) {
             console.log("ERROR: ", e);
         }
     })
 }else {
     
     alert("Please fill all the fields for adding a new diagosis!");
 }
 
 });