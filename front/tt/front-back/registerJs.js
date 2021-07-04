function validate(){
    
    var input1 =document.getElementById("input1").value;
    var input2=document.getElementById("input2").value;
    var input3 =document.getElementById("input3").value;
    var input4 =document.getElementById("input4").value;
    var input5 =document.getElementById("input5").value;
    var input6 =document.getElementById("input6").value;
    var input7 =document.getElementById("opsioni").value;
    var input8 =document.getElementById("input8").value;

  
 

 
   if(document.getElementById("doctor").checked == false && document.getElementById("patient").checked == false){
     // alert("Please fill all your inputs");

    }
    else if(document.getElementById("doctor").checked == true){
    if(input1.trim()== "" || input2.trim()=="" || input3.trim()=="" || input4.trim()=="" || input5.trim()==""
    || input6.trim()=="" || opsioni =="" || input8.trim()==""){
        alert('please fill all the inputs needed for the Doctor');
        
    }else {
        if(input5 === input6){
        register = {
            
             name:$("#input1").val(),
             surname:$("#input2").val(),
             email:$("#input4").val(),
             password: $("#input5").val(),
             role: $("#doctor").val(),
             personalNumber: $("#input3").val(),
             departmentD: localStorage.getItem("departamnetiDropBox"),
             specializationD: $("#input8").val()
    
          
        }
         }
         else{
             alert("Two passwords should match up!");
         }
    }
   }else if(document.getElementById("patient").checked == true){
    if(input1.trim()== "" || input2.trim()=="" || input3.trim()=="" || input4.trim()=="" || input5.trim()==""
    || input6.trim()==""){
        alert("please fill all the inputs needed for the Patient");
    }else {
        if(input5 === input6){
        register = {
            // id:$("#profid").val(),
             name:$("#input1").val(),
             surname:$("#input2").val(),
             email:$("#input4").val(),
             password: $("#input5").val(),
             role: $("#patient").val(),
             personalNumber: $("#input3").val(),
             departmentD: $("#input7").val(),
             specializationD: $("#input8").val()
    
            
        }
         }
         else{
            alert("Two passwords should match up!");
        }
    }

   }//else if(input6.trim() == input5.trim()){
      // alert("Passwords doesn't match!");
   //}

   //DUHET ME SHTU KRAHASIMIN MES DY PASSWORD-ave
   
}

$(document).on('click', '#opsioni', function(event) {
    var vlera = $(this).text();
    localStorage.setItem("departamnetiDropBox", vlera);
   

    // alert(vleraDuhur[2]);
});
register = {
    // id:$("#profid").val(),
     name:"",
     surname:"",
     email:"",
     password: "",
     role: "",
     personalNumber: "",
     departmentD: "",
     specializationD: ""

 
 }

$("#submit2").click(function(event) {
    console.log(1);
    validate();
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8090/api/systemManagement/registerUser",
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(register),
        success: function(res) {
                   var e = res.errori;       
                   if(e == null){
                       if(res.mesazhi == "Roli:1"){
                          localStorage.setItem('doctor', JSON.stringify(res.data))
                          localStorage.setItem("persoanlDoc" ,res.data.personalNumber);

                        //  var le = localStorage.getItem("persoanlDoc");
                        //   alert("You are a doctor");
                           window.location.href="doctor.html";
                       }else if(res.mesazhi == "Roli:2"){
                       localStorage.setItem('patient', JSON.stringify(res.data))
                       localStorage.setItem("persoanlPat" ,res.data.personalNumber);
                       // var le = localStorage.getItem("persoanlPat");
                       // alert("You are a patient "+le);
                       window.location.href="patient.html";
                       }
                
                    }
                    else {
                        alert(e);
                        
                    }
           
        },
        error:function(error) {
            console.log(error);
            
            
        }
    
    
    })

});

function footeriMedNotes(){
    $.ajax({
      type : "GET",
      url :  "http://localhost:8090/api/systemManagement/admin/getClinic",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(result){
         
          var x = result.data;
          if(x != null ){
            document.getElementById("emailiKlinikes").innerHTML = "Email: "+result.data.email;
            document.getElementById("telefoniKlinikes").innerHTML ="Phone: "+result.data.phone ;
            document.getElementById("adresaKlinikes").innerHTML = result.data.adrres;
            document.getElementById("nrPartKlinikes").innerHTML = "Number of partners: "+result.data.partners;
        
             
             
              
             
            console.log("Success: ", result.data);
          
           }
      },
      error : function(e){
          
        $("#hapsiraInfoKlinikes").html("<strong>Error</strong>");
        console.log("ERROR: ", e);
      }
       })
  
    }

    function dropBoxDepartamenti(){
        $.ajax({
            type : "GET",
            url :  "http://localhost:8090/api/systemManagement/admin/getAllDep",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(result){
               
                var y = result.data;
                if(y != null ){
                    $.each(y, function(i, item) {
                        if(item != null){
                  //if(item.depId == depNumber){
                  //  alert("erdh kerksa");
                  $("#doctorss").append('<option id="opsioni" >' + item.depName + "</option>");
                  
                        }

                  //}
              });
                
                 }
            },
            error : function(e){
                
              $("#hapsiraInfoKlinikes").html("<strong>Error</strong>");
              console.log("ERROR: ", e);
            }
             })
    }