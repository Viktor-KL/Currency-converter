import React from "react";
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function Changer() {
  const currency = [
    {
      value: "usd",
      text: `USD`,
    },
    {
      value: "eur",
      text: "EUR",
    },
    {
      value: "uah",
      text: "UAH",
    },
  ];

  return (
    <section className="colorWrap">
      <h3 className="changer__title">Start Change</h3>
      <div className="change__inputWrap">
        <div className="change__inputBlock">
          <input
            className="change__input"
            type="text"
            placeholder="Type something..."
          />
          <select className="change__select" name="currency" id="currency">
            {currency.map((item, key) => (
              <option key={key} value={item.value}>{item.text}</option>
            ))}
          </select>
        </div>

        <div className="change__inputBlock">
          <input
            className="change__input"
            type="text"
            placeholder="Type something..."
          />
          <select className="change__select" name="currency" id="currency">
            {currency.map((item, key) => (
              <option key={key} value={item.value}>{item.text}</option>
            ))}
          </select>
        </div>

        <button className="change__btn">Process to pay</button>
      </div>
    </section>
  );
}
