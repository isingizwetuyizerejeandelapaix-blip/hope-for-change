"use client"

import { motion } from "framer-motion"
import { useRef, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Heart, Shield, Check, CreditCard, Building, Repeat, Gift, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { emergencyResponses, programs } from "@/lib/data"

const donationAmounts = [25, 50, 100, 250, 500, 1000]

const impactItems = [
  { amount: 25, impact: "Provides essential medications for 5 patients" },
  { amount: 50, impact: "Supplies clean water for a family for one month" },
  { amount: 100, impact: "Funds a mobile clinic visit to a remote village" },
  { amount: 250, impact: "Trains a community health worker" },
  { amount: 500, impact: "Equips a field medic with essential supplies" },
  { amount: 1000, impact: "Sponsors a surgical mission for 10 patients" },
]

function DonateContent() {
  const searchParams = useSearchParams()
  const campaignParam = searchParams.get("campaign")
  const amountParam = searchParams.get("amount")
  
  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    amountParam ? parseInt(amountParam) : 100
  )
  const [customAmount, setCustomAmount] = useState("")
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time")
  const [selectedCampaign, setSelectedCampaign] = useState(campaignParam || "general")
  const [step, setStep] = useState(1)
  const formRef = useRef(null)

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount || 0

  const selectedEmergency = emergencyResponses.find(e => e.id === selectedCampaign)
  const selectedProgram = programs.find(p => p.id === selectedCampaign)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would integrate with a payment processor
    setStep(3)
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-10 h-10 text-primary" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance"
            >
              Your Gift Saves Lives
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              85% of every donation goes directly to community programs. 
              Your generosity provides life-saving care to those who need it most.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {step === 3 ? (
              // Success State
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-8">
                  <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Thank You for Your Generosity!
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                  Your {donationType === "monthly" ? "monthly " : ""}donation of ${finalAmount} will help provide 
                  life-saving support to those in need.
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  A confirmation email has been sent to your inbox with your tax receipt.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/">Return Home</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/news">Read Our Latest Stories</Link>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-3">
                  <Card>
                    <CardContent className="p-6 lg:p-8">
                      {/* Progress Steps */}
                      <div className="flex items-center gap-4 mb-8">
                        {[1, 2].map((s) => (
                          <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}>
                              {step > s ? <Check className="w-4 h-4" /> : s}
                            </div>
                            <span className={`text-sm ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                              {s === 1 ? "Amount" : "Payment"}
                            </span>
                            {s < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                          </div>
                        ))}
                      </div>

                      {step === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          {/* Donation Type */}
                          <div className="mb-8">
                            <Label className="text-base font-semibold mb-4 block">Donation Type</Label>
                            <Tabs value={donationType} onValueChange={(v) => setDonationType(v as "one-time" | "monthly")}>
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="one-time" className="gap-2">
                                  <Gift className="w-4 h-4" />
                                  One-Time
                                </TabsTrigger>
                                <TabsTrigger value="monthly" className="gap-2">
                                  <Repeat className="w-4 h-4" />
                                  Monthly
                                </TabsTrigger>
                              </TabsList>
                            </Tabs>
                            {donationType === "monthly" && (
                              <p className="text-sm text-muted-foreground mt-2">
                                Monthly giving provides sustainable support and can be cancelled anytime.
                              </p>
                            )}
                          </div>

                          {/* Campaign Selection */}
                          <div className="mb-8">
                            <Label className="text-base font-semibold mb-4 block">Direct Your Gift</Label>
                            <RadioGroup value={selectedCampaign} onValueChange={setSelectedCampaign}>
                              <div className="grid gap-3">
                                <Label
                                  htmlFor="general"
                                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                                    selectedCampaign === "general" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                  }`}
                                >
                                  <RadioGroupItem value="general" id="general" />
                                  <div>
                                    <div className="font-medium">Where Needed Most</div>
                                    <div className="text-sm text-muted-foreground">Support our most urgent priorities</div>
                                  </div>
                                </Label>
                                
                                {emergencyResponses.slice(0, 2).map((emergency) => (
                                  <Label
                                    key={emergency.id}
                                    htmlFor={emergency.id}
                                    className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                                      selectedCampaign === emergency.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                    }`}
                                  >
                                    <RadioGroupItem value={emergency.id} id={emergency.id} />
                                    <div className="flex-1">
                                      <div className="font-medium">{emergency.title}</div>
                                      <div className="text-sm text-muted-foreground">{emergency.location}</div>
                                    </div>
                                  </Label>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>

                          {/* Amount Selection */}
                          <div className="mb-8">
                            <Label className="text-base font-semibold mb-4 block">Select Amount</Label>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                              {donationAmounts.map((amount) => (
                                <Button
                                  key={amount}
                                  type="button"
                                  variant={selectedAmount === amount && !customAmount ? "default" : "outline"}
                                  className="h-14 text-lg"
                                  onClick={() => {
                                    setSelectedAmount(amount)
                                    setCustomAmount("")
                                  }}
                                >
                                  ${amount}
                                </Button>
                              ))}
                            </div>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                              <Input
                                type="number"
                                placeholder="Other amount"
                                value={customAmount}
                                onChange={(e) => {
                                  setCustomAmount(e.target.value)
                                  setSelectedAmount(null)
                                }}
                                className="pl-8 h-14 text-lg"
                              />
                            </div>
                          </div>

                          <Button 
                            className="w-full h-14 text-lg"
                            onClick={() => setStep(2)}
                            disabled={!finalAmount || finalAmount < 1}
                          >
                            Continue to Payment
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </Button>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.form
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          onSubmit={handleSubmit}
                          ref={formRef}
                        >
                          <Button
                            type="button"
                            variant="ghost"
                            className="mb-6 -ml-2"
                            onClick={() => setStep(1)}
                          >
                            <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                            Back to Amount
                          </Button>

                          {/* Payment Method */}
                          <div className="mb-8">
                            <Label className="text-base font-semibold mb-4 block">Payment Method</Label>
                            <Tabs defaultValue="card">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="card" className="gap-2">
                                  <CreditCard className="w-4 h-4" />
                                  Card
                                </TabsTrigger>
                                <TabsTrigger value="bank" className="gap-2">
                                  <Building className="w-4 h-4" />
                                  Bank
                                </TabsTrigger>
                              </TabsList>
                              <TabsContent value="card" className="mt-4 space-y-4">
                                <div>
                                  <Label htmlFor="cardName">Name on Card</Label>
                                  <Input id="cardName" placeholder="John Smith" className="mt-1" required />
                                </div>
                                <div>
                                  <Label htmlFor="cardNumber">Card Number</Label>
                                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="expiry">Expiry</Label>
                                    <Input id="expiry" placeholder="MM/YY" className="mt-1" required />
                                  </div>
                                  <div>
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" className="mt-1" required />
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="bank" className="mt-4 space-y-4">
                                <div>
                                  <Label htmlFor="accountName">Account Holder Name</Label>
                                  <Input id="accountName" placeholder="John Smith" className="mt-1" required />
                                </div>
                                <div>
                                  <Label htmlFor="routingNumber">Routing Number</Label>
                                  <Input id="routingNumber" placeholder="123456789" className="mt-1" required />
                                </div>
                                <div>
                                  <Label htmlFor="accountNumber">Account Number</Label>
                                  <Input id="accountNumber" placeholder="1234567890" className="mt-1" required />
                                </div>
                              </TabsContent>
                            </Tabs>
                          </div>

                          {/* Contact Info */}
                          <div className="mb-8">
                            <Label className="text-base font-semibold mb-4 block">Your Information</Label>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="firstName">First Name</Label>
                                  <Input id="firstName" className="mt-1" required />
                                </div>
                                <div>
                                  <Label htmlFor="lastName">Last Name</Label>
                                  <Input id="lastName" className="mt-1" required />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" className="mt-1" required />
                              </div>
                            </div>
                          </div>

                          <Button type="submit" className="w-full h-14 text-lg">
                            <Heart className="w-5 h-5 mr-2" />
                            Donate ${finalAmount} {donationType === "monthly" ? "Monthly" : ""}
                          </Button>

                          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                            <Shield className="w-4 h-4" />
                            Secure 256-bit SSL encryption
                          </div>
                        </motion.form>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Summary Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Donation Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount</span>
                          <span className="font-semibold">${finalAmount || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Frequency</span>
                          <span className="font-semibold capitalize">{donationType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Designation</span>
                          <span className="font-semibold text-right max-w-[150px] truncate">
                            {selectedCampaign === "general" 
                              ? "Where Needed Most" 
                              : selectedEmergency?.title || selectedProgram?.title || selectedCampaign
                            }
                          </span>
                        </div>
                        <hr />
                        <div className="flex justify-between text-lg">
                          <span className="font-semibold">Total</span>
                          <span className="font-bold text-primary">
                            ${finalAmount || 0}{donationType === "monthly" ? "/mo" : ""}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Impact Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Your Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {impactItems.map((item) => (
                          <div 
                            key={item.amount}
                            className={`flex items-start gap-3 ${
                              finalAmount >= item.amount ? "text-foreground" : "text-muted-foreground/50"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              finalAmount >= item.amount ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}>
                              {finalAmount >= item.amount && <Check className="w-3 h-3" />}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">${item.amount}:</span> {item.impact}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trust badges */}
                  <div className="text-center text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <Shield className="w-5 h-5" />
                      <span>501(c)(3) Tax Deductible</span>
                    </div>
                    <p>85% of donations fund community programs directly</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Campaign Progress (if specific campaign selected) */}
      {selectedEmergency && step !== 3 && (
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-background/80 p-5 shadow-sm backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-foreground">{selectedEmergency.title} Progress</h3>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {Math.min(Math.round((selectedEmergency.raised / selectedEmergency.goal) * 100), 100)}%
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">${selectedEmergency.raised.toLocaleString()} raised</span>
                  <span className="font-medium text-foreground">${selectedEmergency.goal.toLocaleString()} goal</span>
                </div>
                <Progress value={(selectedEmergency.raised / selectedEmergency.goal) * 100} className="h-3.5" />
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DonateContent />
    </Suspense>
  )
}
