// console.log("ajax.js loaded");


$(document).ready(function () {

  function showdata(){
    $("#tbody").empty(); // Prevent duplicates

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

  //insert data 
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
      dataType: "json",
      data: JSON.stringify(mydata),
      success: function(response){
        // console.log(data);
        let msg="";
        if(response.status == "success"){
          msg = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Yeahhhhh! </strong>Deleted successfully<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>";
          $("#msgId").html(msg);
          showdata();
          $(this).closest("tr").fadeOut();
        }else if(response.status == "error"){
          msg = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>OOPS! </strong>Something is wrong...<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>";
          $("#msgId").html(msg);
          
        }
        
        
      },
      error: function(xhr, status, error){
      console.error("Delete AJAX error:", error);
      $("#msgId").html("<div class='alert alert-danger'>AJAX error occurred.</div>");
      }
    })
  });

$("tbody").on("click", ".btn-edit", function () {
  const $row = $(this).closest("tr");
  const id = $(this).attr("data-id");


  const name = $row.find("td:eq(1)").text().trim(); 
  const designation = $row.find("td:eq(2)").text().trim();
  const address = $row.find("td:eq(3)").text().trim();


  const nameInput = `<input type='text' class='form-control form-control-sm' value='${name}'>`;
  const addressInput = `<input type='text' class='form-control form-control-sm' value='${address}'>`;
   const desigInput = `
    <select id="edit-designation" class="form-select form-select-sm" autocomplete="organization-title">
      <option ${designation === 'Team Lead' ? 'selected' : ''}>Team Lead</option>
      <option ${designation === 'Software Developer' ? 'selected' : ''}>Software Developer</option>
      <option ${designation === 'HR' ? 'selected' : ''}>HR</option>
    </select>
  `;
  const btns = `
    <button class='btn btn-success btn-sm btn-update' data-id='${id}'>Update</button>
    <button class='btn btn-secondary btn-sm btn-cancel'>Cancel</button>
  `


  $row.find("td:eq(1)").html(nameInput);
  $row.find("td:eq(2)").html(desigInput);
  $row.find("td:eq(3)").html(addressInput);
  $row.find("td:eq(4)").html(btns);
});

$("tbody").on("click", ".btn-cancel", function (e) {
  e.preventDefault();
  showdata(); 
});



// update button 
$("tbody").on("click", ".btn-update", function () {
  const $row = $(this).closest("tr");
  const id = $(this).attr("data-id");

  const nameVal = $row.find("td:eq(1) input").val().trim();
  const designation = $row.find("td:eq(2) select").val().trim();
  const address = $row.find("td:eq(3) input").val().trim();

  const nameParts = nameVal.split(" ");
  const fname = nameParts[0];
  const lname = nameParts.slice(1).join(" ");

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
    data: JSON.stringify(mydata),
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        showdata();
        $("#msgId").html("<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Updated! </strong>Employee updated successfully.<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>");
      } else {
        $("#msgId").html("<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>Failed to update.<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>");
      }
    },
    error: function (xhr, status, error) {
      console.error("Update AJAX error:", error);
    }
  });
});


  
});
