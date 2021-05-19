function validate(){
    
    var input1 =document.getElementById("input1").value;
    var input2=document.getElementById("input2").value;
    var input3 =document.getElementById("input3").value;
    var input4 =document.getElementById("input4").value;
    var input5 =document.getElementById("input5").value;
    var input6 =document.getElementById("input6").value;
    var input7 =document.getElementById("input7").value;
    var input8 =document.getElementById("input8").value;

  
 

 
   if(document.getElementById("doctor").checked == false && document.getElementById("patient").checked == false){
     // alert("Please fill all your inputs");

    }
    else if(document.getElementById("doctor").checked == true){
    if(input1.trim()== "" || input2.trim()=="" || input3.trim()=="" || input4.trim()=="" || input5.trim()==""
    || input6.trim()=="" || input7.trim()=="" || input8.trim()==""){
        alert('please fill all the inputs needed for the Doctor');
        
    }else {
        register = {
            
             name:$("#input1").val(),
             surname:$("#input2").val(),
             email:$("#input4").val(),
             password: $("#input5").val(),
             role: $("#doctor").val(),
             personalNumber: $("#input3").val(),
             departmentD: $("#input7").val(),
             specializationD: $("#input8").val()
    
            
         
         }
    }
   }else if(document.getElementById("patient").checked == true){
    if(input1.trim()== "" || input2.trim()=="" || input3.trim()=="" || input4.trim()=="" || input5.trim()==""
    || input6.trim()==""){
        alert("please fill all the inputs needed for the Patient");
    }else {
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

   }//else if(input6.trim() == input5.trim()){
      // alert("Passwords doesn't match!");
   //}

   //DUHET ME SHTU KRAHASIMIN MES DY PASSWORD-ave
   
}
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

$("#submit").click(function(e) {
    console.log(1);
    validate();
    e.preventDefault();
 
     

    $.ajax({
        url: "http://localhost:8080/api/systemManagement/registerUser",
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(register),
        success: function(res) {
                
                   var e = res.errori;       
                   if(e == null){
                       if(res.mesazhi == "Roli:1"){
                          localStorage.setItem('doctor', JSON.stringify(res.data))
                           alert("You are a doctor");
                       }else if(res.mesazhi == "Roli:2"){
                       localStorage.setItem('patient', JSON.stringify(res.data))
                        alert("You are a patient");
                       }
                   
                   
                  
                    }
                    else {
                        alert(e);
                        console.log(e);
                    }
           
        },
        error:function(error) {
            console.log(error);
            
            
        }
    
    
    })

});