<?php
include('connection.php');

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$fname = $data['fname'];
$lname = $data['lname'];
$designation = $data['designation'];
$address = $data['address'];

$response = [];

if (!empty($id) && !empty($fname) && !empty($lname) && !empty($designation) && !empty($address)) {
    $sql = "UPDATE employee SET fname='$fname', lname='$lname', designation='$designation', address='$address' WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        $response = ["status" => "success", "message" => "Record updated successfully"];
    } else {
        $response = ["status" => "error", "message" => "Update failed", "error" => $conn->error];
    }
} else {
    $response = ["status" => "error", "message" => "All fields are required"];
}

echo json_encode($response);
?>
