// // pages/api/pusher-trigger.js

// import Pusher from "pusher";

// const pusher = new Pusher({
//   appId: "1844771",
//   key: "e95515336816303e4d45",
//   secret: "3d38e2743be3f95adc60",
//   cluster: "ap1",
//   useTLS: true,
// });

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { message } = req.body;

//     await pusher.trigger("notification-payment", "order.paid", {
//       message,
//     });

//     res.status(200).json({ success: true });
//   } else {
//     res.status(405).json({ message: "Only POST requests are allowed" });
//   }
// }
