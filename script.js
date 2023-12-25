// Financial Modeling Prep API Key
const apiKey = 'irQKUNA8SiGwKEhD7tKybA3bO9w3Pei9'; 

// Array of stock codes
const stockCodes = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'BRK.A', 'V', 'JNJ', 'WMT', 'JPM', 'MA', 'PG', 'UNH', 'DIS', 'NVDA', 'HD', 'PYPL', 'BAC', 'CMCSA'];

// Function to fetch stock data from Financial Modeling Prep
async function fetchStockData(stockCode) {
    const url = `https://financialmodelingprep.com/api/v3/quote/${stockCode}?apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Error fetching stock data:', response.status);
            return null;
        }
        const data = await response.json();
        const stockInfo = data[0]; // Assuming the first item in the array is the stock data

        return {
            code: stockCode,
            open: stockInfo.open,
            high: stockInfo.dayHigh,
            low: stockInfo.dayLow,
            close: stockInfo.price,
            volume: stockInfo.volume,
            trend: stockInfo.change >= 0 ? 'up' : 'down'
        };
    } catch (error) {
        console.error('Error fetching stock data for', stockCode, ':', error);
        return null;
    }
}





// Function to format the trend as a stylized arrow with color
function formatTrend(trend) {
    let arrowHtml;
    if (trend === 'up') {
        arrowHtml = `<span style="color: green;">&uarr;</span>`; // Up arrow in green
    } else {
        arrowHtml = `<span style="color: red;">&darr;</span>`; // Down arrow in red
    }
    return arrowHtml;
}

// Function to update the stock data table
function updateStockDataTable(stockData) {
    const tableBody = document.getElementById('stockData').getElementsByTagName('tbody')[0];

    stockData.forEach(stock => {
        if (stock) {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${stock.code}</td>
                <td>${stock.open ? stock.open.toFixed(2) : 'N/A'}</td>
                <td>${stock.high ? stock.high.toFixed(2) : 'N/A'}</td>
                <td>${stock.low ? stock.low.toFixed(2) : 'N/A'}</td>
                <td>${stock.close ? stock.close.toFixed(2) : 'N/A'}</td>
                <td>${stock.volume ? stock.volume.toLocaleString() : 'N/A'}</td>
                <td>${formatTrend(stock.trend)}</td>
            `;
        }
    });
}

// Function to fetch data for all stocks and update the table
async function fetchAndUpdateAllStocks() {
    const allStockData = await Promise.all(stockCodes.map(code => fetchStockData(code)));
    updateStockDataTable(allStockData);
}

// Fetch and display data for all stocks
fetchAndUpdateAllStocks();

// Get the modal elements
var loginModal = document.getElementById('loginModal');
var createAccountModal = document.getElementById('createAccountModal');

// Get the button that opens the modal
var loginBtn = document.getElementById('login');
var createAccountBtn = document.getElementById('createAccount');

// Get the <span> elements that close the modal
var spans = document.getElementsByClassName('close');

// When the user clicks the button, open the modal 
loginBtn.onclick = function() {
    loginModal.style.display = 'block';
}

createAccountBtn.onclick = function() {
    createAccountModal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
for (var i = 0; i < spans.length; i++) {
    spans[i].onclick = function() {
        loginModal.style.display = 'none';
        createAccountModal.style.display = 'none';
    }
}

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    if (event.target === loginModal || event.target === createAccountModal) {
        loginModal.style.display = 'none';
        createAccountModal.style.display = 'none';
    }
}

// Event handler for the login button to redirect to the login page
var loginBtn = document.getElementById('login');
loginBtn.addEventListener('click', function() {
    window.location.href = 'login.html'; // Redirect to the login view
});