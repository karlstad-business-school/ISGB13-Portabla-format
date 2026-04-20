Skapa bitcoin.php. Sätt $pageTitle = "Bitcoin", inkludera header.php och nav.php.
Innehåll:
- <h1>Bitcoin</h1>
- Sektion "Historia" med 3–4 stycken som täcker: Satoshi Nakamoto och 
  whitepaper 2008, första blocket 2009, pizza-transaktionen 2010, 
  etableringen som tillgångsklass och regleringsutveckling.
- Sektion "Dagens kurs i SEK" med en <canvas id="btcChart">-container 
  och en <div> som visar aktuellt pris.
- Lägg in <script src="/assets/js/bitcoin-chart.js" defer></script> 
  före footer.php-inkluderingen.
- Ladda Chart.js via CDN: 
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
Inkludera footer.php.

Skapa api/bitcoin-price.php. Den ska fungera som en proxy som:

1. Sätter header Content-Type: application/json.
2. Anropar CoinGecko-endpointen:
   https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=sek&days=1
   med file_get_contents eller cURL.
3. Cachear resultatet i en lokal fil (t.ex. /tmp/btc_cache.json) i 60 sekunder 
   för att undvika rate limits.
4. Returnerar JSON-svaret oförändrat till klienten.
5. Vid fel: returnerar {"error": "..."} med HTTP-status 502.

Sätt en User-Agent-header i anropet. Hantera undantag snyggt.

Fyll i assets/js/bitcoin-chart.js:

1. Hämta data från /api/bitcoin-price.php med fetch().
2. Datan kommer i formatet { prices: [[timestamp, price], ...] }.
3. Mappa om till labels (HH:MM från timestamp) och värden (pris i SEK).
4. Rita en line chart i <canvas id="btcChart"> med Chart.js:
   - Linjefärg: orange (#f7931a, bitcoin-orangen)
   - Fylld area under linjen med låg opacitet
   - Y-axel formaterad som SEK
   - Responsive: true
5. Visa senaste priset i elementet som togs fram i bitcoin.php 
   (t.ex. "1 BTC = 612 345 SEK").
6. Om fetch misslyckas: visa felmeddelande i canvas-området.

