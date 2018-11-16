export interface BalanceData{
    userId: String;
    timestamp: String;
    groupId?: String;
    workout?: [
      {
        duration?: String;
      },
      {
        desc?: String;
      }
    ],
    weight?: String;
    measurement?: [
      {
        chest?: String;
      },
      {
        leftArm?: String;
      },
      {
        rightArm?: String;
      },
      {
        waist?: String;
      },
      {
        hips?: String;
      },
      {
        leftThigh?: String;
      },
      {
        rightThigh?: String;
      }
    ]
  }