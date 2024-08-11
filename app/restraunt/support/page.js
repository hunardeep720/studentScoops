
import Link from "next/link"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/Components/ui/collapsible"
import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import { Button } from "@/Components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-yellow-500 to-yellow-400">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">How can we help you?</h1>
              <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're here to provide the support you need. Browse our FAQ or submit a support request.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-yellow-500 shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Submit a request
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-18 bg-white">
        <div className="container px-4 md:px-6">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-yellow-500">
                Frequently Asked Questions
              </h2>
              <p className="text-yellow-500/80">Browse our most common questions and answers.</p>
            </div>
            <div className="space-y-4">
              <Collapsible className="space-y-2">
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-yellow-500/20 px-4 py-3 text-sm font-medium text-yellow-500 transition-colors hover:bg-yellow-500/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <span>How do I reset my password?</span>
                  <ChevronRightIcon className="h-5 w-5 text-yellow-500 transition-transform group-[data-state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pt-2 text-yellow-500/80">
                  To reset your password, go to the login page and click the "Forgot Password" link. Enter your email
                  address and we'll send you instructions to reset your password.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible className="space-y-2">
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-yellow-500/20 px-4 py-3 text-sm font-medium text-yellow-500 transition-colors hover:bg-yellow-500/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <span>How do I cancel my subscription?</span>
                  <ChevronRightIcon className="h-5 w-5 text-yellow-500 transition-transform group-[data-state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pt-2 text-yellow-500/80">
                  To cancel your subscription, log into your account and go to the Billing section. There you'll find an
                  option to cancel your subscription. If you need further assistance, please contact our support team.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible className="space-y-2">
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-yellow-500/20 px-4 py-3 text-sm font-medium text-yellow-500 transition-colors hover:bg-yellow-500/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <span>How do I update my payment information?</span>
                  <ChevronRightIcon className="h-5 w-5 text-yellow-500 transition-transform group-[data-state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pt-2 text-yellow-500/80">
                  To update your payment information, log into your account and go to the Billing section. There you'll
                  find an option to update your payment method. If you need further assistance, please contact our
                  support team.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible className="space-y-2">
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-yellow-500/20 px-4 py-3 text-sm font-medium text-yellow-500 transition-colors hover:bg-yellow-500/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <span>How do I change my email address?</span>
                  <ChevronRightIcon className="h-5 w-5 text-yellow-500 transition-transform group-[data-state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pt-2 text-yellow-500/80">
                  To change your email address, log into your account and go to the Account section. There you'll find
                  an option to update your email address. If you need further assistance, please contact our support
                  team.
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="w-full py-12 md:py-24 lg:py-10 bg-gradient-to-br from-yellow-500 to-yellow-400">
        <div className="container px-4 md:px-6">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Contact Us</h2>
              <p className="text-white/80">
                Have a question or need help? Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Name
                  </Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">
                  Message
                </Label>
                <Textarea id="message" placeholder="Enter your message" className="min-h-[120px]" />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}