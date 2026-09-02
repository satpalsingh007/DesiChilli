"use client";

import { FormEvent, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Name and message are required.");
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    console.log("contact-form", {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    setSubmitting(false);
    setSuccess(true);
  }

  if (success) {
    return (
      <p role="status">
        Message received. We read every note — even the ones that start with “you got the
        nomination order wrong.”
      </p>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={submitting}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={submitting}
        />
      </label>
      <label>
        Message
        <textarea
          name="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={submitting}
        />
      </label>
      {error ? (
        <p className="field-error" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="subscribe-btn" disabled={submitting}>
        {submitting ? "Sending" : "Send message"}
      </button>
    </form>
  );
}
