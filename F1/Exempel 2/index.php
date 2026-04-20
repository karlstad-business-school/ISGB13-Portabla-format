<?php 
$pageTitle = "Hem";
include 'includes/header.php';
include 'includes/nav.php';
?>

<section class="hero">
    <h1>Välkommen till Bitcoin Projektet</h1>
    <p>Här kan du lära dig mer om Bitcoin, följa priser och komma i kontakt med oss. Utforska våra olika sektioner nedan.</p>
</section>

<div class="card-container">
    <a href="about.php" class="card">
        <h3>Om oss</h3>
        <p>Läs mer om vilka vi är och vad syftet med denna webbplats är.</p>
    </a>
    <a href="contact.php" class="card">
        <h3>Kontakt</h3>
        <p>Har du frågor? Tveka inte att skicka ett meddelande till oss via vårt formulär.</p>
    </a>
    <a href="bitcoin.php" class="card">
        <h3>Bitcoin</h3>
        <p>Se aktuella Bitcoin-priser och teknisk information i realtid.</p>
    </a>
</div>

<?php include 'includes/footer.php'; ?>
