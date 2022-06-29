declare namespace Express {
  export interface Request {
    user: {
      id: string;
      enterprise: {
        id: string;
      };
    };
  }
}
