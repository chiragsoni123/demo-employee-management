<?php 
$servername = "localhost";
$username = "roo";
$password = "";
$database = "managmen";

// connection 
$conn = mysqli_connect($servername, $username, $password, $database);

// checking connection 
if(!$conn){
    die("Connection failed: " . mysqli_connect_error());
}else{
    echo "Connected successfully";
}
?>