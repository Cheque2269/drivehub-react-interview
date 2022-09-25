import { FC, PropsWithChildren } from "react";
import { Car } from "../models/Car";

export interface CarListProps {
  car: Car
}

export const CarListItem: FC<PropsWithChildren<CarListProps>> = ({car, children}) => {
  return (
      <div key={car.sys.id} className="flex flex-row gap-4 p-6 hover:shadow-xl shadow transition-all items-center">
        <img src={car.fields.photo} className="w-20 h-20 object-cover flex-shrink-0 rounded-lg" />
        <div className="flex flex-col flex-1 justify-center">
          <div className="text-xl font-bold">{car.fields.title}</div>
          <div className="text-gray-700">{car.fields.price.toLocaleString()} THB/day</div>
        </div>
        {children}
      </div>
  );
};