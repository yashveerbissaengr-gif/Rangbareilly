import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import { AccordionItem } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Contact Us | RANGBAREILLY',
  description: 'Get in touch with the RANGBAREILLY customer care team.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-rangbareilly-background pt-[73px]">
      {/* Header Section */}
      <div className="w-full flex flex-col items-center text-center px-6 py-24 border-b border-rangbareilly-dark/10">
        <Heading as="h1" className="text-4xl md:text-5xl text-rangbareilly-dark mb-6">
          Contact Us
        </Heading>
        <Text className="max-w-xl text-rangbareilly-dark/80 text-lg">
          We are here to assist you with styling advice, order inquiries, and repairs.
        </Text>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 py-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Contact Info */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-12">
          <div>
            <Text className="text-xs uppercase tracking-widest text-rangbareilly-dark/60 mb-2">
              Email
            </Text>
            <Text className="text-rangbareilly-dark text-lg">
              rangbareillystore@gmail.com
            </Text>
            <Text className="text-rangbareilly-dark/60 text-sm mt-1">
              Expect a reply within 24 hours.
            </Text>
          </div>

          <div>
            <Text className="text-xs uppercase tracking-widest text-rangbareilly-dark/60 mb-2">
              Call Us
            </Text>
            <Text className="text-rangbareilly-dark text-lg">
              +91 9588669056
            </Text>
            <Text className="text-rangbareilly-dark/60 text-sm mt-1">
              Mon-Fri, 9am - 8pm EST
            </Text>
          </div>
        </div>

        {/* FAQ Accordions */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <Heading as="h2" className="text-2xl text-rangbareilly-dark mb-8">
            Frequently Asked Questions
          </Heading>

          <div className="space-y-4">
            <AccordionItem title="Do you ship internationally?">
              <Text className="pt-4 pb-2 text-rangbareilly-dark/80">
                Yes, we offer complimentary express shipping worldwide. Duties and taxes are calculated at checkout.
              </Text>
            </AccordionItem>

            <AccordionItem title="What is your return policy?">
              <Text className="pt-4 pb-2 text-rangbareilly-dark/80">
                We accept returns on all unworn items within 30 days of delivery. Custom pieces and engraved items are final sale.
              </Text>
            </AccordionItem>

            <AccordionItem title="Do you offer a warranty?">
              <Text className="pt-4 pb-2 text-rangbareilly-dark/80">
                All RANGBAREILLY pieces come with a 1-year warranty covering manufacturing defects. We also offer lifetime complimentary cleaning at our flagship locations.
              </Text>
            </AccordionItem>
          </div>
        </div>
      </div>
    </div>
  );
}
