export interface DiscountResponse {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: Array<Discount>;
}

export interface Discount {
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
  }