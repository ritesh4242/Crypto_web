const coins = [
  { name: "Bitcoin", icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png", price: 3077924, change: -0.59, marketCap: 58530848340227 },
  { name: "Ethereum", icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png", price: 232022, change: -0.30, marketCap: 27951437111919 },
  { name: "Tether", icon: "https://assets.coingecko.com/coins/images/325/large/Tether.png", price: 76.38, change: 0.04, marketCap: 6318653796165 },
  { name: "BNB", icon: "bnb-bnb-logo.png", price: 31739, change: -0.25, marketCap: 5339005314048 },
  { name: "USD Coin", icon: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png", price: 76.21, change: -0.24, marketCap: 3819426693129 },
  { name: "XRP", icon: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png", price: 59.43, change: -1.19, marketCap: 2865241246756 },
  { name: "Solana", icon: "https://assets.coingecko.com/coins/images/4128/large/solana.png", price: 7751.07, change: -0.33, marketCap: 3363792651036 },
  { name: "Toncoin", icon: "toncoin-ton-logo.png", price: 565.55, change: 1.14, marketCap: 1958123456123 },
  { name: "Cardano", icon: "https://assets.coingecko.com/coins/images/975/large/cardano.png", price: 44.12, change: 0.89, marketCap: 1541234567890 },
  { name: "Dogecoin", icon: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png", price: 12.42, change: 2.31, marketCap: 1023456789012 },
  { name: "Polkadot", icon: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png", price: 504.32, change: -0.54, marketCap: 832456789012 },
  { name: "Avalanche", icon: "avalanche-avax-logo.png", price: 2456.78, change: 1.09, marketCap: 941234567890 },
  { name: "Chainlink", icon: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png", price: 1132.67, change: -1.34, marketCap: 612345678900 },
  { name: "Litecoin", icon: "https://assets.coingecko.com/coins/images/2/large/litecoin.png", price: 6832.42, change: 0.67, marketCap: 502345678901 }
];

const coinTrends = {
  "Bitcoin": [3000000, 3050000, 3100000, 3080000, 3077924],
  "Ethereum": [225000, 229000, 230000, 231000, 232022],
  "Tether": [76.20, 76.25, 76.30, 76.35, 76.38],
  "BNB": [31000, 31200, 31500, 31650, 31739],
  "USD Coin": [76.00, 76.10, 76.15, 76.18, 76.21],
  "XRP": [60.00, 60.20, 59.80, 59.60, 59.43],
  "Solana": [7600, 7650, 7700, 7725, 7751.07],
  "Toncoin": [520, 540, 550, 560, 565.55],
  "Cardano": [40, 42, 43, 44, 44.12],
  "Dogecoin": [11.8, 12.0, 12.1, 12.3, 12.42],
  "Polkadot": [500, 502, 503, 504, 504.32],
  "Avalanche": [2400, 2425, 2440, 2450, 2456.78],
  "Chainlink": [1100, 1115, 1125, 1130, 1132.67],
  "Litecoin": [6700, 6750, 6800, 6820, 6832.42]
};

const list = document.getElementById("coinList");
const searchInput = document.getElementById("searchInput");
let chart;

function displayCoins(filteredCoins) {
  list.innerHTML = "";
  filteredCoins.forEach(coin => {
    const coinDiv = document.createElement("div");
    coinDiv.className = "coin";
    const changeClass = coin.change >= 0 ? 'positive' : 'negative';
    coinDiv.innerHTML = `
      <div class="coin-left">
        <img src="${coin.icon}" alt="${coin.name}">
        <span>${coin.name}</span>
      </div>
      <div class="price">Rs.${coin.price}</div>
      <div class="change ${changeClass}">${coin.change}%</div>
      <div class="market-cap">Mkt Cap: Rs.${coin.marketCap.toLocaleString()}</div>
    `;
    coinDiv.addEventListener("click", () => showAnalysisModal(coin));
    list.appendChild(coinDiv);
  });
}

function showAnalysisModal(coin) {
  const modal = document.getElementById("analysisModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalIcon = document.getElementById("modalIcon");
  const ctx = document.getElementById("coinChart").getContext("2d");

  modalTitle.textContent = `${coin.name} Analysis`;
  modalIcon.src = coin.icon;
  modalIcon.alt = coin.name;

  const trend = coinTrends[coin.name] || [1, 2, 3, 4, 5];

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Today'],
      datasets: [{
        label: `${coin.name} Price (Rs)`,
        data: trend,
        borderColor: 'cyan',
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { ticks: { color: "#fff" } },
        x: { ticks: { color: "#fff" } }
      },
      plugins: {
        legend: { labels: { color: '#fff' } }
      }
    }
  });

  modal.style.display = "block";
}

document.querySelector(".close-btn").addEventListener("click", () => {
  document.getElementById("analysisModal").style.display = "none";
});

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = coins.filter(coin => coin.name.toLowerCase().includes(value));
  displayCoins(filtered);
});

// Initial load
displayCoins(coins);
