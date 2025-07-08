
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the cashback system work?",
      answer: "Earn 2.5% cashback on every airtime purchase with our OneCard system. Rewards are automatically credited to your account and can be used for future purchases or withdrawn."
    },
    {
      question: "Which networks are supported?",
      answer: "We support all major South African networks including MTN, Vodacom, Cell C, Telkom Mobile, and Rain Mobile. Get the best deals across all networks in one platform."
    },
    {
      question: "How quickly is airtime delivered?",
      answer: "Our AI-powered system processes airtime purchases in under 30 seconds. Most transactions are completed instantly with real-time confirmation."
    },
    {
      question: "Is it safe to use Divine Mobile?",
      answer: "Yes, absolutely. We use bank-level encryption and are PCI DSS compliant. All transactions are secured with the latest security protocols to protect your data and money."
    },
    {
      question: "Can I become a vendor?",
      answer: "Yes! Join our vendor network to increase your revenue by up to 40%. The registration process takes 24 hours and includes full training and support."
    },
    {
      question: "What is the USSD code?",
      answer: "You can access Divine Mobile services by dialing *120*888# from any mobile phone. This works on all networks without needing the app or internet connection."
    }
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Divine Mobile
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
