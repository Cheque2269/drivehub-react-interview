export interface Car {
  metadata: {
    tags: any[];
  };
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    revision: number;
    locale: string;
  };
  fields: {
    title: string;
    price: number;
    photo: string;
  };
}

export interface CartItem extends Car {
  quantity: number;
}