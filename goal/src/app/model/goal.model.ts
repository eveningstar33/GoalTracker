export class Goal {
    constructor(
      public id: number,
      public description: string,
      public done: boolean,
      public targetDate: Date
    ) {
  
    }
  }