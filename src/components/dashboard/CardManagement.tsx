
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, PlusCircle, Trash2, Eye, EyeOff, Edit } from "lucide-react";

// Define form schema for adding a new card
const cardFormSchema = z.object({
  cardholderName: z.string().min(3, { message: "Cardholder name is required" }),
  cardNumber: z.string()
    .min(16, { message: "Card number must be at least 16 digits" })
    .max(19, { message: "Card number cannot exceed 19 characters" })
    .refine((val) => /^[0-9\s-]+$/.test(val), { message: "Card number must only contain digits" }),
  expiryDate: z.string()
    .min(5, { message: "Expiry date is required (MM/YY)" })
    .max(5, { message: "Expiry date must be in MM/YY format" })
    .refine((val) => /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(val), { message: "Expiry date must be in MM/YY format" }),
  cvv: z.string()
    .min(3, { message: "CVV must be at least 3 digits" })
    .max(4, { message: "CVV cannot exceed 4 digits" })
    .refine((val) => /^\d{3,4}$/.test(val), { message: "CVV must only contain digits" }),
});

type CardFormValues = z.infer<typeof cardFormSchema>;

type Card = {
  id: string;
  cardholderName: string;
  lastFourDigits: string;
  expiryDate: string;
  cardType: string;
  isDefault: boolean;
};

const CardManagement = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: "1",
      cardholderName: "John Doe",
      lastFourDigits: "4242",
      expiryDate: "12/25",
      cardType: "Visa",
      isDefault: true,
    },
    {
      id: "2",
      cardholderName: "John Doe",
      lastFourDigits: "1234",
      expiryDate: "06/24",
      cardType: "Mastercard",
      isDefault: false,
    }
  ]);
  
  const [showCardForm, setShowCardForm] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const { toast } = useToast();

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = (data: CardFormValues) => {
    // Process the card data
    const lastFour = data.cardNumber.replace(/\s/g, '').slice(-4);
    const cardType = getCardType(data.cardNumber);
    
    const newCard: Card = {
      id: Date.now().toString(),
      cardholderName: data.cardholderName,
      lastFourDigits: lastFour,
      expiryDate: data.expiryDate,
      cardType: cardType,
      isDefault: cards.length === 0, // Make default if it's the first card
    };
    
    setCards([...cards, newCard]);
    setShowCardForm(false);
    form.reset();
    
    toast({
      title: "Card Added",
      description: `Your ${cardType} card ending in ${lastFour} has been added successfully.`,
    });
  };

  const getCardType = (cardNumber: string): string => {
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    
    if (/^4/.test(cleanNumber)) return "Visa";
    if (/^5[1-5]/.test(cleanNumber)) return "Mastercard";
    if (/^3[47]/.test(cleanNumber)) return "American Express";
    if (/^6(?:011|5)/.test(cleanNumber)) return "Discover";
    return "Credit Card";
  };

  const removeCard = (id: string) => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
    
    toast({
      title: "Card Removed",
      description: "Your card has been removed successfully.",
    });
  };

  const setDefaultCard = (id: string) => {
    const updatedCards = cards.map(card => ({
      ...card,
      isDefault: card.id === id
    }));
    setCards(updatedCards);
    
    toast({
      title: "Default Card Updated",
      description: "Your default payment method has been updated.",
    });
  };

  const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
    form.setValue('cardNumber', formattedValue);
  };
  
  const formatExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    form.setValue('expiryDate', value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Your Payment Methods</h2>
        <Dialog open={showCardForm} onOpenChange={setShowCardForm}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Payment Card</DialogTitle>
              <DialogDescription>
                Enter your card details to add a new payment method.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardholderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="1234 5678 9012 3456" 
                          maxLength={19}
                          onChange={(e) => {
                            formatCardNumber(e);
                            field.onChange(e);
                          }} 
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="MM/YY" 
                            maxLength={5}
                            onChange={(e) => {
                              formatExpiryDate(e);
                              field.onChange(e);
                            }}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showCVV ? "text" : "password"}
                              placeholder="123" 
                              maxLength={4}
                              {...field} 
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-2.5 text-gray-500"
                              onClick={() => setShowCVV(!showCVV)}
                            >
                              {showCVV ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => {
                    setShowCardForm(false);
                    form.reset();
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Card</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {cards.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <CreditCard className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Payment Methods</h3>
            <p className="text-muted-foreground text-center mb-4">
              You haven't added any payment methods yet.
            </p>
            <Button onClick={() => setShowCardForm(true)}>Add Your First Card</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {cards.map((card) => (
            <Card key={card.id} className={`transition-all ${card.isDefault ? 'border-primary' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    {card.cardType} •••• {card.lastFourDigits}
                    {card.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {!card.isDefault && (
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => setDefaultCard(card.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => removeCard(card.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {card.cardholderName} • Expires {card.expiryDate}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardManagement;
