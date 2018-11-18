// const AWS = require('aws-sdk');
// const dynamodb = new AWS.DynamoDB({ region: 'us-east-2', apiVersion: '2012-08-10' });

// exports.fn = (event, context, callback) => {
//   const params = {
//     Item: {
//       "UserId": {
//         S: event.userId
//       },
//       "Timestamp": {
//         S: event.timestamp
//       },
//       "GroupId": {
//         S: event.groupId
//       },
//       "Workout": {
//         L: [
//           {
//             M: {
//               "Duration": {
//                 S: event.duration
//               }
//             }
//           },
//           {
//             M: {
//               "Desc": {
//                 S: event.desc
//               }
//             }
//           }
//         ]
//       },
//       "Weight": {
//         S: event.weight
//       },
//       "Measurement": {
//         L: [
//           {
//             M: {
//               "Chest": {
//                 S: event.chest
//               }
//             }
//           },
//           {
//             M: {
//               "LeftArm": {
//                 S: event.leftArm
//               }
//             }
//           },
//           {
//             M: {
//               "RightArm": {
//                 S: event.rightArm
//               }
//             }
//           },
//           {
//             M: {
//               "Waist": {
//                 S: event.waist
//               }
//             }
//           },
//           {
//             M: {
//               "Hips": {
//                 S: event.hips
//               }
//             }
//           },
//           {
//             M: {
//               "LeftThigh": {
//                 S: event.leftThigh
//               }
//             }
//           },
//           {
//             M: {
//               "RightThigh": {
//                 S: event.rightThigh
//               }
//             }
//           }
//         ]
//       }
//     }
//     // ,
//     TableName: "balance"
//   };
//   dynamodb.putItem(params, function (err, data) {
//     if (err) {
//       console.log(err);
//       callback(err);
//     } else {
//       console.log(data);
//       callback(null, data);
//     }
//   });
// };