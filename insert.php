<?php 
include('connection.php');

// Set content type to JSON
header('Content-Type: application/json');

$data = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);

$fname = $mydata['fname'];
$lname = $mydata['lname'];
$address = $mydata['address'];
$designation = $mydata['designation'];

$response = [];

if (!empty($fname) && !empty($lname) && !empty($address) && !empty($designation)) {
    $sql = "INSERT INTO employee (fname, lname, address, designation) VALUES ('$fname', '$lname', '$address', '$designation')";
    if ($conn->query($sql) === true) {
        $response = [
            "status" => "success",
            "message" => "Saved successfully",
            "inserted_id" => $conn->insert_id
        ];
    } else {
        $response = [
            "status" => "error",
            "message" => "Error occurred",
            "error" => $conn->error
        ];
    }
} else {
    $response = [
        "status" => "notFilled",
        "message" => "Fill all the fields"
    ];
}

echo json_encode($response);
?>
