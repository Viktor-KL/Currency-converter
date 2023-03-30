import React from "react";

function App() {
  const USD_CURRENCY = "USD";
  const UAH_CURRENCY = "UAH";
  const EUR_CURRENCY = "EUR";

  const [targetCurrency, setTargetCurrency] = React.useState([]);
  const [baseCurrency, setBaseCurrency] = React.useState(USD_CURRENCY);
  const [targetValue, setTargetValue] = React.useState(UAH_CURRENCY);
  const [currencyOption, setCurrencyOption] = React.useState([]);
  const [currentTargetValue, setCurrentTargetValue] = React.useState("");
  const [currentValue, setCurrentValue] = React.useState("");

  const [usdPrice, setUsdPrice] = React.useState(0);
  const [eurPrice, setEurPrice] = React.useState(0);

  const SHORT_OPTIONS_LIST = currencyOption.filter(
    (option) => option === "USD" || option === "UAH" || option === "EUR"
  );

  const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
    setCurrentTargetValue(e.target.value * targetCurrency[0][1]);
  };

  const handleTargetInputChange = (e) => {
    setCurrentTargetValue(e.target.value);
    setCurrentValue(e.target.value / targetCurrency[0][1]);
  };

  const handleOnChange = (e) => {
    setBaseCurrency(e.target.value);
    fetch(
      `https://v6.exchangerate-api.com/v6/7f8c78ca3c4827bbf14d1180/pair/${e.target.value}/${targetValue}/1`
    )
      .then((res) => res.json())
      .then((json) => {
        setTargetCurrency([[json.base_code, json.conversion_rate]]);
        setCurrentTargetValue(currentValue * json.conversion_rate);
      })
      .catch((err) => {
        alert("Information not found");
      });
  };

  const handleTargetCurrencySelect = (e) => {
    setTargetValue(e.target.value);
    fetch(
      `https://v6.exchangerate-api.com/v6/7f8c78ca3c4827bbf14d1180/pair/${baseCurrency}/${e.target.value}/1`
    )
      .then((res) => res.json())
      .then((json) => {
        setTargetCurrency([[json.base_code, json.conversion_rate]]);
        setCurrentTargetValue(currentValue * json.conversion_rate);
      })
      .catch((err) => {
        alert("Information not found");
      });
  };
  React.useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/7f8c78ca3c4827bbf14d1180/pair/${baseCurrency}/${targetValue}/1`
    )
      .then((res) => res.json())
      .then((json) => {
        setTargetCurrency([[json.base_code, json.conversion_rate]]);
      })
      .catch((err) => {
        alert("Information not found");
      });

    fetch(
      `https://v6.exchangerate-api.com/v6/7f8c78ca3c4827bbf14d1180/latest/USD`
    )
      .then((res) => res.json())
      .then((json) => {
        const optionsList = Object.keys(json.conversion_rates);
        setCurrencyOption(optionsList);
      })
      .catch((err) => {
        alert("Information not found");
      });
  }, []);
  React.useEffect(() => {
    if (targetValue) {
      fetch(
        `https://v6.exchangerate-api.com/v6/7f8c78ca3c4827bbf14d1180/pair/${baseCurrency}/${targetValue}/1`
      )
        .then((res) => res.json())
        .then((json) => {
          setTargetCurrency([[json.base_code, json.conversion_rate]]);
        })
        .catch((err) => {
          alert("Information not found");
        });
    }
  }, []);
  React.useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/7f8c78ca3c4827bbf14d1180/pair/${USD_CURRENCY}/${UAH_CURRENCY}/1`
    )
      .then((res) => res.json())
      .then((json) => {
        setUsdPrice(json.conversion_rate);
      })
      .catch((err) => {
        alert("Information not found");
      });
    fetch(
      `https://v6.exchangerate-api.com/v6/7f8c78ca3c4827bbf14d1180/pair/${EUR_CURRENCY}/${UAH_CURRENCY}/1`
    )
      .then((res) => res.json())
      .then((json) => {
        setEurPrice(json.conversion_rate);
      })
      .catch((err) => {
        alert("Information not found");
      });
  }, []);

  return (
    <div className="app">
      <header className="header colorWrap">
        <h1 className="header__title">Currency Changer</h1>
        <div className="header__priceWrap">
          <p className="header__price">1 USD — {usdPrice ? usdPrice.toFixed(2) : usdPrice} UAH</p>
          <p className="header__price">1 EUR — {eurPrice ? eurPrice.toFixed(2) : eurPrice} UAH</p>
        </div>
      </header>
      <section className="colorWrap">
        <h3 className="changer__title">Start Change</h3>
        <div className="change__inputWrap">
          <div className="change__inputBlock">
            <input
              onChange={handleInputChange}
              value={currentValue}
              className="change__input"
              type="text"
              placeholder="Type something..."
            />
            <select
              onChange={handleOnChange}
              className="change__select"
              name="currency"
              id="currency"
              value={baseCurrency}
            >
              {SHORT_OPTIONS_LIST.map((item, key) => {
                return (
                  <option key={key} value={item.value}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="change__inputBlock">
            <input
              onChange={handleTargetInputChange}
              className="change__input"
              type="text"
              placeholder="Type something..."
              value={currentTargetValue}
            />
            <select
              className="change__select"
              name="currency"
              id="currency"
              value={targetValue}
              onChange={handleTargetCurrencySelect}
            >
              {SHORT_OPTIONS_LIST.map((item, key) => (
                <option key={key} value={null}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <button className="change__btn">Process to pay</button>
        </div>
      </section>
    </div>
  );
}

export default App;
