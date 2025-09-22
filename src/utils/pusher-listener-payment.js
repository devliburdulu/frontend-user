"use client"; // Ensure client-side rendering
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useSnackbar } from "notistack";

export default function PusherListenerPayment() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Enable Pusher logging - only enable during development
    // Pusher.logToConsole = process.env.NODE_ENV === "development";

    // Initialize Pusher
    const pusher = new Pusher("e95515336816303e4d45", {
      cluster: "ap1",
    });

    // Subscribe to the channel
    const channel = pusher.subscribe("notification-payment");

    // Bind to the event
    channel.bind("order.paid", function (data) {
      // Show a notification or perform some action when the event is received
      //   enqueueSnackbar(`Payment Notification: ${JSON.stringify(data.message)}`, {
      enqueueSnackbar(`Produk berhasil dibayarkan`, {
        variant: "success",
        autoHideDuration: 10000,
      });
    });

    // Cleanup on unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [enqueueSnackbar]);

  return null;
}
