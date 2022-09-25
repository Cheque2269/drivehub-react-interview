import logo from "./logo.svg";

import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { CarListItem } from "./components/CarListItem";
import { Car, CartItem } from "./models/Car";
import { Discount } from "./models/Discount";
import { ToggleButton } from "./components/ToggleButton";

function useCarList(
  sortBy: SortBy | null,
  sortDirection: SortDirection | null
) {
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

  useEffect(() => {
    if (sortBy != null) {
      setCars((cars) => {
        const direction = sortDirection ?? SortDirection.Asc;
        const newArr = [...cars];
        const directionValue = direction === SortDirection.Asc ? 1 : -1;
        newArr.sort((a, b) => {
          if (sortBy === SortBy.Price) {
            return (a.fields.price - b.fields.price) * directionValue;
          } else {
            return (
              a.fields.title.localeCompare(b.fields.title) * directionValue
            );
          }
        });
        return newArr;
      });
    }
  }, [sortBy, sortDirection]);

  return cars;
}

function useDiscounts() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);

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

function getInitCartList(): CartItem[] | (() => CartItem[]) {
  return () => {
    return JSON.parse(localStorage.getItem("item") || "[]");
  };
}

enum SortBy {
  Title,
  Price,
}

enum SortDirection {
  Asc,
  Desc,
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(getInitCartList());
  const [discountCode, setDiscountCode] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(
    null
  );
  const cars = useCarList(sortBy, sortDirection);
  const discounts = useDiscounts();

  useEffect(() => {
    window.localStorage.setItem("item", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    if (sortBy != null && sortDirection === null) {
      setSortDirection(SortDirection.Asc);
    }
  }, [sortBy]);

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
        <div className="flex flex-auto flex-col border border-gray-300 rounded-xl mx-2 pt-6">
          <div className="flex flex-row justify-between px-6 items-center">
            <div className="text-2xl font-bold">Car list</div>
            <div className="flex flex-row gap-4 flex-nowrap">
              <div className="flex flex-row rounded-xl overflow-hidden flex-nowrap">
                <ToggleButton
                  selected={sortBy === SortBy.Title}
                  onClick={() => setSortBy(SortBy.Title)}
                >
                  Title
                </ToggleButton>
                <ToggleButton
                  selected={sortBy === SortBy.Price}
                  onClick={() => setSortBy(SortBy.Price)}
                >
                  Price
                </ToggleButton>
              </div>
              <div className="flex flex-row rounded-xl overflow-hidden flex-nowrap">
                <ToggleButton
                  enabled={sortBy != null}
                  selected={sortDirection === SortDirection.Asc}
                  onClick={() => setSortDirection(SortDirection.Asc)}
                >
                  Ascending
                </ToggleButton>
                <ToggleButton
                  enabled={sortBy != null}
                  selected={sortDirection === SortDirection.Desc}
                  onClick={() => setSortDirection(SortDirection.Desc)}
                >
                  Descending
                </ToggleButton>
              </div>
            </div>
          </div>

          <div>
            {cars.map((car) => {
              return (
                <CarListItem car={car} key={car.sys.id}>
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
                </CarListItem>
              );
            })}
          </div>
        </div>
        <div className="flex flex-auto flex-col border border-gray-300 rounded-xl mx-2 pt-6">
          <div className="text-center text-2xl font-bold">Cart</div>
          <div className="flex flex-col flex-1 gap-2 items-stretch justify-start">
            {cartItems.map((car) => {
              return (
                <CarListItem car={car} key={car.sys.id}>
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
                        if (car.quantity <= 0)
                          cartItems.splice(cartItems.indexOf(car), 1);
                        setCartItems([...cartItems]);
                      }}
                    >
                      -
                    </Button>
                  </div>
                </CarListItem>
              );
            })}
          </div>
          <div className="m-4 shadow rounded-xl flex flex-col p-4">
            <div className="flex flex-row py-2 px-2">
              <div className="flex flex-auto font-bold">Total </div>
              <div>{total.toLocaleString()} THB</div>
            </div>

            <div className="flex flex-row py-2 px-2 gap-2">
              <div className="flex flex-col">
                <div className="font-bold my-2">Discount </div>
                <input
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex flex-auto border border-gray-500 px-2 py-2 rounded"
                  placeholder="enter discount code"
                />
              </div>
              <div className="flex flex-auto justify-end my-2">
                {matchedDiscount.toLocaleString()} THB
              </div>
            </div>
            <div className="flex flex-row py-2 px-2 gap-2">
              <div className="flex flex-auto font-bold">Grand total</div>
              <div className="text-xl">{grandTotal.toLocaleString()} THB</div>
            </div>
          </div>
        </div>
      </div>
      <div className="app-footer">FOOTER</div>
    </div>
  );
}

export default App;
