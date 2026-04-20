// Logik för Bitcoin-diagram
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('btcChart').getContext('2d');
    const priceDisplay = document.getElementById('current-price-container');

    fetch('api/bitcoin-price.php')
        .then(response => {
            if (!response.ok) {
                throw new Exception("Nätverksfel vid hämtning av prisdata.");
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }

            const prices = data.prices;
            const labels = prices.map(p => {
                const date = new Date(p[0]);
                return date.getHours().toString().padStart(2, '0') + ':' + 
                       date.getMinutes().toString().padStart(2, '0');
            });
            const values = prices.map(p => p[1]);
            const lastPrice = values[values.length - 1];

            // Visa senaste priset
            priceDisplay.innerHTML = `<strong>1 BTC = ${new Intl.NumberFormat('sv-SE').format(lastPrice.toFixed(2))} SEK</strong>`;

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Bitcoin Pris (SEK)',
                        data: values,
                        borderColor: '#f7931a',
                        backgroundColor: 'rgba(247, 147, 26, 0.1)',
                        fill: true,
                        tension: 0.1,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return new Intl.NumberFormat('sv-SE').format(value) + ' kr';
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            priceDisplay.innerHTML = '<span style="color: red;">Kunde inte ladda diagramdata.</span>';
        });
});
