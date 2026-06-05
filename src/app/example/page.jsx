"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsappButton from "@/components/shared/WhatsappButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

const ExamplePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [classType, setClassType] = useState("");
  const [instructor, setInstructor] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  // Calendar states
  const [selectedDate, setSelectedDate] = useState();
  const [dateRange, setDateRange] = useState();
  const [multipleDate, setMultipleDate] = useState([]);

  // Calculate date 30 days from now
  const thirtyDaysFromNow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  }, []);

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* WhatsApp Floating Button */}
      <WhatsappButton />

      {/* Main Content - Add padding-top to account for fixed header */}
      <div className="pt-20 md:pt-24">
        <div className="space-y-8 p-8">
          <section className="space-y-4">
            <h1 className="text-3xl font-bold">Shadcn UI Component Examples</h1>

            {/* Header Component Info */}
            <div className="bg-primary/10 border-primary/20 rounded-lg border p-4">
              <h2 className="mb-2 text-xl font-semibold">Header Component</h2>
              <p className="text-muted-foreground text-sm">
                The header is now visible at the top of this page. It features:
              </p>
              <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Fixed positioning with scroll effects</li>
                <li>Responsive design (mobile hamburger menu)</li>
                <li>Logo with hover animation</li>
                <li>Navigation with active state indicators</li>
                <li>Phone number with call-to-action</li>
                <li>Mobile menu with full contact information</li>
              </ul>
            </div>

            {/* Footer Component Info */}
            <div className="bg-secondary/10 border-secondary/20 rounded-lg border p-4">
              <h2 className="mb-2 text-xl font-semibold">Footer Component</h2>
              <p className="text-muted-foreground text-sm">
                The footer is visible at the bottom of this page. It includes:
              </p>
              <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
                <li>
                  4-column responsive layout (logo, service info,
                  schedule/location, social media)
                </li>
                <li>Navigation links with hover effects</li>
                <li>Phone contact with icon</li>
                <li>Business hours and address</li>
                <li>Instagram social link</li>
                <li>Legal links (horizontal on desktop, vertical on mobile)</li>
                <li>Copyright notice with OONIFY branding</li>
              </ul>
            </div>

            {/* WhatsApp Button Info */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <h2 className="mb-2 text-xl font-semibold">
                WhatsApp Floating Button
              </h2>
              <p className="text-muted-foreground text-sm">
                Look at the bottom-right corner! The WhatsApp button features:
              </p>
              <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Fixed position floating button</li>
                <li>Pulse animation effect</li>
                <li>Hover tooltip with message</li>
                <li>Opens WhatsApp with pre-filled message</li>
                <li>Smooth entrance animation</li>
                <li>Official WhatsApp green color (#25D366)</li>
              </ul>
            </div>
          </section>

          <h2 className="text-2xl font-semibold">Other UI Components</h2>

          {/* Button Variants */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Button Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </section>

          {/* Button Sizes */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Button Sizes</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </section>

          {/* Disabled Buttons */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Disabled State</h2>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled Default</Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
            </div>
          </section>

          {/* Interactive Examples */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Interactive Examples</h2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
              <Button
                variant="outline"
                onClick={() => console.log("Logged to console")}
              >
                Log to Console
              </Button>
            </div>
          </section>

          {/* Input Examples */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Input Examples</h2>

            {/* Basic Input Types */}
            <div className="max-w-md space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Input</label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                {inputValue && (
                  <p className="text-muted text-xs">
                    Current value: {inputValue}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Input</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password Input</label>
                <Input type="password" placeholder="Enter your password" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Number Input</label>
                <Input
                  type="number"
                  placeholder="Enter a number"
                  min="0"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Input</label>
                <Input type="date" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Input</label>
                <Input type="time" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Search Input</label>
                <Input type="search" placeholder="Search..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">File Input</label>
                <Input type="file" />
              </div>
            </div>
          </section>

          {/* Input States */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Input States</h2>

            <div className="max-w-md space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Disabled Input</label>
                <Input type="text" placeholder="Disabled input" disabled />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Read-Only Input</label>
                <Input type="text" value="Read-only value" readOnly />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Invalid Input</label>
                <Input
                  type="email"
                  placeholder="Invalid email"
                  aria-invalid="true"
                />
                <p className="text-destructive text-xs">
                  Please enter a valid email address
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Required Input</label>
                <Input type="text" placeholder="Required field" required />
              </div>
            </div>
          </section>

          {/* Input with Actions */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Input with Actions</h2>

            <div className="max-w-md space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Input with Submit Button
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter text..."
                    className="flex-1"
                  />
                  <Button>Submit</Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Search with Button
                </label>
                <div className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="flex-1"
                  />
                  <Button variant="secondary">Search</Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Email Subscription
                </label>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1"
                  />
                  <Button className="bg-gradient-button">Subscribe</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Card Examples */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Card Examples</h2>

            {/* Basic Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Simple Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                  <CardDescription>
                    A basic card with header and content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    This is a simple card component with a header, description,
                    and content area.
                  </p>
                </CardContent>
              </Card>

              {/* Card with Footer */}
              <Card>
                <CardHeader>
                  <CardTitle>Card with Footer</CardTitle>
                  <CardDescription>Includes footer actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    This card includes a footer section with action buttons.
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">Confirm</Button>
                </CardFooter>
              </Card>

              {/* Card with Action */}
              <Card>
                <CardHeader>
                  <CardTitle>Card with Action</CardTitle>
                  <CardDescription>Header action button</CardDescription>
                  <CardAction>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    This card has an action button in the header area.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Feature Cards</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="bg-gradient-primary">
                  <CardHeader>
                    <CardTitle>Pilates Classes</CardTitle>
                    <CardDescription>Group & Private Sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm">
                      Join our expert-led pilates classes for all skill levels.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Small group classes</li>
                      <li>✓ One-on-one training</li>
                      <li>✓ Flexible scheduling</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Book a Class</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Membership Plans</CardTitle>
                    <CardDescription>Starting at €49/month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-primary text-3xl font-bold">€49</div>
                      <ul className="space-y-2 text-sm">
                        <li>✓ 8 classes per month</li>
                        <li>✓ Online booking</li>
                        <li>✓ Member discounts</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Plans
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                    <CardDescription>
                      Get in touch with our team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-muted-foreground">
                          Caldas da Rainha, Portugal
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-muted-foreground">
                          info@yourselfpilates.com
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full">
                      Send Message
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            {/* Interactive Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Interactive Cards</h3>
              <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
                {/* Form Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                      Create your account to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input type="text" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button variant="outline" className="flex-1">
                      Cancel
                    </Button>
                    <Button className="flex-1">Sign Up</Button>
                  </CardFooter>
                </Card>

                {/* Stats Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Studio Statistics</CardTitle>
                    <CardDescription>Monthly overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-primary text-2xl font-bold">
                          250+
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Active Members
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-primary text-2xl font-bold">
                          500+
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Classes This Month
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-primary text-2xl font-bold">
                          4.9
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Average Rating
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-primary text-2xl font-bold">
                          98%
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Satisfaction Rate
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Card Variants */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Card Variants</h3>
              <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="border-primary border-2">
                  <CardHeader>
                    <CardTitle>Highlighted Card</CardTitle>
                    <CardDescription>
                      Card with custom border styling
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      This card uses custom border colors to stand out.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Elevated Card</CardTitle>
                    <CardDescription>Card with enhanced shadow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      This card has an elevated appearance with increased
                      shadow.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Dialog Examples */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Dialog Examples</h2>

            {/* Basic Dialogs */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Basic Dialogs</h3>
              <div className="flex flex-wrap gap-4">
                {/* Simple Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Simple Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Welcome!</DialogTitle>
                      <DialogDescription>
                        This is a simple dialog with a title and description.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm">
                        Dialogs are great for displaying important information
                        or getting user confirmation.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Dialog with Footer */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Dialog with Footer</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Action</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to continue?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm">
                        This action cannot be undone. This will permanently
                        delete your data.
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Destructive Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Account?</DialogTitle>
                      <DialogDescription>
                        This action cannot be reversed.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-destructive text-sm font-medium">
                        Warning: This will permanently delete your account and
                        all associated data.
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button variant="destructive">Delete Account</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Form Dialog */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Form Dialog</h3>
              <Dialog
                open={isFormDialogOpen}
                onOpenChange={setIsFormDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="secondary">Book a Class</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Book Your Pilates Class</DialogTitle>
                    <DialogDescription>
                      Fill in your details to reserve your spot.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Preferred Date
                      </label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Preferred Time
                      </label>
                      <Input type="time" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      onClick={() => {
                        alert(
                          `Booking for ${formData.name} (${formData.email})`
                        );
                        setIsFormDialogOpen(false);
                        setFormData({ name: "", email: "" });
                      }}
                    >
                      Book Now
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Information Dialogs */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Information Dialogs</h3>
              <div className="flex flex-wrap gap-4">
                {/* Success Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-button">
                      Success Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>✓ Success!</DialogTitle>
                      <DialogDescription>
                        Your action was completed successfully.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm">
                        Your booking has been confirmed. You will receive a
                        confirmation email shortly.
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button>Got it</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Info Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost">About Our Studio</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Yourself Pilates Studio</DialogTitle>
                      <DialogDescription>
                        Premium Pilates in Caldas da Rainha
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p className="text-sm">
                        Welcome to Yourself Pilates, where we believe in the
                        transformative power of movement and mindful exercise.
                      </p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">
                          What We Offer:
                        </h4>
                        <ul className="ml-4 space-y-1 text-sm">
                          <li>• Small group classes (max 6 people)</li>
                          <li>• Private one-on-one sessions</li>
                          <li>• Specialized equipment</li>
                          <li>• Certified instructors</li>
                          <li>• Flexible membership plans</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Location:</h4>
                        <p className="text-muted-foreground text-sm">
                          Caldas da Rainha, Portugal
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                      <Button>Contact Us</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Custom Size Dialogs */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Custom Size Dialogs</h3>
              <div className="flex flex-wrap gap-4">
                {/* Small Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Small Dialog
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Small Dialog</DialogTitle>
                      <DialogDescription>
                        A compact dialog for quick messages.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                {/* Large Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Large Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Class Schedule</DialogTitle>
                      <DialogDescription>
                        View our weekly pilates class schedule
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">
                              Monday & Wednesday
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 text-sm">
                            <div>9:00 AM - Beginner Mat Class</div>
                            <div>11:00 AM - Intermediate Reformer</div>
                            <div>6:00 PM - Advanced Mat Class</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">
                              Tuesday & Thursday
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 text-sm">
                            <div>8:00 AM - Morning Flow</div>
                            <div>10:00 AM - Prenatal Pilates</div>
                            <div>5:30 PM - Evening Stretch</div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                      <Button>Book a Class</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Scrollable Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Scrollable Content</Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Terms and Conditions</DialogTitle>
                      <DialogDescription>
                        Please read our terms carefully
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4 text-sm">
                      <p>
                        Welcome to Yourself Pilates. By booking a class or
                        purchasing a membership, you agree to the following
                        terms:
                      </p>
                      <div>
                        <h4 className="mb-2 font-semibold">
                          1. Class Bookings
                        </h4>
                        <p className="text-muted-foreground">
                          Classes must be booked at least 2 hours in advance.
                          Cancellations must be made 24 hours before the
                          scheduled class time to avoid charges.
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold">2. Memberships</h4>
                        <p className="text-muted-foreground">
                          Monthly memberships renew automatically. You can
                          cancel at any time with 30 days notice.
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold">
                          3. Health & Safety
                        </h4>
                        <p className="text-muted-foreground">
                          Please inform your instructor of any injuries or
                          health conditions before class. We reserve the right
                          to refuse service if we believe it may endanger your
                          health.
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold">4. Studio Rules</h4>
                        <p className="text-muted-foreground">
                          Please arrive 10 minutes early for class. Late
                          arrivals may not be admitted to maintain a peaceful
                          environment for all participants.
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold">5. Equipment</h4>
                        <p className="text-muted-foreground">
                          All equipment is provided. Please treat it with care
                          and report any damage immediately.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Decline</Button>
                      </DialogClose>
                      <Button>Accept Terms</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </section>

          {/* Select Examples */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Select Examples</h2>

            {/* Basic Selects */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Basic Selects</h3>
              <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Simple Select */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Class Type</label>
                  <Select value={classType} onValueChange={setClassType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mat-beginner">
                        Mat - Beginner
                      </SelectItem>
                      <SelectItem value="mat-intermediate">
                        Mat - Intermediate
                      </SelectItem>
                      <SelectItem value="mat-advanced">
                        Mat - Advanced
                      </SelectItem>
                      <SelectItem value="reformer">Reformer</SelectItem>
                      <SelectItem value="prenatal">Prenatal Pilates</SelectItem>
                      <SelectItem value="private">Private Session</SelectItem>
                    </SelectContent>
                  </Select>
                  {classType && (
                    <p className="text-muted text-xs">Selected: {classType}</p>
                  )}
                </div>

                {/* Select with Groups */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Slot</label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Morning</SelectLabel>
                        <SelectItem value="8am">8:00 AM</SelectItem>
                        <SelectItem value="9am">9:00 AM</SelectItem>
                        <SelectItem value="10am">10:00 AM</SelectItem>
                        <SelectItem value="11am">11:00 AM</SelectItem>
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>Afternoon</SelectLabel>
                        <SelectItem value="2pm">2:00 PM</SelectItem>
                        <SelectItem value="3pm">3:00 PM</SelectItem>
                        <SelectItem value="4pm">4:00 PM</SelectItem>
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>Evening</SelectLabel>
                        <SelectItem value="5pm">5:00 PM</SelectItem>
                        <SelectItem value="6pm">6:00 PM</SelectItem>
                        <SelectItem value="7pm">7:00 PM</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Select with Size */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Small Select</label>
                  <Select>
                    <SelectTrigger className="w-full" size="sm">
                      <SelectValue placeholder="Small size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">Extra Small</SelectItem>
                      <SelectItem value="s">Small</SelectItem>
                      <SelectItem value="m">Medium</SelectItem>
                      <SelectItem value="l">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Select States */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Select States</h3>
              <div className="grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
                {/* Disabled Select */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Disabled Select</label>
                  <Select disabled>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="This is disabled" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Required Select */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Required Select *
                  </label>
                  <Select required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Required field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Select in Forms */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Select in Form Context</h3>
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle>Book a Pilates Class</CardTitle>
                  <CardDescription>
                    Select your preferences for booking
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Class Type</label>
                      <Select value={classType} onValueChange={setClassType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select class type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mat-beginner">
                            Mat - Beginner
                          </SelectItem>
                          <SelectItem value="mat-intermediate">
                            Mat - Intermediate
                          </SelectItem>
                          <SelectItem value="reformer">Reformer</SelectItem>
                          <SelectItem value="prenatal">Prenatal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Instructor</label>
                      <Select value={instructor} onValueChange={setInstructor}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose instructor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maria">Maria Silva</SelectItem>
                          <SelectItem value="joao">João Santos</SelectItem>
                          <SelectItem value="ana">Ana Costa</SelectItem>
                          <SelectItem value="any">Any Available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Preferred Time
                    </label>
                    <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Morning Classes</SelectLabel>
                          <SelectItem value="morning-8">
                            8:00 AM - Morning Flow
                          </SelectItem>
                          <SelectItem value="morning-9">
                            9:00 AM - Beginner Mat
                          </SelectItem>
                          <SelectItem value="morning-10">
                            10:00 AM - Prenatal
                          </SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectLabel>Evening Classes</SelectLabel>
                          <SelectItem value="evening-5">
                            5:00 PM - Intermediate
                          </SelectItem>
                          <SelectItem value="evening-6">
                            6:00 PM - Advanced
                          </SelectItem>
                          <SelectItem value="evening-7">
                            7:00 PM - Stretch & Relax
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input type="text" placeholder="Enter your name" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setClassType("");
                      setInstructor("");
                      setTimeSlot("");
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      if (classType && instructor && timeSlot) {
                        alert(
                          `Booking: ${classType} with ${instructor} at ${timeSlot}`
                        );
                      } else {
                        alert("Please fill all fields");
                      }
                    }}
                  >
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Complex Selects */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Complex Select Examples</h3>
              <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
                {/* Membership Plans */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Membership Plan</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose your plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Monthly Plans</SelectLabel>
                        <SelectItem value="basic-monthly">
                          Basic - 4 classes/month (€39)
                        </SelectItem>
                        <SelectItem value="standard-monthly">
                          Standard - 8 classes/month (€69)
                        </SelectItem>
                        <SelectItem value="premium-monthly">
                          Premium - 12 classes/month (€89)
                        </SelectItem>
                        <SelectItem value="unlimited-monthly">
                          Unlimited - All classes (€119)
                        </SelectItem>
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>Annual Plans (Save 20%)</SelectLabel>
                        <SelectItem value="basic-annual">
                          Basic Annual (€374/year)
                        </SelectItem>
                        <SelectItem value="standard-annual">
                          Standard Annual (€662/year)
                        </SelectItem>
                        <SelectItem value="premium-annual">
                          Premium Annual (€854/year)
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location/Studio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Studio Location</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select studio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">
                        Main Studio - Caldas da Rainha Centro
                      </SelectItem>
                      <SelectItem value="north">
                        North Studio - São Gião
                      </SelectItem>
                      <SelectItem value="online">Online Classes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Equipment Preference */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Equipment Level</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Mat Classes</SelectLabel>
                        <SelectItem value="mat-only">Mat Only</SelectItem>
                        <SelectItem value="mat-props">
                          Mat with Small Props
                        </SelectItem>
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>Equipment Classes</SelectLabel>
                        <SelectItem value="reformer">Reformer</SelectItem>
                        <SelectItem value="cadillac">Cadillac</SelectItem>
                        <SelectItem value="chair">Wunda Chair</SelectItem>
                        <SelectItem value="barrel">Barrel</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Preference */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Instruction Language
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Select with Actions */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Select with Inline Actions
              </h3>
              <div className="max-w-md space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium">Quick Filter</label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter classes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="available">
                          Available Spots
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button>Apply</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Calendar Examples */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Calendar Examples</h2>

            {/* Basic Calendars */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Basic Calendar</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Single Date Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Single Date Selection</CardTitle>
                    <CardDescription>Select a single date</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                    {selectedDate && (
                      <p className="mt-4 text-center text-sm">
                        Selected: {selectedDate.toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Date Range Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Date Range Selection</CardTitle>
                    <CardDescription>Select a date range</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      className="rounded-md border"
                    />
                    {dateRange?.from && (
                      <div className="mt-4 space-y-1 text-center text-sm">
                        <p>From: {dateRange.from.toLocaleDateString()}</p>
                        {dateRange.to && (
                          <p>To: {dateRange.to.toLocaleDateString()}</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Multiple Date Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Multiple Dates</CardTitle>
                    <CardDescription>Select multiple dates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="multiple"
                      selected={multipleDate}
                      onSelect={setMultipleDate}
                      className="rounded-md border"
                    />
                    {multipleDate.length > 0 && (
                      <p className="mt-4 text-center text-sm">
                        {multipleDate.length} date(s) selected
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Calendar with Constraints */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Calendar with Constraints
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Disabled Past Dates */}
                <Card>
                  <CardHeader>
                    <CardTitle>Future Dates Only</CardTitle>
                    <CardDescription>Past dates are disabled</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      disabled={{ before: new Date() }}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                {/* Specific Date Range */}
                <Card>
                  <CardHeader>
                    <CardTitle>Limited Date Range</CardTitle>
                    <CardDescription>
                      Only next 30 days available
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      disabled={{
                        before: new Date(),
                        after: thirtyDaysFromNow,
                      }}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Calendar in Booking Form */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Calendar in Booking Context
              </h3>
              <Card className="max-w-3xl">
                <CardHeader>
                  <CardTitle>Book Your Pilates Class</CardTitle>
                  <CardDescription>
                    Choose your preferred date and time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Select Date
                        </label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={{ before: new Date() }}
                          className="rounded-md border"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Class Details
                        </label>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Class Type
                            </label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">
                                  Beginner Mat
                                </SelectItem>
                                <SelectItem value="intermediate">
                                  Intermediate
                                </SelectItem>
                                <SelectItem value="reformer">
                                  Reformer
                                </SelectItem>
                                <SelectItem value="private">
                                  Private Session
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Time Slot
                            </label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="9am">9:00 AM</SelectItem>
                                <SelectItem value="10am">10:00 AM</SelectItem>
                                <SelectItem value="5pm">5:00 PM</SelectItem>
                                <SelectItem value="6pm">6:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input type="text" placeholder="Your name" />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input type="email" placeholder="your@email.com" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="text-sm font-medium">Booking Summary</p>
                      <p className="text-muted-foreground text-sm">
                        Date:{" "}
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedDate(undefined)}
                  >
                    Clear
                  </Button>
                  <Button className="flex-1">Book Now</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Calendar Variants */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Calendar Variants</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Multiple Months */}
                <Card>
                  <CardHeader>
                    <CardTitle>Multiple Months</CardTitle>
                    <CardDescription>
                      View multiple months at once
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      numberOfMonths={2}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                {/* Week Numbers */}
                <Card>
                  <CardHeader>
                    <CardTitle>With Week Numbers</CardTitle>
                    <CardDescription>Display week numbers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      showWeekNumber
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Calendar with Dialog */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Calendar in Dialog</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select a Date</DialogTitle>
                    <DialogDescription>
                      Choose your preferred class date
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={{ before: new Date() }}
                      className="rounded-md border"
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button>Confirm</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {selectedDate && (
                <p className="text-muted-foreground text-sm">
                  Selected:{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>

            {/* Disabled Specific Days */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Custom Disabled Days</h3>
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle>Studio Closed Days</CardTitle>
                  <CardDescription>
                    Sundays and holidays are disabled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    disabled={[
                      { dayOfWeek: [0] }, // Disable Sundays
                      { before: new Date() }, // Disable past dates
                    ]}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default ExamplePage;
