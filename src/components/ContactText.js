import React from "react";
import { Form, Field } from "react-netlify-form";

class Contact extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  render() {
    return (
      <Form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={this.handleSubmit}
      >
        <Field name="name" placeholder="Your Name" type="text" />
        <Field name="email" placeholder="your@email.com" type="email" />
        <Field name="message" component="textarea" />
        <button type="submit">Send</button>
      </Form>
    );
  }
}

export default Contact;
