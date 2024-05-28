<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Обработка данных формы
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // Пример логики отправки письма
    $to = 'mi.gr.kul@gmail.com';
    $subject = 'Новое сообщение с формы';
    $headers = 'From: mi.gr.kul@gmail.com' . "\r\n" .
               'Reply-To: mi.gr.kul@gmail.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Не удалось отправить письмо.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Неверный метод запроса.']);
}
?>
