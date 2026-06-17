"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Do I need an existing resume to use this service?",
    answer: "No. You fill out an intake form with your background, experience, and target role. That is all we need. If you have an existing resume you would like us to reference, you can paste the text into the form — but it is not required."
  },
  {
    question: "What industries do you write for?",
    answer: "Any industry. We write resumes across all fields including healthcare, technology, finance, marketing, and more. The intake form asks for your target role and industry — the AI tailors every bullet point accordingly."
  },
  {
    question: "What does ATS-optimized mean?",
    answer: "Most large employers run resumes through Applicant Tracking Systems before a human sees them. ATS-optimized means your resume uses the right keywords, clean formatting, and standard section headers so it gets through the filter and in front of a real person."
  },
  {
    question: "How do revisions work?",
    answer: "After you receive your documents, simply reply to the delivery email with REVISION at the start of the subject line and describe what you would like changed. Starter includes 2 revisions. Standard and Premium include 3. Revisions are delivered within 24 hours."
  },
  {
    question: "What format will I receive my documents in?",
    answer: "Your documents will be delivered as Word .docx files so you can edit and format them further if needed. PDF versions are available on request."
  }
]

export function FAQ() {
  return (
    <section className="py-16 px-6 max-w-2xl mx-auto">
      <p className="text-center text-[11px] tracking-[0.2em] uppercase text-gold mb-2">
        FAQ
      </p>
      <h2 className="text-center font-serif text-2xl md:text-3xl text-foreground mb-8">
        Common questions
      </h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border-b border-border py-1"
          >
            <AccordionTrigger className="text-sm font-medium text-foreground text-left hover:no-underline py-5">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed font-light pb-5">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
