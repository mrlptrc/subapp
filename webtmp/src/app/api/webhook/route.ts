import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    console.error('No stripe signature found');
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log('Received webhook event:', event.type);

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Payment successful:', session.id);
      
      // Handle successful payment
      await handleSuccessfulPayment(session);
      break;
    
    case 'customer.subscription.created':
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription created:', subscription.id);
      
      // Handle new subscription
      await handleSubscriptionCreated(subscription);
      break;
    
    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object as Stripe.Subscription;
      console.log('Subscription updated:', updatedSubscription.id);
      
      // Handle subscription changes (upgrade, downgrade, etc.)
      await handleSubscriptionUpdated(updatedSubscription);
      break;
    
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription;
      console.log('Subscription canceled:', deletedSubscription.id);
      
      // Handle subscription cancellation
      await handleSubscriptionDeleted(deletedSubscription);
      break;
    
    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      console.log('Invoice payment succeeded:', invoice.id);
      
      // Handle successful recurring payment
      await handleInvoicePaymentSucceeded(invoice);
      break;
    
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice;
      console.log('Invoice payment failed:', failedInvoice.id);
      
      // Handle failed payment
      await handleInvoicePaymentFailed(failedInvoice);
      break;
    
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// Helper functions to handle different webhook events
async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const plan = session.metadata?.plan;
  const customerEmail = session.customer_details?.email;
  
  console.log(`Payment successful for ${plan} plan by ${customerEmail}`);
  
  // Here you would typically:
  // 1. Update user's subscription status in your database
  // 2. Send confirmation email
  // 3. Grant access to premium features
  // 4. Log the transaction
  
  // Example database update (replace with your database logic):
  // await updateUserSubscription(session.customer_email, plan, 'active');
  // await sendConfirmationEmail(customerEmail, plan);
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log(`New subscription created: ${subscription.id}`);
  
  // Handle new subscription creation
  // await updateUserSubscriptionStatus(subscription.customer, 'active');
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log(`Subscription updated: ${subscription.id}, status: ${subscription.status}`);
  
  // Handle subscription changes
  // await updateUserSubscriptionStatus(subscription.customer, subscription.status);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log(`Subscription canceled: ${subscription.id}`);
  
  // Handle subscription cancellation
  // await updateUserSubscriptionStatus(subscription.customer, 'canceled');
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log(`Recurring payment succeeded for invoice: ${invoice.id}`);
  
  // Handle successful recurring payment
  // await updateUserSubscriptionStatus(invoice.customer, 'active');
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log(`Payment failed for invoice: ${invoice.id}`);
  
  // Handle failed payment
  // await notifyUserOfPaymentFailure(invoice.customer);
  // await updateUserSubscriptionStatus(invoice.customer, 'past_due');
}