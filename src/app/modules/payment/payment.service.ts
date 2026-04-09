/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import { prisma } from "../../lib/prisma";
import { BookingStatus } from "@prisma/client";

const handleStripeWebhookEvent = async (event: Stripe.Event) => {
  const existingPayment = await prisma.payment.findFirst({
    where: {
      stripeEventId: event.id,
    },
  });
  if (existingPayment) {
    console.log(
      `Payment with Stripe Event ID ${event.id} already exists. Skipping processing.`,
    );
    return {
      message: `Payment with Stripe Event ID ${event.id} already exists. Skipping processing.`,
    };
  }
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const booking_Id = session.metadata?.booking_Id || null;
      const paymentId = session.metadata?.paymentId || null;

      if (!booking_Id || !paymentId) {
        console.error(
          `Missing booking_Id or paymentId in session metadata for Checkout Session ${session.id}.`,
        );
        return {
          message: `Missing booking_Id or paymentId in session metadata for Checkout Session ${session.id}.`,
        };
      }

      const booking = await prisma.booking.findUnique({
        where: {
          id: booking_Id,
        },
      });
      if (!booking) {
        console.error(
          `Booking with ID ${booking_Id} not found for Checkout Session ${session.id}.`,
        );
        return {
          message: `Booking with ID ${booking_Id} not found for Checkout Session ${session.id}.`,
        };
      }

      await prisma.$transaction(async (tx) => {
        await tx.booking.update({
          where: {
            id: booking_Id,
          },
          data: {
            status: BookingStatus.confirmed,
          },
        });

        await tx.payment.update({
          where: {
            id: paymentId,
          },
          data: {
            stripeEventId: event.id,
            paymentStatus: BookingStatus.confirmed,
            paymentGatewayData: session as any,
          },
        });
      });

      console.log(
        `process Checkout Session completed for Booking ID ${booking_Id} and Payment ID ${paymentId}.`,
      );
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`Checkout Session ${session.id} has expired.`);
      break;
    }
    case "payment_intent.payment_failed": {
      const session = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment Intent ${session.id} has failed.`);
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
      return { message: `Unhandled event type ${event.type}` };
  }
  return {
    message: `Processed event type ${event.type} processed successfully.`,
  };
};

export const paymentService = {
  handleStripeWebhookEvent,
};
