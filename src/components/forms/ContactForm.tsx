import { useState, type ChangeEvent, type FormEvent } from "react";
import { useI18n } from "@/i18n";
import { CONTACT } from "@/data/institution";
import Button from "@/components/ui/Button";
import { IconWhatsApp, IconMail } from "@/components/ui/icons";

/**
 * Formulario de contacto general para la comunidad y familias.
 * Prepara y envía las consultas directamente a WhatsApp o cliente de correo institucional.
 */

interface FormValues {
  name: string;
  phone: string;
  email: string;
  destination: string;
  message: string;
  privacy: boolean;
}

const INITIAL: FormValues = {
  name: "",
  phone: "",
  email: "",
  destination: "",
  message: "",
  privacy: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<keyof FormValues, string>>;

export default function ContactForm() {
  const { t } = useI18n();
  const f = t.contact.form;

  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});

  const setField = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const isPrivacy = e.target instanceof HTMLInputElement && e.target.type === "checkbox";
    setValues((v) => ({ ...v, [name]: isPrivacy ? (e.target as HTMLInputElement).checked : value }));
    setErrors((prev) => {
      if (!prev[name as keyof FormValues]) return prev;
      const next = { ...prev };
      delete next[name as keyof FormValues];
      return next;
    });
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = f.required;
    if (!values.email.trim()) next.email = f.required;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = f.invalidEmail;
    if (!values.destination) next.destination = f.required;
    if (!values.message.trim()) next.message = f.required;
    if (!values.privacy) next.privacy = f.required;
    return next;
  };

  const buildMessageBody = () => {
    return [
      `*Consulta desde la web - Parroquia San Francisco de Asís*`,
      `• *Nombre:* ${values.name.trim()}`,
      `• *Email:* ${values.email.trim()}`,
      values.phone.trim() ? `• *Teléfono/WhatsApp:* ${values.phone.trim()}` : null,
      `• *Dirigido a:* ${values.destination}`,
      `\n*Mensaje:*`,
      values.message.trim(),
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleWhatsAppSend = () => {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const message = buildMessageBody();
    const url = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = `Consulta: ${values.name.trim()} (${values.destination})`;
    const body = buildMessageBody();
    const mailtoUrl = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const inputCls = (hasError: boolean) =>
    `w-full rounded-sm border bg-warm-white px-3.5 py-2.5 text-[0.98rem] text-ink placeholder:text-ink-soft/60 transition-colors focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25 ${
      hasError ? "border-red" : "border-line"
    }`;

  const labelCls = "mb-1.5 block text-sm font-bold text-blue-deep";

  const errorFor = (key: keyof FormValues) =>
    errors[key] ? (
      <p id={`error-${key}`} role="alert" className="mt-1.5 text-sm font-semibold text-red">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleEmailSubmit} noValidate className="border border-line bg-warm-white p-6 shadow-inst sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className={labelCls}>
            {f.name} <span aria-hidden className="text-red">*</span>
          </label>
          <input
            id="ct-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={setField}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "error-name" : undefined}
            className={inputCls(Boolean(errors.name))}
          />
          {errorFor("name")}
        </div>

        <div>
          <label htmlFor="ct-phone" className={labelCls}>
            {f.phone}
          </label>
          <input
            id="ct-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={setField}
            className={inputCls(false)}
          />
        </div>

        <div>
          <label htmlFor="ct-email" className={labelCls}>
            {f.email} <span aria-hidden className="text-red">*</span>
          </label>
          <input
            id="ct-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={setField}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
            className={inputCls(Boolean(errors.email))}
          />
          {errorFor("email")}
        </div>

        <div>
          <label htmlFor="ct-dest" className={labelCls}>
            {f.destination} <span aria-hidden className="text-red">*</span>
          </label>
          <select
            id="ct-dest"
            name="destination"
            value={values.destination}
            onChange={setField}
            aria-invalid={Boolean(errors.destination)}
            aria-describedby={errors.destination ? "error-dest" : undefined}
            className={inputCls(Boolean(errors.destination))}
          >
            <option value="">{f.destinationPlaceholder}</option>
            {f.destinationOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errorFor("destination")}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="ct-message" className={labelCls}>
            {f.message} <span aria-hidden className="text-red">*</span>
          </label>
          <textarea
            id="ct-message"
            name="message"
            rows={4}
            value={values.message}
            onChange={setField}
            placeholder={f.messagePlaceholder}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "error-message" : undefined}
            className={inputCls(Boolean(errors.message))}
          />
          {errorFor("message")}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="ct-privacy" className="flex items-start gap-3 text-sm leading-relaxed text-ink">
            <input
              id="ct-privacy"
              name="privacy"
              type="checkbox"
              checked={values.privacy}
              onChange={setField}
              aria-invalid={Boolean(errors.privacy)}
              aria-describedby={errors.privacy ? "error-privacy" : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 accent-(--color-red)"
            />
            <span>{f.privacy}</span>
          </label>
          {errorFor("privacy")}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={handleWhatsAppSend}
          className="bg-green-700 hover:bg-green-800 border-green-800 text-warm-white"
        >
          <IconWhatsApp size={20} />
          {f.submitWhatsApp}
        </Button>
        <Button type="submit" variant="secondary" size="lg">
          <IconMail size={20} />
          {f.submitEmail}
        </Button>
      </div>
    </form>
  );
}
