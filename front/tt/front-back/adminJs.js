$("#getDepartments").click(function(event) {
    $('#getResultDiv').empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/getAllDep",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var x = result.data;
            if (x != null) {
                $('#getResultDiv').append('<h4 style="color:#a9a9a9">List of Departments:</h4>');
                $.each(x, function(i, item) {

                    $('#getResultDiv').append('<div style="display:flex; flex-direction:row; color:	#000080; font-family:"calibri";font-size:15px;">' + '<p>' + item.depName + '</p>' + '</br>' + '</div>');

                    console.log("Success: ", item.depName);

                });

            } else {
                $('#getResultDiv').append('<p>' + result.errori + '</p>' + '</br>');
            }
        },
        error: function(e) {

            $("#getResultDiv").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    })

});


$("#getDoctor").click(function(event) {
    $('#getResultDiv').empty();
    $('#getResultDiv').append('<h4 style="color:#a9a9a9">List of Doctors:</h4>');
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/getAllDoctors",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var x = result.data;
            if (x != null) {
                $.each(x, function(i, item) {

                    $('#getResultDiv').append('<div style="display:flex; flex-direction:row; color:	#000080; font-family:"calibri";font-size:15px;">' + '<p> ' + item.doctorName + '</p>' + '<p>' + item.doctorSurname + '</p>' + '<p>: ' + item.personalNumber + '</p>' + '</div>' + '</br>');

                    console.log("Success: ", item.doctorName);

                });

            } else {
                $('#getResultDiv').append('<p>' + result.errori + '</p>' + '</br>');
            }
        },
        error: function(e) {

            $("#getResultDiv").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    })

});


$("#getPatients").click(function(event) {
    $('#getResultDiv').empty();
    $('#getResultDiv').append('<h4 style="color:#a9a9a9"> List of Patients: </h4>');
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/getAllPatient",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var x = result.data;
            if (x != null) {
                $.each(x, function(i, item) {

                    $('#getResultDiv').append('<div style="display:flex; flex-direction:row;  color:	#000080; font-family:"calibri";font-size:15px;">' + '<p> ' + item.name + '</p>' + '<p>' + item.surname + '</p>' + '<p>: ' + item.personalNumber + '</p>' + '</div>' + '</br>');

                    console.log("Success: ", item.name);

                });

            } else {
                $('#getResultDiv').append('<p>' + result.errori + '</p>' + '</br>');
            }
        },
        error: function(e) {

            $("#getResultDiv").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    })

});

var addDepartment2 = {
    depName: "",
    numberOfRooms: 0
}

function validateDep() {

    var input1 = document.getElementById("exampleInputDepName").value;
    var input2 = document.getElementById("exampleInputDepRooms").value;

    addDepartment2 = {
        depName: $("#exampleInputDepName").val(),
        numberOfRooms: $("#exampleInputDepRooms").val()
    }
    if (input1.trim() == "" || input2.trim() == "") {
        alert("Please fill all the inputs!");

    }
}

$("#addDep").click(function(event) {
    validateDep();
    event.preventDefault();
    console.log(addDepartment2);
    // goToDashboard2();
    $.ajax({
        url: "http://localhost:8090/api/systemManagement/admin/addDepartmentt",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(addDepartment2),
        success: function(res) {
            var y = res.errori;
            if (y == null) {
                alert("Department added successfully!");
                localStorage.setItem('department', JSON.stringify(res.data))
                alert("Department added successfully!");
                console.log("added");
                //  alert("Department added successfully!")
                window.location.href = "admin.html";
            } else {
                alert(y);
                window.location.href = "admin.html";


            }
        },
        error: function(error) {
            console.log(error);

        }
    })

});

function validateDep2() {

    var depName = document.getElementById("enterDepName").value;
    var numberOfRooms = document.getElementById("enterDepRoom").value;

    if (depName.trim() == "" || numberOfRooms.trim() == "") {
        alert("please fill all the inputs!");
    }


}
$("#editDep").click(function(event) {
    validateDep2();
    event.preventDefault();
    var depName = document.getElementById("enterDepName").value;
    var numberOfRooms = document.getElementById("enterDepRoom").value;

    // goToDashboard2();
    $.ajax({
        url: "http://localhost:8090/api/systemManagement/admin/editDep/" + depName + "/" + numberOfRooms,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function(res) {
            var y = res.errori;
            if (y == null) {
                //  event.preventDefault();
                //localStorage.setItem('department', JSON.stringify(res.data))
                alert("Department edited successfully!");
                console.log("added");
                //  alert("Department added successfully!")
                window.location.href = "admin.html";
            } else {
                //event.preventDefault();
                alert(y);
                window.location.href = "admin.html";

            }
        },
        error: function(error) {
            console.log(error);

        }
    })

});


function validate2() {
    var inputi = document.getElementById("departmentsName").value;
    if (inputi.trim() == "") {
        alert("Please Write Departments Name");

    }
}

$("#deleteDepartment").click(function(event) {
    validate2();
    event.preventDefault();
    var inputi = document.getElementById("departmentsName").value;
    console.log(inputi);
    $.ajax({
        url: "http://localhost:8090/api/systemManagement/admin/deleteDep/" + inputi,
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function(res) {
            var y = res.errori;
            if (y == null) {
                // event.preventDefault();

                alert("Department deleted successfully!");

                window.location.href = "admin.html";
                console.log("deleted");
                //  alert("Department added successfully!")
                // window.location.href = "admin.html";
            } else {
                alert(y);
                // event.preventDefault();
                window.location.href = "admin.html";
            }
        },
        error: function(error) {
            console.log(error);

        }
    })

});


$("#kompletMjeket").click(function(event) {
    $('#list-profile').empty();
    $('#list-profile').append('<h4 style="color:#a9a9a9">List of Doctors:</h4>');
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/getAllDoctors",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var x = result.data;
            if (x != null) {
                $.each(x, function(i, item) {

                    $('#list-profile').append('<div style="display:flex; flex-direction:row;color:	#000080; font-family:"calibri";font-size:15px; ">' + '<ul style="list-style-type:none"><li> Name: ' + item.doctorName + '</li>' + '<li>Surname: ' + item.doctorSurname + '</li>' + '<li>Personal No.: ' + item.personalNumber + '</li>' + '<li> Department:' + item.departmentN + '</li>' +
                        '<li>Email:  ' + item.email + '</li></ul><hr style="color:#000080">' + '</div>' + '</br>');

                    console.log("Success: ", item.doctorName);

                });

            } else {
                $('#list-profile').append('<p>' + result.errori + '</p>' + '</br>');
            }
        },
        error: function(e) {

            $("#list-profile").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    })

});

function validateAdv() {
    var advertName = document.getElementById("emriReklames").value;
    var aPath = document.getElementById("pathReklames").value;

    if (advertName.trim() == "" || aPath.trim() == "") {
        alert("Please fill all the inputs!");
    }
}

//errori per fk te Admin-it
$("#shtoReklama").click(function(event) {
    validateAdv();
    event.preventDefault();
    var advertName = document.getElementById("emriReklames").value;
    var aPath = document.getElementById("pathReklames").value;
    console.log(aPath);

    $.ajax({
        url: "http://localhost:8090/api/systemManagement/admin/addAdvert/" + advertName + "/" + aPath,
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function(res) {
            var y = res.errori;
            if (y == null) {
                alert("Advertisement added successfully!");
                localStorage.setItem('advertisement', JSON.stringify(res.data))

                console.log("added");

                window.location.href = "admin.html";
            } else {
                alert(y);
                window.location.href = "admin.html";


            }
        },
        error: function(error) {
            console.log(error);

        }
    })

});

function validate3() {
    var advertName = document.getElementById("fshijeAdvertin").value;

    if (advertName.trim() == "") {
        alert("Please fill all the inputs");
    }
}

$("#deleteReklamen").click(function(event) {
    validate3();
    event.preventDefault();
    var advertName = document.getElementById("fshijeAdvertin").value;
    console.log(advertName);
    $.ajax({
        url: "http://localhost:8090/api/systemManagement/admin/deleteDep/" + advertName,
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function(res) {
            var y = res.errori;
            if (y == null) {
                // event.preventDefault();

                alert("Advertisement deleted successfully!");

                window.location.href = "admin.html";
                console.log("deleted");
                //  alert("Department added successfully!")
                // window.location.href = "admin.html";
            } else {
                alert(y);
                // event.preventDefault();
                window.location.href = "admin.html";
            }
        },
        error: function(error) {
            console.log(error);

        }
    })

});


function validateK() {

    var adresa = document.getElementById("enterAdresen").value;
    var nrTel = document.getElementById("enterNrTelefonit").value;
    var emaili = document.getElementById("enterEmailin").value;
    var partners = document.getElementById("enterNumrinPartners").value;

    if (adresa.trim() == "" || nrTel.trim() == "" || emaili.trim() == "" || partners.trim() == "") {
        alert("Please fill all the inputs!");
        return false;
    }
    return true;
}



$("#editKliniken").click(function(event) {
    if (validateK()) {
        event.preventDefault();
        var adresa = document.getElementById("enterAdresen").value;
        var nrTel = document.getElementById("enterNrTelefonit").value;
        var emaili = document.getElementById("enterEmailin").value;
        var partners = document.getElementById("enterNumrinPartners").value;

        $.ajax({
            url: "http://localhost:8090/api/systemManagement/admin/addClinicInfor/" + adresa + "/" + nrTel + "/" + emaili + "/" + partners,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function(res) {
                var y = res.errori;
                if (y == null) {
                    alert("MedNotes Clinic info was added successfully!");
                    // localStorage.setItem('clinic', JSON.stringify(res.data))

                    console.log("added");

                    window.location.href = "admin.html";
                } else {
                    alert(y);
                    window.location.href = "admin.html";


                }
            },
            error: function(error) {
                console.log(error);

            }
        })
    }
});

//errori pershkak lidhjes paicent klinik
$("#infotKlinikes").click(function(event) {
    //event.preventDefault();
    $('#hapsiraInfoKlinikes').empty();
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/getClinic",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var x = result.data;
            if (x != null) {

                $('#hapsiraInfoKlinikes').append('<p>' + result.data.name + '</p>' + '</br>');
                $('#hapsiraInfoKlinikes').append('<p>' + result.data.adrres + '</p>' + '</br>');
                $('#hapsiraInfoKlinikes').append('<p>' + result.data.email + '</p>' + '</br>');
                $('#hapsiraInfoKlinikes').append('<p>' + result.data.phone + '</p>' + '</br>');
                $('#hapsiraInfoKlinikes').append('<p>' + result.data.partners + '</p>' + '</br>');

                console.log("Success: ", result.data);



            } else {
                $('#hapsiraInfoKlinikes').append('<p>' + result.errori + '</p>' + '</br>');
            }
        },
        error: function(e) {

            $("#hapsiraInfoKlinikes").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    })

});


function footeriMedNotes() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/getClinic",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var x = result.data;
            if (x != null) {
                document.getElementById("emailiKlinikes").innerHTML = "Email: " + result.data.email;
                document.getElementById("telefoniKlinikes").innerHTML = "Phone: " + result.data.phone;
                document.getElementById("adresaKlinikes").innerHTML = result.data.adrres;
                document.getElementById("nrPartKlinikes").innerHTML = "Number of partners: " + result.data.partners;





                console.log("Success: ", result.data);

            }
        },
        error: function(e) {

            $("#hapsiraInfoKlinikes").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    })

}

$("#fshijUserin").click(function(event) {
    var personalNumber = document.getElementById("nrPersonalUseri").value;
    if (personalNumber.trim() != "") {
        event.preventDefault();

        $.ajax({
            url: "http://localhost:8090/api/systemManagement/admin/deleteUser/" + personalNumber,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function(res) {
                var y = res.errori;
                if (y == null) {
                    alert(res.mesazhi);
                    // localStorage.setItem('clinic', JSON.stringify(res.data))

                    console.log("added");

                    window.location.href = "admin.html";
                } else {
                    alert(y);
                    window.location.href = "admin.html";


                }
            },
            error: function(error) {
                console.log(error);

            }
        })

    } else {
        alert("Please specify users personalNumber!");
    }
});


function getTotalDep() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/totalNumberOfDep",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var x = result.data;
            if (x != null) {

                document.getElementById("totaliDepa").innerHTML = result.data;
                // $('#hapsiraInfoKlinikes').append('<p>'+result.data+'</p>'+'</br>');

                console.log("Success: ", result.data);



            }
        },
        error: function(e) {

            $("#hapsiraInfoKlinikes").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    })


}

function getTotalUser() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/totalNumberOfUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var x = result.data;
            if (x != null) {

                document.getElementById("totaliUsera").innerHTML = result.data;
                // $('#hapsiraInfoKlinikes').append('<p>'+result.data+'</p>'+'</br>');

                console.log("Success: ", result.data);



            }
        },
        error: function(e) {

            $("#hapsiraInfoKlinikes").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    })


}

function getTotalDoc() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/totalNumberOfDoc",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var x = result.data;
            if (x != null) {

                document.getElementById("totaliMjek").innerHTML = result.data;
                // $('#hapsiraInfoKlinikes').append('<p>'+result.data+'</p>'+'</br>');

                console.log("Success: ", result.data);



            }
        },
        error: function(e) {

            $("#hapsiraInfoKlinikes").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    })


}

function getTotalPac() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/totalNumberOfPat",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var x = result.data;
            if (x != null) {

                document.getElementById("totaliPAcient").innerHTML = result.data;
                // $('#hapsiraInfoKlinikes').append('<p>'+result.data+'</p>'+'</br>');

                console.log("Success: ", result.data);



            }
        },
        error: function(e) {

            $("#hapsiraInfoKlinikes").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    })


}



$("#listaPacientvee").click(function(event) {
    $('#list-messages').empty();
    $('#list-messages').append('<h4 style="color:#a9a9a9">List of Patients:</h4>');
    $.ajax({
        type: "GET",
        url: "http://localhost:8090/api/systemManagement/admin/getAllPatient",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {

            var x = result.data;
            if (x != null) {
                $.each(x, function(i, item) {

                    $('#list-messages').append('<div style="display:flex; flex-direction:row; color:	#000080; font-family:"calibri";font-size:15px;">' + '<ul style="list-style-type:none"><li>Name:  ' + item.name + '</li>' + '<li>Surname: ' + item.surname + '</li>' + '<li>Personal No.: ' + item.personalNumber + '</li>' + ' <li>Email: ' + item.email + '</li>' + '</ul>' + '<hr style="color:#000080">' + '</div>' + '</br>');

                    console.log("Success: ", item.name);

                });

            } else {
                $('#list-messages').append('<p>' + result.errori + '</p>' + '</br>');
            }
        },
        error: function(e) {

            $("#list-messages").html("<strong>Error</strong>");
            console.log("ERROR: ", e);
        }
    })

});