import logo from "./logo.svg";

import "./App.css";
import { FC, PropsWithChildren, useEffect, useState } from "react";

export interface Car {
  metadata: Metadata;
  sys: Sys;
  fields: Fields;
}

export interface Metadata {
  tags: any[];
}

export interface Sys {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  revision: number;
  locale: string;
}

export interface Fields {
  title: string;
  price: number;
  photo: string;
}

export interface ButtonProps {
  onClick: () => void;
}

export interface CartItem extends Car {
  quantity: number;
}

export type DiscountResponse = {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: Array<{
    metadata: {
      tags: Array<any>;
    };
    sys: {
      space: {
        sys: {
          type: string;
          linkType: string;
          id: string;
        };
      };
      id: string;
      type: string;
      createdAt: string;
      updatedAt: string;
      environment: {
        sys: {
          id: string;
          type: string;
          linkType: string;
        };
      };
      revision: number;
      contentType: {
        sys: {
          type: string;
          linkType: string;
          id: string;
        };
      };
      locale: string;
    };
    fields: {
      amount: number;
      code: string;
    };
  }>;
};

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  return (
    <button
      className="bg-blue-500 px-3 py-2 hover:bg-blue-100 rounded text-white hover:text-black"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

function useCarList() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCar = async () => {
      const res = await fetch(
        "https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car",
        {
          headers: {
            Authorization: "Bearer VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o",
          },
        }
      );
      const car = await res.json();
      setCars(car.items);
    };
    fetchCar();
  }, []);

  return cars;
}

function useDiscounts() {
  const [discounts, setDiscounts] = useState<DiscountResponse["items"]>([]);

  useEffect(() => {
    const fetchDiscount = async () => {
      const res = await fetch(
        "https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=discount",
        {
          headers: {
            Authorization: "Bearer VPmo2U661gTnhMVx0pc0-CtahNg_aqS5DuneLtYfO1o",
          },
        }
      );
      const discount = await res.json();
      setDiscounts(discount.items);
    };
    fetchDiscount();
  }, []);

  return discounts;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const cars = useCarList();
  const discounts = useDiscounts();
  const matchedDiscount =
    discounts.find((d) => d.fields.code === discountCode)?.fields.amount ?? 0;
  const total = cartItems.reduce(
    (prev, cur) => prev + cur.quantity * cur.fields.price,
    0
  );
  const grandTotal = total - matchedDiscount;

  return (
    <div>
      <div className="app-header">
        <img src={logo} alt="logo"></img>
        <span>Drivehub</span>
      </div>
      <div className="flex mx-48 mt-5 mb-[100px]">
        <div className="flex-auto flex-col">
          <div className="flex-auto border-2 border-black text-center px-2 py-4">
            Car list
          </div>
          <div className="flex-auto border-2 border-black">
            {cars.map((car) => {
              return (
                <div
                  key={car.sys.id}
                  className="flex flex-row gap-4 p-6 shadow"
                >
                  <img
                    src={car.fields.photo}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex flex-col flex-1">
                    <div className="text-lg font-semibold">
                      {car.fields.title}
                    </div>
                    <div>{car.fields.price}</div>
                  </div>
                  <Button
                    onClick={() => {
                      const cartItem = cartItems.find(
                        (c) => c.sys.id === car.sys.id
                      );
                      if (cartItem) {
                        cartItem.quantity += 1;
                        setCartItems([...cartItems]);
                      } else {
                        setCartItems([...cartItems, { ...car, quantity: 1 }]);
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-auto flex-col border-2 border-black mx-2 pt-4">
          Cart
          <div className="flex flex-col flex-1 gap-2 items-stretch justify-start">
            {cartItems.map((car) => {
              return (
                <div
                  key={car.sys.id}
                  className="flex flex-row gap-4 p-6 shadow"
                >
                  <img
                    src={car.fields.photo}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex flex-col flex-1">
                    <div className="text-lg font-semibold">
                      {car.fields.title}
                    </div>
                    <div>{car.fields.price}</div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <Button
                      onClick={() => {
                        car.quantity += 1;
                        setCartItems([...cartItems]);
                      }}
                    >
                      +
                    </Button>
                    <div className="h-auto">{car.quantity}</div>
                    <Button
                      onClick={() => {
                        car.quantity -= 1;
                        setCartItems([...cartItems]);
                      }}
                    >
                      -
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t border-black">Total {total}</div>
          <div className="border-t border-black">
            Discount{" "}
            <input
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="border border-gray-500 px-3 py-2 rounded"
              placeholder="enter discount code"
            />
            {matchedDiscount}
          </div>
          <div className="border-t border-black">Grand total {grandTotal}</div>
        </div>
        {/* <div className="flex flex-col">
          {cats.map((cat) => (
            <div key={cat.name}>{cat.name}</div>
          ))}
          <button
            className="bg-blue-500 px-3 py-2 hover:bg-blue-100 rounded text-white hover:text-black"
            onClick={() => setCats([...cats, { name: "blue" + cats.length }])}
          >
            Add Cat
          </button>
        </div> */}
      </div>
      <div className="app-footer">FOOTER</div>
    </div>
  );
}

export default App;
