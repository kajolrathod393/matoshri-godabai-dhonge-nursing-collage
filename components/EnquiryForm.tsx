"use client";

import { useState } from "react";
import Section from "./Section";
import { useCollege } from "./CollegeProvider";
import { useLanguage } from "./LanguageProvider";
import { telLink } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error" | "unavailable";
type FieldErrors = Partial<Record<"name" | "phone" | "email", string[]>>;

const input =
  "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-primary";

/** Admission enquiry form. Saves to MongoDB through POST /api/enquiries. */
export default function EnquiryForm() {
  const { contact, courses } = useCollege();
  const { t, lang, pick } = useLanguage();
  const f = t.enquiryForm;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language: lang }),
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (res.status === 400) {
        setErrors(body.details ?? {});
        setStatus("idle");
      } else {
        setStatus(res.status === 503 ? "unavailable" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  const fieldError = (name: keyof FieldErrors, message: string) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1 text-sm text-red-700">
        {message}
      </p>
    ) : null;

  return (
    <Section id="enquiry" title={f.title} subtitle={f.subtitle}>
      <div className="mx-auto max-w-2xl">
        {status === "sent" ? (
          <div role="status" className="rounded-xl bg-primary-light p-8 text-center">
            <p className="text-lg font-semibold text-primary-dark">{f.sent}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 font-medium text-primary-dark underline underline-offset-4"
            >
              {f.sendAnother}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="enq-name" className="font-medium text-gray-800">
                {f.name} *
              </label>
              <input
                id="enq-name"
                name="name"
                required
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={input}
              />
              {fieldError("name", f.nameError)}
            </div>
            <div>
              <label htmlFor="enq-phone" className="font-medium text-gray-800">
                {f.phone} *
              </label>
              <input
                id="enq-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                required
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={input}
              />
              {fieldError("phone", f.phoneError)}
            </div>
            <div>
              <label htmlFor="enq-email" className="font-medium text-gray-800">
                {f.email}
              </label>
              <input
                id="enq-email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={input}
              />
              {fieldError("email", f.emailError)}
            </div>
            <div>
              <label htmlFor="enq-course" className="font-medium text-gray-800">
                {f.course}
              </label>
              <select id="enq-course" name="course" className={input}>
                {courses.map((c) => (
                  <option key={c.name.en} value={c.name.en}>
                    {pick(c.name)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="enq-stream" className="font-medium text-gray-800">
                {f.stream}
              </label>
              <select id="enq-stream" name="stream" className={input} defaultValue="">
                <option value="">{f.streamChoose}</option>
                <option value="Arts">{f.streamArts}</option>
                <option value="Commerce">{f.streamCommerce}</option>
                <option value="Science">{f.streamScience}</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="enq-village" className="font-medium text-gray-800">
                {f.village}
              </label>
              <input id="enq-village" name="village" autoComplete="address-level2" className={input} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="enq-message" className="font-medium text-gray-800">
                {f.message}
              </label>
              <textarea id="enq-message" name="message" rows={3} className={input} />
            </div>

            {/* Honeypot for bots — hidden from people and screen readers. */}
            <div aria-hidden="true" className="hidden">
              <label htmlFor="enq-website">Website</label>
              <input id="enq-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark disabled:opacity-70 sm:w-auto"
              >
                {status === "sending" ? f.sending : f.submit}
              </button>
              <p className="mt-3 text-sm text-gray-600">{f.privacy}</p>
              {(status === "error" || status === "unavailable") && (
                <p role="alert" className="mt-3 rounded-lg bg-red-50 p-4 text-red-800">
                  {f.failed}{" "}
                  <a href={telLink(contact.phone)} className="font-semibold underline">
                    {contact.phoneDisplay}
                  </a>
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
