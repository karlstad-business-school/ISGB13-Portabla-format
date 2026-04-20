<?php
header('Content-Type: application/json');

$cache_file = '../tmp/btc_cache.json';
$cache_time = 60; // sekunder

// Skapa tmp-mapp om den inte finns
if (!is_dir('../tmp')) {
    mkdir('../tmp', 0777, true);
}

if (file_exists($cache_file) && (time() - filemtime($cache_file) < $cache_time)) {
    echo file_get_contents($cache_file);
    exit;
}

$url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=sek&days=1";

$options = [
    "http" => [
        "method" => "GET",
        "header" => "User-Agent: BitcoinDemoApp/1.0\r\n"
    ]
];

$context = stream_context_create($options);

try {
    $response = file_get_contents($url, false, $context);
    
    if ($response === false) {
        throw new Exception("Kunde inte hämta data från CoinGecko.");
    }

    file_put_contents($cache_file, $response);
    echo $response;

} catch (Exception $e) {
    http_response_code(502);
    echo json_encode(["error" => $e->getMessage()]);
}
