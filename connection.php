<?php 
$servername = "localhost";
$username = "root";
$password = "Chirag_123"; //reove the password
$database = "managment";

// connection 
$conn = mysqli_connect($servername, $username, $password, $database);

// checking connection 
if(!$conn){
    die("Connection failed: " . mysqli_connect_error());
}
?>