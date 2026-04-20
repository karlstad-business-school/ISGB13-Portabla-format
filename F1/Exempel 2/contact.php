<?php 
session_start();
$pageTitle = "Kontakt";

// Generera CSRF-token om den inte finns
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$errors = [];
$successMessage = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validera CSRF-token
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        die("Ogiltig CSRF-token.");
    }

    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name)) $errors[] = "Namn är obligatoriskt.";
    if (empty($email)) {
        $errors[] = "E-post är obligatoriskt.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Ogiltig e-postadress.";
    }
    if (empty($message)) $errors[] = "Meddelande är obligatoriskt.";

    if (empty($errors)) {
        // TODO: Koppla in mail() här för att faktiskt skicka meddelandet
        // mail("admin@example.com", "Kontakt från $name", $message, "From: $email");
        
        $successMessage = "Tack för ditt meddelande, " . htmlspecialchars($name) . "! Vi återkommer så snart vi kan.";
        // Rensa formuläret vid framgång
        $name = $email = $message = "";
    }
}

include 'includes/header.php';
include 'includes/nav.php';
?>

<h1>Kontakta oss</h1>

<?php if (!empty($errors)): ?>
    <div class="error-box">
        <ul>
            <?php foreach ($errors as $error): ?>
                <li><?php echo htmlspecialchars($error); ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<?php if ($successMessage): ?>
    <div class="success-box">
        <?php echo htmlspecialchars($successMessage); ?>
    </div>
<?php endif; ?>

<form action="contact.php" method="post" class="contact-form">
    <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
    
    <div class="form-group">
        <label for="name">Namn:</label>
        <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($name ?? ''); ?>" required>
    </div>

    <div class="form-group">
        <label for="email">E-post:</label>
        <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($email ?? ''); ?>" required>
    </div>

    <div class="form-group">
        <label for="message">Meddelande:</label>
        <textarea id="message" name="message" rows="5" required><?php echo htmlspecialchars($message ?? ''); ?></textarea>
    </div>

    <button type="submit" class="btn">Skicka meddelande</button>
</form>

<?php include 'includes/footer.php'; ?>
