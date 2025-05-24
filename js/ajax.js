// request to insert
$("#addBtn").click(function(e){
    e.preventDefault();
    let name = $("#name").val();
    let designation = $("#designation").val();
    let address = $("#address").val();

    // Split full name
    let nameParts = name.split(" ");
    let fname = nameParts[0]; 
    let lname = nameParts.slice(1).join(" ");

    // console.log(fname, designation,lname, address);
    
})