import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "#ui/components/accordion"

export default function FAQSection() {

  const faq = [
    {
      question: "Pourquoi choisir notre service ?",
      answer: "Nous offrons une sécurité de pointe, une confidentialité totale et un service client exceptionnel.",
    },
    {
      question: "Nos données sont-elles sécurisées ?",
      answer: "Oui, nous utilisons des protocoles de sécurité avancés pour protéger vos données. Toutes vos données <em>(adresse, mail, etc.)</em> sont cryptées et stockées de manière sécurisée.",
    },
    {
      question: "Comment les envoies sont traités ?",
      answer: "Nous envoyons vos colis de manière anonyme. Aucun de nos collaborateurs ne connaissent vos informations personnelles.",
    },
    {
      question: "Comment puis-je suivre mon colis ?",
      answer: `<p>
          Nous vous fournissons un numéro de suivi unique pour chaque envoi, vous permettant de suivre votre colis en temps réel.
          <p>Ou sinon rendez-vous sur <b> votre compte -> achats -> suivi</b>.</p>
          <p>De plus nous vous enverrons des emails a chaques étapes de l'envoi.</p>
        </p>`,
    },
    {
      question: "J'ai acheté un produit, quand sera t-il expédié ?",
      answer: `<p>
          Nous expédions généralement les commandes dans un délai de 24 à 48 heures après réception du paiement.
          <p>Vous recevrez une notification par e-mail une fois votre commande expédiée.</p>
        </p>`,
    },
    {
      question: "Comment puis-je contacter le service client ?",
      answer: "Par question d'anonymat, nous sommes disponible uniquement via notre mail: <a href='mailto:contact@domain.fr' target='_blank' class='text-blue-500 hover:underline'>contact@domain.fr</a>. <p>Cependant, une plateforme de ticket va être créer sous les prochaines semaines.</p>",
    }
  ]

  return (
    <section className="mt-24" id="features">
      <div className="container">
        <div className="mb-24 flex flex-col items-center gap-6">
          <h1 className="text-center text-3xl font-semibold lg:max-w-3xl lg:text-5xl">
            Pourquoi nous ?
          </h1>
          <p className="text-center text-lg font-medium text-muted-foreground md:max-w-4xl lg:text-xl">
            Sécurité, confidentialité et qualité sont nos priorités.
          </p>
        </div>
        <div>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <div dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
