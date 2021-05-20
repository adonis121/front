$("#getDepartments").click(function(event){
    $('#getResultDiv').empty();
  $.ajax({
    type : "GET",
    url :  "http://localhost:8080/api/systemManagement/admin/getAllDep",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(result){
       
        var x = result.data;
        if(x != null ){
        $.each(x, function(i, item){
        
            $('#getResultDiv').append('<p>'+item.depName+'</p>'+'</br>');
            $('#getResultDiv').append('<p>prov bre </p>'+'</br>');
          console.log("Success: ", item.depName);
   
         });
                
         }else{
                    $('#getResultDiv').append('<p>'+result.errori+'</p>'+'</br>');
                }
    },
    error : function(e){
        
      $("#getResultDiv").html("<strong>Error</strong>");
      console.log("ERROR: ", e);
    }
     })

  });  


  $("#getDoctor").click(function(event){
    $('#getResultDiv').empty();
    $('#getResultDiv').append("List of Doctors:");
  $.ajax({
    type : "GET",
    url :  "http://localhost:8080/api/systemManagement/admin/getAllDoctors",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(result){
       
        var x = result.data;
        if(x != null ){
        $.each(x, function(i, item){
        
            $('#getResultDiv').append('<div style="display:flex; flex-direction:row">'+'<p> '+item.doctorName+'</p>'+'<p>'+item.doctorSurname+'</p>'+'<p>: '+item.personalNumber+'</p>'+'</div>'+'</br>');
           
          console.log("Success: ", item.doctorName);
   
         });
                
         }else{
                    $('#getResultDiv').append('<p>'+result.errori+'</p>'+'</br>');
                }
    },
    error : function(e){
        
      $("#getResultDiv").html("<strong>Error</strong>");
      console.log("ERROR: ", e);
    }
     })

  });  

//errori prej databasen per FK te klinikes
  $("#getPatients").click(function(event){
    $('#getResultDiv').empty();
    $('#getResultDiv').append("List of Patients: ");
  $.ajax({
    type : "GET",
    url :  "http://localhost:8080/api/systemManagement/admin/getAllPatient",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(result){
       
        var x = result.data;
        if(x != null ){
        $.each(x, function(i, item){
        
            $('#getResultDiv').append('<div style="display:flex; flex-direction:row">'+'<p> '+item.name+'</p>'+'<p>'+item.surname+'</p>'+'<p>: '+item.personalNumber+'</p>'+'</div>'+'</br>');
            
          console.log("Success: ", item.name);
   
         });
                
         }else{
                    $('#getResultDiv').append('<p>'+result.errori+'</p>'+'</br>');
                }
    },
    error : function(e){
        
      $("#getResultDiv").html("<strong>Error</strong>");
      console.log("ERROR: ", e);
    }
     })

  }); 
  
function validateDep(){
   var input1 = document.getElementById("exampleInputEmail3").value;
   var input2 = document.getElementById("exampleInputEmail2").value;
   
   addDepartment = {
    depName:$("exampleInputEmail3").val(),
    numberOfRooms:$("exampleInputEmail2").val()
  }
   if(input1.trim() == "" || input2.trim() == ""){
     alert ("Please fill all the inputs!");
     return false;
   }return true;
}

var addDepartment = {
  depName:"",
  numberOfRooms:0
}

  $("#addDep").click(function(e) {
    if(validateDep()){
    e.preventDefault();
    console.log(addDep);
    // goToDashboard2();
    $.ajax({
            url: "http://localhost:8080/api/systemManagement/admin/addDepartmentt",
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(addDep),
            success: function(res) {
                var y = res.errori;
                if (y == null) {
                    localStorage.setItem('department', JSON.stringify(res.data))
                    alert("Department added successfully!")
                    window.location.href = "admin.html";
                } else {
                    alert(res.errori);
                    window.location.href = "admin.html";

                }
            },
            error: function(error) {
                console.log(error);
               
            }
        })
      }
});

