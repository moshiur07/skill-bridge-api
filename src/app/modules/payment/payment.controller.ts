import { Request, Response } from "express";
import catchAsync from "../../../helper/controllerHandler";
import { envVars } from "../../../config/env";
import status from "http-status";
import { stripe } from "../../../config/stripe.config";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../../helper/sendResponse";

const handleStripeWebhookEvent = catchAsync(
  async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"];
    const webHookSecret = envVars.STRIPE_WEBHOOK_SECRET;
    if (!signature || !webHookSecret) {
      console.error("Missing Stripe signature or webhook secret.");
      return res.status(status.BAD_REQUEST).json({
        message: "Missing Stripe signature or webhook secret.",
      });
    }
    let event;
    try {
      event = stripe.webhooks.constructEventAsync(
        req.body,
        signature,
        webHookSecret,
      );
    } catch (err) {
      console.error("Error verifying Stripe webhook signature:", err);
      return res.status(status.BAD_REQUEST).json({
        message: "Error verifying Stripe webhook signature.",
      });
    }

    try {
      const result = await paymentService.handleStripeWebhookEvent(await event);
      sendResponse(res, {
        httpStatus: status.OK,
        success: true,
        message: `Stripe webhook event of type ${event} processed successfully.`,
        data: result,
      });
    } catch (error) {
      console.error("Error processing Stripe webhook event:", error);
      sendResponse(res, {
        httpStatus: status.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Error processing Stripe webhook event.",
      });
    }
  },
);
export const paymentController = {
  handleStripeWebhookEvent,
};
