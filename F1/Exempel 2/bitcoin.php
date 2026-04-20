<?php 
$pageTitle = "Bitcoin";
include 'includes/header.php';
include 'includes/nav.php';
?>

<h1>Bitcoin</h1>

<section class="bitcoin-history">
    <h2>Historia</h2>
    <p>Bitcoin skapades 2008 av en person eller grupp under pseudonymen Satoshi Nakamoto. Genom publiceringen av vitboken "Bitcoin: A Peer-to-Peer Electronic Cash System" föreslogs en lösning på problemet med dubbelspendering utan behov av en centraliserad tredje part.</p>
    <p>Det första blocket, känt som "Genesis Block", minades den 3 januari 2009. Detta markerade starten på världens första fungerande blockkedja och introducerade de första 50 bitcoin i cirkulation.</p>
    <p>En av de mest kända händelserna i Bitcoins tidiga historia inträffade 2010 när en programmerare vid namn Laszlo Hanyecz köpte två pizzor för 10 000 BTC. Detta anses vara den första kommersiella transaktionen med bitcoin och firas årligen som "Bitcoin Pizza Day".</p>
    <p>Sedan dess har Bitcoin utvecklats från att vara ett experiment till att bli en etablerad tillgångsklass. Institutionella investerare har klivit in på marknaden, och regleringsutvecklingen har gått framåt i takt med att regeringar världen över försöker skapa ramverk för digitala tillgångar.</p>
</section>

<section class="bitcoin-chart-section">
    <h2>Dagens kurs i SEK</h2>
    <div id="current-price-container">Laddar pris...</div>
    <div class="chart-container" style="position: relative; height:40vh; width:100%">
        <canvas id="btcChart"></canvas>
    </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="assets/js/bitcoin-chart.js" defer></script>

<?php include 'includes/footer.php'; ?>
