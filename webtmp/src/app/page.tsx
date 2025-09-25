import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StripeCheckout } from "@/components/stripe-checkout";
import React from "react";

export default function Home() {

  const handleScrollToPricing = (id: string) => {
    const pricingSection = document.getElementById("pricing-section");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center">
        <div className="container mx-auto px-6 py-20 grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
              New • Subapp Starter
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Build faster with a clean Next.js + shadcn UI foundation
            </h1>
            <p className="text-muted-foreground max-w-prose">
              A minimal, extensible starter with auth pages and a dashboard.
              Use pre-built components to ship your product quickly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/register">Get started</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="#pricing-section">View Pricing</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/dashboard">View dashboard</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Image src="/globe.svg" alt="Globe" width={18} height={18} />
                <span>Next.js App Router</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/window.svg" alt="UI" width={18} height={18} />
                <span>shadcn/ui Components</span>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent rounded-3xl blur-2xl" />
            <Card className="relative">
              <CardHeader>
                <CardTitle>Clean, modern UI</CardTitle>
                <CardDescription>Composable primitives and sensible defaults</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full rounded-lg border bg-muted/30 flex items-center justify-center">
                  <Image src="/window.svg" alt="Preview" width={64} height={64} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Auth-ready</CardTitle>
              <CardDescription>Login, register, and dashboard pages scaffolded</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Start from a working base and customize to your needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessible UI</CardTitle>
              <CardDescription>Built on Radix + Tailwind</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Consistent, accessible components via shadcn/ui.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Type-safe</CardTitle>
              <CardDescription>First-class TypeScript DX</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Strong typing, editor hints, and maintainable code.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="pricing-section" className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Choose your plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with our monthly plan or go lifetime for the best value
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <Card className="relative">
            <CardHeader className="text-center pb-8">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Most Popular
              </div>
              <CardTitle className="text-2xl">Monthly</CardTitle>
              <CardDescription className="text-base">
                Perfect for getting started
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">BRL 2,99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Full access to all features</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Regular updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Cancel anytime</span>
                </li>
              </ul>
              <StripeCheckout 
                priceId="price_monthly_brl" 
                mode="subscription"
                className="w-full"
              >
                Start Monthly Plan
              </StripeCheckout>
              <p className="text-xs text-muted-foreground text-center">
                Billed monthly • Cancel anytime
              </p>
            </CardContent>
          </Card>

          <Card className="relative border-primary">
            <CardHeader className="text-center pb-8">
              <Badge variant="secondary" className="mb-4">
                Best Value
              </Badge>
              <CardTitle className="text-2xl">Lifetime</CardTitle>
              <CardDescription className="text-base">
                One-time payment, forever access
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">BRL 29,99</span>
                <span className="text-muted-foreground">/once</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Everything in Monthly</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Lifetime access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">No recurring charges</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Future updates included</span>
                </li>
              </ul>
              <StripeCheckout 
                priceId="price_lifetime_brl" 
                mode="payment"
                className="w-full"
              >
                Get Lifetime Access
              </StripeCheckout>
              <p className="text-xs text-muted-foreground text-center">
                One-time payment • No recurring charges
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I switch between plans?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade from Monthly to Lifetime at any time. 
                  We'll apply your previous payments as credit toward the lifetime plan.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major credit cards, debit cards, and PIX payments 
                  through our secure Stripe integration.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a money-back guarantee?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! We offer a 30-day money-back guarantee for both plans. 
                  If you're not satisfied, contact us for a full refund.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
    <section className="border-t">
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Ready to build?</h2>
            <p className="text-muted-foreground">Create your account and start shipping today.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/register">Create account</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/login">I have an account</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
