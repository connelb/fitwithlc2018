// export class Address {
//     constructor(
//       public firstname?: string,
//       public lastname?: string,
//       public address?: string,
//       public city?: string,
//       public state?: string,
//       public postalcode?: string
//     ) {}
//   }

export class BalanceDataClass {
    constructor(
        public userId?: String,
        public group?:String,
        public timestamp?: Number,
        public groupId?: String,
        public duration?: String,
        public desc?: String,
        public weight?: String,
        public chest?: String,
        public leftArm?: String,
        public rightArm?: String,
        public waist?: String,
        public hips?: String,
        public leftThigh?: String,
        public rightThigh?: String
    ) {}
  }

export interface BalanceData{
    userId: String;
    group: String;
    timestamp: Number;
    groupId?: String;
    duration?: String;
    desc?: String;
    weight?: String;
    chest?: String;
    leftArm?: String;
    rightArm?: String;
    waist?: String;
    hips?: String;
    leftThigh?: String;
    rightThigh?: String;
  }[]

//   export interface BalanceData{
//     userId: String;
//     group: String;
//     timestamp: String;
//     groupId?: String;
//     workout?: [
//       {
//         duration?: String;
//       },
//       {
//         desc?: String;
//       }
//     ],
//     weight?: String;
//     measurement?: [
//       {
//         chest?: String;
//       },
//       {
//         leftArm?: String;
//       },
//       {
//         rightArm?: String;
//       },
//       {
//         waist?: String;
//       },
//       {
//         hips?: String;
//       },
//       {
//         leftThigh?: String;
//       },
//       {
//         rightThigh?: String;
//       }
//     ]
//   }

  export interface BalanceData1{
    // userId: String;
    timestamp: Number;
    group: String;
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

//   [Show/hide message details.] XHRPOST
//   https://8no7onyzd9.execute-api.us-east-2.amazonaws.com/dev/api
//   [HTTP/2.0 200 OK 539ms]
  
      
 
//   groupId	
//   measurement	[…]
//   0	{…}
//   chest	
//   1	{…}
//   leftArm	
//   2	{…}
//   rightArm	
//   3	{…}
//   waist	
//   4	{…}
//   hips	
//   5	{…}
//   leftThigh	
//   6	{…}
//   rightThigh	
//   timestamp	Wed Nov 14 2018 00:00:00 GMT-0600 (CST)
//   weight	
//   workout	[…]
//   0	{…}
//   duration	
//   1	{…}
//   desc	