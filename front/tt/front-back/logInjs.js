function validate(){


    var input =document.getElementById("email").value;
    var input1 =document.getElementById("password").value;
    if(input.trim()== "" || input1.trim()==""){
        alert('please fill all the inputs');
        
    }
   
}

$("#submit").click(function(event) {
    console.log(1);
    validate();
    event.preventDefault();
    var email =document.getElementById("email").value;
    var password =document.getElementById("password").value;
    
    if(email !="" && password != ""){
    $.ajax({
        url: "http://localhost:8090/api/systemManagement/login/"+email+"/"+password,
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(res) {
                
                   var e = res.errori;
                   var m
                   // localStorage.setItem('admin')
                   if(e == null){
                       if(res.mesazhi == "Roli:1"){
                           localStorage.setItem("persoanlDoc" ,res.data.personalNumber);
                          //  var le = localStorage.getItem("persoanlDoc");
                          window.location.href="doctor.html";
                        //   alert("You are a doctor "+le);
                       }else if(res.mesazhi == "Roli:2"){
                       localStorage.setItem("persoanlPat" ,res.data.personalNumber);
                       // var le = localStorage.getItem("persoanlPat");
                       // alert("You are a patient "+le);
                       window.location.href="patient.html";

                       }else{
                    console.log(res.data);
                    window.location.href="admin.html";
                       }
                   // console.log(res.mesazhi);
                   
                   }
                   else{
                       console.log(e);
                       alert("This user doesn't exists!");
                   }
           
        }

    ,
        error: function(error) {
            console.log(error);
            
            
        }
    
    
    })
}
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