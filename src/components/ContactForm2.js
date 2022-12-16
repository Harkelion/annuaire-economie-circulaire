import React from "react";
import sgMail from "@sendgrid/mail";

const ContactForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // Récupération des valeurs des champs de formulaire
    const subject = event.target.elements.subject.value;
    const to = event.target.elements.to.value;
    const message = event.target.elements.message.value;

    // Création de l'objet de message
    const msg = {
      to: to,
      from: "test@example.com",
      subject: subject,
      text: message,
      html: message,
    };

    // Envoi de l'email via SendGrid

    sgMail.setApiKey(
      "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"
    );
    sgMail.send(msg);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sujet:
        <input type="text" name="subject" />
      </label>
      <br />
      <label>
        Destinataire:
        <input type="text" name="to" />
      </label>
      <br />
      <label>
        Message:
        <textarea name="message" />
      </label>
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default ContactForm;
