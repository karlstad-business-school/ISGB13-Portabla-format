<?php // Navigeringsmeny ?>
<?php
$current_page = basename($_SERVER['PHP_SELF']);
?>
<nav>
    <ul>
        <li><a href="index.php" <?php echo ($current_page == 'index.php') ? 'class="active"' : ''; ?>>Hem</a></li>
        <li><a href="about.php" <?php echo ($current_page == 'about.php') ? 'class="active"' : ''; ?>>Om oss</a></li>
        <li><a href="contact.php" <?php echo ($current_page == 'contact.php') ? 'class="active"' : ''; ?>>Kontakt</a></li>
        <li><a href="bitcoin.php" <?php echo ($current_page == 'bitcoin.php') ? 'class="active"' : ''; ?>>Bitcoin</a></li>
    </ul>
</nav>
