console.log("ajax.js loaded");


// request to insert
$(document).ready(function () {
  $("#addBtn").click(function (e) {
    e.preventDefault();
    console.log("Button clicked");
    let name = $("#name").val();
    let dg = $("#designation").val();
    let add = $("#address").val();

    console.log(name, dg, add);

    // // Split full name
    // let nameParts = name.split(" ");
    // let firstname = nameParts[0];
    // let lastname = nameParts.slice(1).join(" ");
    // // console.log(firstname, lastname);
    // console.log(firstname, designation, lastname, address);
    // mydata = {
    //   fname: firstname,
    //   lname: lastname,
    //   designation: dg,
    //   address: add,
    // };
    // console.log(mydata);
  });
});
