import React, { useState } from "react";
import { menu } from "../Data";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const menuItems = menu.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    img: item.img,
  }));

  const handleAddToCart = (name, price) => {
    console.log(`Added ${name} to cart with price $${price.toFixed(2)}`);

    const newItem = { name, price };
    setCart([...cart, newItem]);

    const newTotal = totalBill + price;
    setTotalBill(newTotal);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handlePrint = () => {
    const printStyle = `
      <style>
        @media print {
          body * {
            visibility: hidden;
          }
          .bill-section, .bill-section * {
            visibility: visible;
          }
          .bill-section {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      </style>
    `;

    const printContent = document.querySelector('.bill-section').innerHTML;
    const newWindow = window.open('', '', 'height=600,width=800');
    newWindow.document.write('<html><head><title>Print</title>');
    newWindow.document.write(printStyle);
    newWindow.document.write('</head><body >');
    newWindow.document.write(printContent);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Bill Details", 10, 10);
    doc.setFontSize(12);

    let y = 20;
    cart.forEach((item) => {
      doc.text(`${item.name} - $${item.price.toFixed(2)}`, 10, y);
      y += 10;
    });

    doc.text(`Total: $${totalBill.toFixed(2)}`, 10, y);
    doc.save('bill.pdf');
  };

  return (
    <>
      <section className="menu" id="menu">
        <h1 className="heading">
          our <span>menu</span>
          <button
            className="btn"
            onClick={toggleDropdown}
            style={{ marginLeft: '100px', display: 'flex' }}
          >
            Show Cart
          </button>

          {isDropdownVisible && (
            <section className="bill-section">
              <h2>All Bill here</h2>
              <p>Total: ${totalBill.toFixed(2)}</p>

              <div>
                <h3>Items in Cart:</h3>
                <ul>
                  {cart.map((item, index) => (
                    <li key={index}>
                      {item.name} - ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
                <div>
                  <button onClick={handlePrint} className="btn">Print Bill</button>
                  <button onClick={handleDownload} style={{ marginLeft: '10px' }} className="btn">Download Bill</button>
                </div>
              </div>
            </section>
          )}
        </h1>

        <div className="box-container">
          {menuItems.map((menuItem, index) => (
            <div className="box" key={index}>
              <img src={menuItem.img} alt={menuItem.name} />
              <h3>{menuItem.name}</h3>
              <div className="price">
                ${menuItem.price.toFixed(2)}
              </div>
              <button
                className="btn"
                onClick={() => handleAddToCart(menuItem.name, menuItem.price)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .bill-section, .bill-section * {
              visibility: visible;
            }
            .bill-section {
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        `}
      </style>
    </>
  );
};

export default Menu;
