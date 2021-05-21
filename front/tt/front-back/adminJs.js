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

  $("#addDep").click(function(event) {
    validateDep();
    event.preventDefault();
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
                  alert ("Department added successfully!");
                    localStorage.setItem('department', JSON.stringify(res.data))
                    alert ("Department added successfully!");
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

function validateDep2(){
   
  var depName =document.getElementById("enterDepName").value;
  var numberOfRooms =document.getElementById("enterDepRoom").value;

  if(depName.trim() == "" || numberOfRooms.trim() == ""){
    alert("please fill all the inputs!");
  }


}
$("#editDep").click(function(event) {
  validateDep2();
  event.preventDefault();
  var depName =document.getElementById("enterDepName").value;
  var numberOfRooms =document.getElementById("enterDepRoom").value;
  
  // goToDashboard2();
  $.ajax({
          url: "http://localhost:8080/api/systemManagement/admin/editDep/"+depName+"/"+numberOfRooms,
          type: 'POST',
          contentType: "application/json; charset=utf-8",
          dataType: "json",
         
          success: function(res) {
              var y = res.errori;
              if (y == null) {
              //  event.preventDefault();
                  //localStorage.setItem('department', JSON.stringify(res.data))
                  alert ("Department edited successfully!");
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


function validate2(){
  var inputi = document.getElementById("departmentsName").value;
  if(inputi.trim() == ""){
    alert("Please Write Departments Name");
    
}
}

$("#deleteDepartment").click(function(event) {
validate2();
event.preventDefault();
var inputi = document.getElementById("departmentsName").value;
  console.log(inputi);
  $.ajax({
          url: "http://localhost:8080/api/systemManagement/admin/deleteDep/"+inputi,
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


$("#kompletMjeket").click(function(event){
  $('#list-profile').empty();
  $('#list-profile').append("List of Doctors:");
$.ajax({
  type : "GET",
  url :  "http://localhost:8080/api/systemManagement/admin/getAllDoctors",
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function(result){
     
      var x = result.data;
      if(x != null ){
      $.each(x, function(i, item){
      
          $('#list-profile').append('<div style="display:flex; flex-direction:row">'+'<p> '+item.doctorName+'</p>'+'<p>'+item.doctorSurname+'</p>'+'<p>: '+item.personalNumber+'</p>'+'<p> - Department:'+item.departmentN+'</p>'+
          '<p> -> '+item.email+'</div>'+'</br>');
         
        console.log("Success: ", item.doctorName);
 
       });
              
       }else{
                  $('#list-profile').append('<p>'+result.errori+'</p>'+'</br>');
              }
  },
  error : function(e){
      
    $("#list-profile").html("<strong>Error</strong>");
    console.log("ERROR: ", e);
  }
   })

});  

function validateAdv(){
  var advertName = document.getElementById("emriReklames").value;
  var aPath = document.getElementById("pathReklames").value;

  if(advertName.trim() == "" || aPath.trim() == ""){
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
          url: "http://localhost:8080/api/systemManagement/admin/addAdvert/"+advertName+"/"+aPath,
          type: 'POST',
          contentType: "application/json; charset=utf-8",
          dataType: "json",
         
          success: function(res) {
              var y = res.errori;
              if (y == null) {
                alert ("Advertisement added successfully!");
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

function validate3(){
  var advertName = document.getElementById("fshijeAdvertin").value;

  if(advertName.trim() == ""){
    alert("Please fill all the inputs");
  }
}

$("#deleteReklamen").click(function(event) {
  validate3();
  event.preventDefault();
  var advertName = document.getElementById("fshijeAdvertin").value;
    console.log(advertName);
    $.ajax({
            url: "http://localhost:8080/api/systemManagement/admin/deleteDep/"+advertName,
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