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

  var addDepartment2 = {
    depName:"",
    numberOfRooms:0
  }
  
function validateDep(){
   
    var input1 = document.getElementById("exampleInputDepName").value;
    var input2 = document.getElementById("exampleInputDepRooms").value;

    addDepartment2 = {
      depName: $("#exampleInputDepName").val(),
      numberOfRooms: $("#exampleInputDepRooms").val()
     }
   if(input1.trim() == "" || input2.trim() == ""){
     alert ("Please fill all the inputs!");
   
   }
}



  $("#addDep").click(function(e) {
    validateDep();
   // e.preventDefault();
    console.log(addDepartment2);
    // goToDashboard2();
    $.ajax({
            url: "http://localhost:8080/api/systemManagement/admin/addDepartmentt",
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
                   // window.location.href = "admin.html";
                } else {
                    alert(y);
                   

                }
            },
            error: function(error) {
                console.log(error);
               
            }
        })
      
});

function validate2(){
  var inputi = document.getElementById(departmentsName).value;
  if(inputi.trim()== ""){
    alert("Write departments Name");
}
}
//e pa perfunduar
$("#deleteDep").click(function(e) {
validate2();

 // e.preventDefault();
  console.log();
  // goToDashboard2();
  $.ajax({
          url: "http://localhost:8080/api/systemManagement/admin/deleteDep"+inputi,
          type: 'POST',
          contentType: "application/json; charset=utf-8",
          dataType: "json",
        
          success: function(res) {
              var y = res.errori;
              if (y == null) {
                alert("Department deleted successfully!");
                 
                 
                  console.log("deleted");
                //  alert("Department added successfully!")
                 // window.location.href = "admin.html";
              } else {
                  alert(y);
                 

              }
          },
          error: function(error) {
              console.log(error);
             
          }
      })
     
});