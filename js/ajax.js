// console.log("ajax.js loaded");


// request to insert
$(document).ready(function () {

  function showdata(){
    $.ajax({
      url:"retrieve.php",
      method: 'GET',
      success: function(data){
          console.log(data);
      }
    })
  }
  showdata();

  $("#addBtn").click(function (e) {
    e.preventDefault();
    console.log("Button clicked");
    let name = $("#name").val();
    let dg = $("#designation").val();
    let add = $("#address").val();

    // console.log(name, dg, add);

    // Split full name
    let nameParts = name.split(" ");
    let firstname = nameParts[0];
    let lastname = nameParts.slice(1).join(" ");
    // console.log(firstname, dg, lastname, add);
    mydata = {
      fname: firstname,
      lname: lastname,
      designation: dg,
      address: add,
    };
    // console.log(mydata);


    $.ajax({
      url:"insert.php",
      type: "POST",
      data: JSON.stringify(mydata),
      success: function(response){
        // console.log(response);
        $("#formId")[0].reset();
        if(response.status == "success"){
          
          msg = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Yeahhhhh! </strong>Saved successfully<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>";
          $("#msgId").html(msg);
          // alert(response.message);
        }else if (response.status === "notFilled") {
          msg = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>OOPS! </strong>You didn't give your full name or there is an empty field.<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>";
          // alert(response.message);
          $("#msgId").html(msg);
        } else if (response.status === "error") {
          msg = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>OOPS! </strong>Something is wrong...<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>";
          console.error("Server error:", response.error);
          alert("An error occurred. Check console.");
          $("#msgId").html(msg);
        }
        
      },
      error: function(xhr, status, error){
        console.error("Error occurred:", error);
      }
    });
  });
});
