const apiKey = "exchangerate-api.com"; // Remplacez par votre clé API
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

document.addEventListener("DOMContentLoaded", () => {
  const sourceCurrency = document.getElementById("source-currency");
  const targetCurrency = document.getElementById("target-currency");
  const amountInput = document.getElementById("amount");
  const result = document.getElementById("result");

  // Récupérer la liste des devises
  fetch(apiUrl + "USD") // Par défaut avec USD
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data.conversion_rates);
      populateCurrencyDropdown(sourceCurrency, currencies);
      populateCurrencyDropdown(targetCurrency, currencies);
    });

  // Mettre à jour la conversion à chaque changement
  amountInput.addEventListener("input", updateConversion);
  sourceCurrency.addEventListener("change", updateConversion);
  targetCurrency.addEventListener("change", updateConversion);

  function populateCurrencyDropdown(dropdown, currencies) {
    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.textContent = currency;
      dropdown.appendChild(option);
    });
  }

  function updateConversion() {
    const source = sourceCurrency.value;
    const target = targetCurrency.value;
    const amount = parseFloat(amountInput.value);

    if (!amount || !source || !target) return;

    fetch(apiUrl + source)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.conversion_rates[target];
        const convertedAmount = (amount * rate).toFixed(2);
        result.textContent = convertedAmount;
      });
  }
});
