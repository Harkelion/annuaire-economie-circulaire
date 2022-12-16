import React from "react";
import { NetlifyForm, Honeypot } from "react-netlify-forms";

const Contact = () => {
  return (
    <NetlifyForm name="Contact" action="/thanks" honeypotName="bot-field">
      {({ handleChange, success, error }) => (
        <>
          <Honeypot />
          {success && <p>Merci !</p>}
          {error && (
            <p>
              Désolé, nous n'avons pas pu joindre nos serveurs. Veuillez
              réessayer plus tard.
            </p>
          )}
          <div className="contact">
            <div>
              <label htmlFor="name">Nom:</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="mail">Email:</label>
              <input
                type="text"
                name="mail"
                id="mail"
                onChange={handleChange}
              />
            </div>
            <div>
              <label for="question">Vous souhaitez :</label>
              <select id="question" name="question">
                <option value="ajouter">
                  Être recenser dans notre annuaire ?
                </option>
                <option value="modifier">Apporter une modification ?</option>
                <option value="supprimer">
                  Ne plus faire partis de l'annuaire ?
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <textarea
                type="text"
                name="message"
                id="message"
                rows="4"
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit">Envoyer</button>
            </div>
          </div>
        </>
      )}
    </NetlifyForm>
  );
};

export default Contact;
