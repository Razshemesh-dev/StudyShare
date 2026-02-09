<?php
$server_name = "127.0.0.1";
$user_name = "israzshe_mip";
$password = "314159!!!!!!!!!";
$database_name = "israzshe_join_team_requests";

// Create connection
$conn = new mysqli($server_name, $user_name, $password, $database_name);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get info from HTML form
$full_name = $_POST['full_name'] ?? null;
$email_adress = $_POST['email_adress'] ?? null;
$interest_area = $_POST['interest_area'] ?? null;
$about_you = $_POST['about_you'] ?? null;
$type_of_degree = $_POST['type_of_degree'] ?? null;
$degree_title = $_POST['degree_title'] ?? null;
$hours_per_week = $_POST['hours_per_week'] ?? null;

if ($full_name && $email_adress && $interest_area && $about_you && $type_of_degree && $degree_title && $hours_per_week) {
    $sql = "INSERT INTO join_team_requests (full_name, email_adress, interest_area, about_you, type_of_degree, degree_title, hours_per_week) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("ssssssi", $full_name, $email_adress, $interest_area, $about_you, $type_of_degree, $degree_title, $hours_per_week);

        if ($stmt->execute()) {
            header("Location: http://localhost:3000/");
            exit();
        } else {
            echo "Error: " . $stmt->error;
            exit();
        }
    } else {
        echo "Error: " . $conn->error;
        exit();
    }
} else {
    echo "Error: All fields are required";
    exit();
}

$conn->close();
?>
