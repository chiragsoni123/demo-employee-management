// console.log("ajax.js loaded");


$(document).ready(function () {

  function showdata(){
    output = "";
    $.ajax({
      url:"retrieve.php",
      method: 'GET',
      dataType: 'json',
      success: function(data){
          // console.log(data);
          if(data){
            x=data;
          }else{
            x="";
          }
          let num = 1;
          for(let i=0; i< x.length; i++){
            // console.log(x[i]);
            output += "<tr><td>"+ num + "</td><td>" + x[i].fname + " "+ 
            x[i].lname + "</td><td>" + x[i].designation + "</td><td>" + x[i].address + "</td><td> <button class='btn btn-warning btn-sm btn-edit' data-id=" + x[i].id +">Edit</button>"+" "+
            "<button class='btn btn-danger btn-sm btn-del' data-id="+x[i].id+ "> Delete</button></td></tr>";
            num++;
          }

          $("#tbody").html(output);
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
        showdata();
      },
      error: function(xhr, status, error){
        console.error("Error occurred:", error);
      },
    });
  });


  //Delete data
  $("tbody").on("click",".btn-del", function(){
    console.log("Delete button clicked");
    let id = $(this).attr("data-id");
    // console.log(id);
    mydata = {sid: id};
    mythis = this;
    $.ajax({
      url: "delete.php",
      method: "POST",
      data: JSON.stringify(mydata),
      success: function(response){
        // console.log(data);
        let msg="";
        if(response.status == "success"){
          msg = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Yeahhhhh! </strong>Deleted successfully<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>";
          $("#msgId").html(msg);
          
        }else if(response.status == "error"){
          msg = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>OOPS! </strong>Something is wrong...<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>";
          $("#msgId").html(msg);
          
        }
        showdata();
        // $(this).closest("tr").fadeOut();
      },
      error: function(xhr, status, error){
      console.error("Delete AJAX error:", error);
      $("#msgId").html("<div class='alert alert-danger'>AJAX error occurred.</div>");
      }
    })
  });


$("tbody").on("click", ".btn-edit", function () {
  const id = $(this).data("id");

  $.ajax({
    url: "edit.php",
    method: "POST",
    dataType: "JSON",
    data: JSON.stringify({ sid: id }),
    success: function (data) {
      $("#edit-id").val(data.id);
      $("#edit-name").val(data.fname + " " + data.lname);
      $("#edit-designation").val(data.designation);
      $("#edit-address").val(data.address);

      const editModal = new bootstrap.Modal(document.getElementById('editModal'));
      editModal.show();
    },
    error: function (xhr, status, error) {
      console.error("Edit AJAX error:", error);
    }
  });
});

$("#editForm").submit(function (e) {
  e.preventDefault();

  const id = $("#edit-id").val();
  const name = $("#edit-name").val().trim();
  const nameParts = name.split(" ");
  const fname = nameParts[0];
  const lname = nameParts.slice(1).join(" ");
  const designation = $("#edit-designation").val().trim();
  const address = $("#edit-address").val().trim();

  const mydata = {
    id: id,
    fname: fname,
    lname: lname,
    designation: designation,
    address: address
  };

  $.ajax({
    url: "update.php",
    method: "POST",
    dataType: "JSON",
    data: JSON.stringify(mydata),
    success: function (response) {
      let msg = "";
      console.log(response.status);
      if (response.status === "success") {
        msg = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success!</strong> Updated successfully.<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>";
        $("#msgId").html(msg);

        // const editModalInstance = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.hide();

        
      } else {
        msg = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error!</strong> " + response.message + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>";
        $("#msgId").html(msg);
      }
      showdata(); 
    },
    error: function (xhr, status, error) {
      console.error("Update AJAX error:", error);
    }
  });
});


  
});
