<?php 
include ('connection.php');

$data = stripslashes(file_get_contents("php://input"));
$mydata = json_decode($data, true);
$id = $mydata['sid'];

$response = [];

if(!empty($id)){
    $sql = "DELETE FROM employee WHERE id= {$id}";
    if($conn->query($sql) ==true){
        $response = [
            "status" => "success",
            "message" => "Deleted successfully",
            "inserted_id" => $conn->insert_id
        ];

    }else{
        $response = [
            "status" => "error",
            "message" => "Error occurred",
            "error" => $conn->error
        ];
    }
}
echo json_encode($response);
?>