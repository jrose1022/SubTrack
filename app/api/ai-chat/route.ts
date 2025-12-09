// app/api/ai-chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body?.message) {
      return NextResponse.json({ text: "No message provided." });
    }

    const message: string = body.message.toLowerCase().trim();

    // ---------------------------
    // GREETING CHECK
    // ---------------------------
    const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"];

    if (greetings.some((g) => message === g || message.startsWith(g))) {
      return NextResponse.json({
        text: "Hello! How can I help you with your SubTrack account today?",
      });
    }

    // ---------------------------
    // ALLOWED TOPIC FILTER
    // ---------------------------
    function isAllowedMessage(text: string) {
      const allowed = [
        "subtrack",
        "hoa",
        "payment",
        "pay",
        "portal",
        "transaction",
        "due",
        "dues",
        "billing",
        "account",
        "login",
        "password",
        "statement",
        "contact",
        "email",
        "mobile",
        "receipt",
        "system error",
        "help",
        "support",
        "issue",
        "bug"
      ];
      return allowed.some((k) => text.includes(k));
    }

    if (!isAllowedMessage(message)) {
      return NextResponse.json({
        text: "❌ I can only help with SubTrack HOA payment and account-related questions.",
      });
    }

    // ---------------------------
    // FIXED RESPONSES (FAQ LOGIC)
    // ---------------------------
    function getFixedResponse(msg: string): string | null {
      if (msg.includes("unpaid") || msg.includes("balance") || msg.includes("dues")) {
        return (
          "Your current balance is shown at the top of your Dashboard. You can also check unpaid months inside the 'Statement of Account' section."
        );
      }

      if (msg.includes("receipt")) {
        return (
          "Yes! After completing the simulated payment, your payment history updates automatically and serves as your digital receipt."
        );
      }

      if (msg.includes("change") && msg.includes("password")) {
        return (
          "To change your password, go to 'Account Settings' in the profile menu. Enter your current password and your new password, then click 'Save Changes'."
        );
      }

      if (msg.includes("forgot") && msg.includes("password")) {
        return (
          "Please contact the HOA Administrator so they can reset your account password."
        );
      }

      if ((msg.includes("update") || msg.includes("change")) &&
          (msg.includes("contact") || msg.includes("email") || msg.includes("number"))) {
        return (
          "Homeowners cannot directly update contact details. Please visit the Admin office or submit a request to update your information."
        );
      }

      if (msg.includes("app") || msg.includes("mobile")) {
        return (
          "SubTrack POS is a web app. While there is no downloadable mobile app, you can access it using your phone or tablet browser."
        );
      }

      if (msg.includes("error") || msg.includes("bug") || msg.includes("system")) {
        return (
          "For system errors or bugs, please report them to the System Admin or IT support team at (Email/Contact)."
        );
      }

      return null;
    }

    const fixedResponse = getFixedResponse(message);

    if (fixedResponse) {
      return NextResponse.json({ text: fixedResponse });
    }

    // ---------------------------
    // FALLBACK
    // ---------------------------
    return NextResponse.json({
      text: "I can help with SubTrack payments, dues, login issues, and account concerns. How may I assist you?",
    });

  } catch (error: any) {
    console.error("❌ Server crashed:", error);
    return NextResponse.json({
      text: `Server crashed: ${error.message || error}`,
    });
  }
}
