import React from "react";

export default function () {
  return (
    <header className="header colorWrap">
      <h1 className="header__title">Currency Changer</h1>
      <div className="header__priceWrap">
        <p className="header__price">1 USD / 37 UAH</p>
        <p className="header__price">1 EUR / 40 UAH</p>
      </div>
    </header>
  );
}
