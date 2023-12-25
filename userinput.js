document.getElementById('investmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Retrieve form data and process it
    const navValue = document.getElementById('netAssetValue').value;
    const riskTolerance = document.getElementById('riskTolerance').value;
    console.log('Net Asset Value:', navValue, 'Risk Tolerance:', riskTolerance);
    // Add additional handling as needed
});
