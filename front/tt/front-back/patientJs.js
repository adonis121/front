function refresh() {
    window.location.reload();
}

function getDocCards() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/getAllDoctors",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var y = result.data;
            if (y != null) {
                $.each(y, function(i, item) {
                    $("#hapsiraKryesore").append('<div class="col-md-3" style="float:left"><div class="card mb-2"><img class="card-img-top profile" src="assets/img/femdoc.jpg" alt="Card image cap"><div class="card-body"><h4 class="card-title">' +
                        item.doctorName + ' ' + item.doctorSurname + '</h4><p class="card-text">' + item.departmentN + ': ' + item.doctorSpecialization + '</p><p>Chat: </p><button class="bvepVallai" type="button" data-toggle="modal" data-target="#chatModal" id="butonisBisedes">' + item.personalNumber + '</button><!-- Chat --><div class="modal fade" id="chatModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Chat</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick = "refresh()"><span aria-hidden="true">&times;</span>' +
                        '</button></div><div class="modal-body"><form onsubmit="return false;"><div class="chat-messages"><div id="sendFjalet" class="message-box-holder"></div><div id="sendFjalet2" class="message-box-holder"></div>' +
                        '<div id="fjalet" class="message-box-holder"></div>' +
                        '</div><input type="text" class="form-control" id="recipient-name" placeholder="Type a message..."><div class="modal-footer"><button class="btn btn-primary" id="butoniFshijBiseden">Delete Conversation</button><button id="dergoMesazhin" class="btn btn-primary">Send</button></div></form></div>' +
                        '</div></div></div></div></div></div>');



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

function faqjaEPersonalizuar() {

    var nrP = localStorage.getItem("persoanlPat");

    document.getElementById("nrPersonal").innerHTML = "PatientNumber: " + nrP;



}

$(document).on('click', '.bvepVallai', function(event) {
    //not finished!!!!
    $("#fjalet").empty();
    $("#sendFjalet").empty();
    $("sendFjalet2").empty();

    var patNumber = localStorage.getItem("persoanlPat");
    var docNumber = $(this).text();
    localStorage.setItem("butoniPerDoc", $(this).text());


    $.ajax({
        url: "http://localhost:8000/api/conversationManagement/allConversation/" + docNumber + "/" + patNumber,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(res) {

            var e = res.errori;

            // localStorage.setItem('admin')
            if (e == null) {
                var y = res.data;
                $.each(y, function(i, item) {
                    if (item.role == 1) {
                        $("#sendFjalet").append('You:<div class="message-box">' + item.conversationDes + '</div>');
                    } else {
                        $("#sendFjalet").append('<div class="message-sender">Doctor:<div class="message-box message-partner" >' + item.conversationDes + '</div></div>');
                        console.log(res.data.conversationDes);
                    }

                });

            } else {
                $("#sendFjalet").append(e);
            }
        },
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
        url: "http://localhost:8000/api/conversationManagement/conversationListPatient/" + patNumber,
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
                    $("#convList").append('<li><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg" alt=""><div><h2>' + item.doctorName + ' ' + item.doctorSurname + '</h2></div></li>');
                    console.log(res.data.conversationDes);

                });

            } else {
                $("#convList").append(e);
            }
        },
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
    var fjaliaBisedes = document.getElementById("recipient-name").value;


    if (fjaliaBisedes == "") {

        alert("Please write a message!");
    } else {
        $.ajax({
            url: "http://localhost:8000/api/conversationManagement/addNewConversation/" + personalNumber + "/" + doctorPersonalNumber + "/" + fjaliaBisedes + "/" + roli,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(res) {


                $("#sendFjalet2").append('You:<div class="message-box">' + fjaliaBisedes + '</div>');
                console.log(res.mesazhin);





            },
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

        url: "http://localhost:8000/api/conversationManagement/deleteConvPat/" + docNumber + "/" + patNumber,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(res) {
            $("#fjalet").empty();
            $("#sendFjalet").empty();
            $("#sendFjalet2").empty();
            $("#sendFjalet").append("There is no conversation!");

        },
        error: function(error) {
            console.log(error);

        }

    })

});


function shfaqDepartametet() {
    $("#listaTermineveSot").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/getAllDep",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var y = result.data;
            if (y != null) {
                $.each(y, function(i, item) {
                    $("#depatamentet").append('<div class="col " style="flex: 1 0 15%;padding: 2px; margin:2px;"><button type="button" data-toggle="modal" data-target="#getClinicModal" id = "shfaqMjektNdep" style="width:100px; color:rgb(82, 80, 80)">' + item.depName + '</button><p class="fs-3 " style="font-size:20px;"><img src="assets/img/hsrooms.jpg " class="img-fluid " style="border-radius: 50%;width:30px; height: 30px; " alt="...">' + item.depId + '</p></div>');
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

/*$(document).on('click', '#shfaqMjektNdep', function(event) {
        
 
    var depNumber = 
    $.ajax({
        
        url: "http://localhost:8090/api/systemManagement/patient/getDoctortByDep/"+depNumber,
        type: 'get',
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
*/

$(document).on('click', '#shfaqMjektNdep', function(event) {
    var depNumber = $(this).text();
    $("#listaTermineveSot").empty();
    $("#listaTermineveSot2").empty();
    $.ajax({
        url: "http://localhost:8090/api/systemManagement/admin/getAllDoctors",
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
                    if (depNumber == item.departmentN) {
                        //if(item.depId == depNumber){
                        //  alert("erdh kerksa");
                        $("#listaTermineveSot").append('<li><button id="terminetMjekutPerkates">' + item.personalNumber + '</button>' + item.doctorName + ' ' + item.doctorSurname + '</li>');

                    }

                    //}
                });

            } else {
                $("#listaTermineveSot").append(e);
            }
        },
        error: function(error) {
            console.log(error);

        }
    })
});

$(document).on('click', '#terminetMjekutPerkates', function(event) {
    var personalNumber = $(this).text();
    $("#listaTermineveSot2").empty();
    $.ajax({
        url: "http://localhost:8030/api/appointmentManagement/getAppByDoc/" + personalNumber,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(res) {

            var e = res.errori;
            var m
                // localStorage.setItem('admin')
            if (e == null) {
                var y = res.data;
                $("#listaTermineveSot2").append("Appointments By:" + personalNumber);
                $.each(y, function(i, item) {
                    //   $("#listaTermineveSot2").append('Appointments by: '+item.doctorName+' '+item.doctorSurname);
                    if (item.freeAppoint == true && item.canceledByDoc == false) {
                        //if(item.depId == depNumber){
                        //  alert("erdh kerksa");
                        var myDate = item.dateAndTime;
                        var sdi = myDate.split("T");
                        $("#listaTermineveSot2").append('<li>Date: ' + sdi[0] + ' at: ' + item.time + ':00</li>');

                    }

                    //}
                });

            } else {
                $("#listaTermineveSot").append(e);
            }
        },
        error: function(error) {
            console.log(error);

        }
    })
});

//terminetSot mi shfaq
function notification3() {
    var patId = localStorage.getItem("persoanlPat");
    $.ajax({
        type: "GET",
        url: "http://localhost:8030/api/appointmentManagement/getTodaysAppPat/" + patId,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            // $("#krejtTerminet").append("Total Appointments:");
            var y = result.data;
            if (y != null) {
                $.each(y, function(i, item) {
                    if (item.canceledByPat == false && item.freeAppoint == false) {
                        document.getElementById("terminetSotPacienti").style.background = "#FF0000";

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

$("#terminetSotPacienti").click(function(event) {
    //$("#hapsiraListes").empty();



    $("#listaTermineveSot3").empty();
    var patId = localStorage.getItem("persoanlPat");
    $.ajax({
        type: "GET",
        url: "http://localhost:8030/api/appointmentManagement/getTodaysAppPat/" + patId,
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
                    if (item.freeAppoint == false && item.canceledByPat == false && item.canceledByDoc == false) {
                        $("#listaTermineveSot3").append('<li>' + sdi[0] + '  at: ' + item.time + '</li>');
                        // myDate.format("mm/dd/yy");
                        console.log(sdi[0]);
                    } else if (item.canceledByDoc == true) {
                        $("#listaTermineveSot3").append('<li>' + sdi[0] + '  at: ' + item.time + '- Canceled</li>');
                    }
                    //localStorage.setItem('idPacienetit' , item.personalNumber);
                });
            } else {
                $("#listaTermineveSot3").append('<li>' + result.errori + '</li>');
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    })
});

//dropBox per mjekt
function dropBoxMjekt() {
    var depNumber = $(this).text();

    $.ajax({
        url: "http://localhost:8090/api/systemManagement/admin/getAllDoctors",
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

                    //if(item.depId == depNumber){
                    //  alert("erdh kerksa");
                    $("#doctorss").append('<option id="opsioni" >' + item.doctorName + " " + item.doctorSurname + ' <button>' + item.personalNumber + '</button></option>');
                    document.getElementById("opsioni").value = item.personalNumber;


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
    document.getElementById("inputPerOre3").innerHTML = vlera;
    localStorage.setItem("idMjekutDropbox", vleraDuhur[2]);
    localStorage.setItem("emriMjekut", vleraDuhur[0] + "" + vleraDuhur[1])

    // alert(vleraDuhur[2]);
});


$(document).on('click', '#opsioni', function(event) {
    var personalNumber = localStorage.getItem('idMjekutDropbox');
    $("#terminnetETeZgjedhurit").empty();
    $.ajax({
        url: "http://localhost:8030/api/appointmentManagement/getAppByDoc/" + personalNumber,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(res) {

            var e = res.errori;
            var m
                // localStorage.setItem('admin')
            if (e == null) {
                var y = res.data;
                var emriMj = localStorage.getItem("emriMjekut");
                $("#terminnetETeZgjedhurit").append("Appointments By:" + emriMj);
                $.each(y, function(i, item) {
                    //   $("#listaTermineveSot2").append('Appointments by: '+item.doctorName+' '+item.doctorSurname);
                    if (item.freeAppoint == true && item.canceledByDoc == false) {
                        //if(item.depId == depNumber){
                        //  alert("erdh kerksa");
                        var myDate = item.dateAndTime;
                        var sdi = myDate.split("T");
                        $("#terminnetETeZgjedhurit").append('<li>Date: ' + sdi[0] + ' at: ' + item.time + ':00</li>');

                    }

                    //}
                });

            } else {
                $("#terminnetETeZgjedhurit").append(e);
            }
        },
        error: function(error) {
            console.log(error);

        }
    })
});

$(document).on('click', '#oraTerminit', function(event) {
    var oraTerm = $(this).text();
    localStorage.setItem("oraPerTermin", oraTerm);
    document.getElementById("inputPerOre2").innerHTML = oraTerm;
    // localStorage.setItem("oraPerTermin" , oraTerm);
    // alert(localStorage.getItem("oraT"));
    // alert(localStorage.getItem("oraT"));

});


$(document).on('click', '#oraTerminit2', function(event) {
    var docNumber = localStorage.getItem('idMjekutDropbox');
    var patPrNumber = localStorage.getItem("persoanlPat");
    var dateAndTime = document.getElementById('datepicker').value;

    var time = localStorage.getItem('oraPerTermin');
    alert(time);
    var inputi1 = document.getElementById("inputPerOre3").textContent;
    var inputi2 = document.getElementById("inputPerOre2").textContent;
    if (inputi1.trim() != "" && inputi2.trim() != "" && dateAndTime.trim() != "") {
        $("#terminnetETeZgjedhurit").empty();
        $.ajax({
            url: "http://localhost:8030/api/appointmentManagement/addNewAppointmentPat/" + patPrNumber + "/" + docNumber + "/" + dateAndTime + "/" + time,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(res) {

                var e = res.errori;
                if (e == null) {


                    alert("Appointment added!");

                } else {
                    alert(e);
                }
            },
            error: function(error) {
                console.log(error);

            }
        })
    } else {
        alert("Please choose all the needed inputs");
    }
});

// cancel terminin
$(document).on('click', '#oraTerminit3', function(event) {
    var docId = localStorage.getItem('idMjekutDropbox');
    var patId = localStorage.getItem("persoanlPat");
    var date = document.getElementById('datepicker').value;
    var time = localStorage.getItem('oraPerTermin');
    alert(time);
    var inputi1 = document.getElementById("inputPerOre3").textContent;
    var inputi2 = document.getElementById("inputPerOre2").textContent;
    if (inputi1.trim() != "" && inputi2.trim() != "" && date.trim() != "") {
        $("#terminnetETeZgjedhurit").empty();
        $.ajax({
            url: "http://localhost:8030/api/appointmentManagement/deleteAppointment/" + docId + "/" + date + "/" + patId + "/" + time,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(res) {

                var e = res.errori;
                if (e == null) {


                    alert("Appointment canceled!");

                } else {
                    alert(e);
                }
            },
            error: function(error) {
                console.log(error);

            }
        })
    } else {
        alert("Please choose all the needed inputs");
    }
});


function getPersoanlApp() {

    $("#listaTermineveAll").empty();
    var personalNumber = localStorage.getItem("persoanlPat");

    $.ajax({
        type: "GET",
        url: "http://localhost:8030/api/appointmentManagement/getAppByPat/" + personalNumber,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            var y = result.data;
            if (y != null) {
                $.each(y, function(i, item) {
                    console.log(y);
                    if (item.freeAppoint == false && item.canceledByDoc == false && item.canceledByPat == false) {
                        var myDate = item.dateAndTime;
                        var sdi = myDate.split("T");

                        // myDate.format("mm/dd/yy");
                        $("#listaTermineveAll").append('<li>' + sdi[0] + '  at: ' + item.time + '</li>');

                        //localStorage.setItem('idPacienetit' , item.personalNumber);
                    } else if (item.canceledByDoc == true) {
                        var myDate = item.dateAndTime;
                        var sdi = myDate.split("T");
                        $("#listaTermineveAll").append('<li>' + sdi[0] + '  at: ' + item.time + '</li> - Canceled!');
                    } else {
                        $("#listaTermineveAll").append('<li>You dont have upcoming appointments</li>');
                    }
                });
            } else {
                $("#listaTermineveAll").append('<li>' + result.errori + '</li>');
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    })
}



$("#searchbtn").click(function(event) {

    $('#resultdiv').empty();

    var name = document.getElementById("searchInput").value;
    if (name != "") {

        $.ajax({
            url: "http://localhost:8090/api/systemManagement/doctor/searchDoctor/" + name,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function(res) {
                var x = res.data;
                if (x != 0) {

                    $.each(x, function(i, item) {

                        $('#resultdiv').append('<div style="display:flex; flex-direction:row;  font-family:"calibri";font-size:15px; ">' + '<p style="margin-right:2%"> ' + item.doctorName + "  " + item.doctorSurname + " Department: " + item.departmentN + ' </p>' + '</div>');

                        console.log("Success: ", item.name);

                    });

                } else {
                    $('#resultdiv').append('<div style="display:flex; flex-direction:row;  font-family:"calibri";font-size:15px; ">' + '<p style="margin-right:2%">No results ' + ' </p>' + '</div>');


                }
            },
            error: function(e) {

                $("#resultdiv").html("<strong>Error</strong>");
                console.log("ERROR: ", e);
            }
        })

    }
});


function getPersoanlInfo() {

    $("#listaInnformatavPersonale").empty();
    var nrPersonal = localStorage.getItem("persoanlPat");

    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/PatientByPersonal/" + nrPersonal,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            if (result != null) {

                $("#listaInnformatavPersonale").append('<li>Name and Surname: ' + result.name + ' ' + result.surname + '</li>' +
                    '<li>Email: ' + result.email + '</li><li>Personal Number: ' + result.personalNumber + '</li>' +
                    '<li>Blood Type: ' + result.bloodG + ' - Height: ' + result.height + ' - Weight: ' + result.weight + '</li>');


            } else {
                $("#listaInnformatavPersonale").append('<li>' + result + '</li>');
            }
        },
        error: function(e) {
            console.log("ERROR: ", e);
        }
    })
}

$("#edit").click(function(event) {

    var pId = localStorage.getItem("persoanlPat");
    var blood = document.getElementById("degree").value;
    var w = document.getElementById("special2").value;
    var h = document.getElementById("special").value;
    if (blood != "" && w != "" && h != "") {

        $.ajax({
            url: "http://localhost:8090/api/systemManagement/patient/editProfile/" + pId + "/" + blood + "/" + w + "/" + h,
            type: 'GET',
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

    } else {
        alert("Please fill all the forms!");
    }
});


//diagnosat mi shfaqq
function getPersoanlDiagnosis() {
    var patId = localStorage.getItem("persoanlPat");
    $.ajax({
        type: "GET",
        url: "http://localhost:8010/api/doctorLogicManagement/getDiagnosisByPat/" + patId,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            // $("#krejtTerminet").append("Total Appointments:");
            var y = result.data;
            if (y != null) {
                $("#listaInnformatavPersonale2").append("<hr>Diagnosis: </br>");

                $.each(y, function(i, item) {
                    var myDate = item.dateOfChange;
                    var sdi = myDate.split("T");
                    $("#listaInnformatavPersonale2").append("Last updated: " + sdi[0]);
                    var le = item.diseases;

                    $.each(le, function(j, item2) {

                        $("#listaInnformatavPersonale2").append(':<li>Diseas: ' + item2.diseaseName + '</li>');
                        // $("#listaInnformatavPersonale2").append('<li>Treatment: ' + item.treatment + '</li></br>' );

                    });
                    var le2 = item.treatment;

                    $.each(le2, function(k, item3) {
                        var data1 = item3.startDate;
                        var starD = data1.split("T");
                        var data2 = item3.endDate;
                        var endD = data2.split("T");
                        $("#listaInnformatavPersonale2").append('<li>Treatment: ' + item3.treatmentName + '</li><li> Use From: ' +
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
}


function validate5() {
    var int = document.getElementById("suggArea").value;

    if (int.trim() == null) {
        return false;
    }
    return true;

}

$("#suggBtn").click(function(event) {

    //$("#hapsiraListes").empty();
    if (validate5()) {

        var content = document.getElementById("suggArea").value;
        var nrPersonal = localStorage.getItem("persoanlPat");
        //  var oraTerminit = localStorage.getItem("oraPerTermin");
        $.ajax({
            type: "post",
            url: "http://localhost:8020/api/patientLogicManagement/addSuggestion/" + content + "/" + nrPersonal,
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function(result) {
                //         alert("erdh kerksa");
                //           window.location.reload();
                var y = result.errori;
                if (y == null) {
                    //  $.each(y, function(i, item) {
                    //   $("#krejtTerminet").append('<p>'+item.dateAndTime+'</p>');
                    //localStorage.setItem('idPacienetit' , item.personalNumber);
                    alert("Sugesstion Added");


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


function showAdvertisment() {
    $("#adverts").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/getAllAdvert",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var y = result.data;
            if (y != null) {
                $.each(y, function(i, item) {


                    $("#img").attr('src', item.aPath);
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


function showAdvices() {
    $("#advices").empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:8010/api/doctorLogicManagement/allAdivce",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var y = result.data;
            if (y != null) {
                $.each(y, function(i, item) {
                    var data =item.addedDate;
                    var data1 = data.split("T");
                    $("#advices").append(' <div class="card border-primary mb-3 col" style=" padding: 2px; margin:2px; justify-content: space-between; max-width: 18rem; ">' +
                        '<div class="card-header">' + item.title + '</div>' +
                        ' <div class="card-body text-primary">' +
                        '<h5 class="card-title">' + item.content + '</h5>' +
                        '<p class="card-text">' + item.doctorEntity.doctorName + ' ' + item.doctorEntity.doctorSurname + ' ' + data1[0] + '</p>' +
                        ' </div>' + '</div>');

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