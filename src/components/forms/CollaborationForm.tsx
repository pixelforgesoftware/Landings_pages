import { useState, type ChangeEvent, type FormEvent } from "react";
import { useI18n } from "@/i18n";
import { CONTACT, WHATSAPP_URL } from "@/data/institution";
import Button from "@/components/ui/Button";

/**
 * Formulario de contacto para colaboradores institucionales.
 * Incluye validación del lado del cliente para campos requeridos y formato de correo.
 */

interface FormValues {
  name: string;
  country: string;
  email: string;
  whatsapp: string;
  organization: string;
  collabType: string;
  project: string;
  message: string;
  privacy: boolean;
}

const INITIAL: FormValues = {
  name: "",
  country: "",
  email: "",
  whatsapp: "",
  organization: "",
  collabType: "",
  project: "",
  message: "",
  privacy: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<keyof FormValues, string>>;

export default function CollaborationForm() {
  const { t } = useI18n();
  const f = t.collaborate.form;

  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [demoNotice, setDemoNotice] = useState(false);

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
    if (!values.country.trim()) next.country = f.required;
    if (!values.email.trim()) next.email = f.required;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = f.invalidEmail;
    if (!values.collabType) next.collabType = f.required;
    if (!values.project) next.project = f.required;
    if (!values.privacy) next.privacy = f.required;
    return next;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // TODO: Conectar con servicio de envío de correos
      setDemoNotice(true);
    } else {
      setDemoNotice(false);
    }
  };

  const inputCls = (hasError: boolean) =>
    `w-full rounded-sm border bg-warm-white px-3.5 py-2.5 text-[0.98rem] text-ink placeholder:text-ink-soft/60 transition-colors focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25 ${
      hasError ? "border-red" : "border-line"
    }`;

  const labelCls = "mb-1.5 block text-sm font-bold text-blue-deep";
  const optional = <span className="font-normal text-ink-soft"> ({f.whatsappOptional})</span>;

  const errorFor = (key: keyof FormValues) =>
    errors[key] ? (
      <p id={`error-${key}`} role="alert" className="mt-1.5 text-sm font-semibold text-red">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="border border-line bg-cream p-5 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            {f.name} <span aria-hidden className="text-red">*</span>
          </label>
          <input
            id="cf-name"
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
          <label htmlFor="cf-country" className={labelCls}>
            {f.country} <span aria-hidden className="text-red">*</span>
          </label>
          <input
            id="cf-country"
            name="country"
            type="text"
            autoComplete="country-name"
            value={values.country}
            onChange={setField}
            aria-invalid={Boolean(errors.country)}
            aria-describedby={errors.country ? "error-country" : undefined}
            className={inputCls(Boolean(errors.country))}
          />
          {errorFor("country")}
        </div>

        <div>
          <label htmlFor="cf-email" className={labelCls}>
            {f.email} <span aria-hidden className="text-red">*</span>
          </label>
          <input
            id="cf-email"
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
          <label htmlFor="cf-whatsapp" className={labelCls}>
            {f.whatsapp} {optional}
          </label>
          <input
            id="cf-whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            value={values.whatsapp}
            onChange={setField}
            className={inputCls(false)}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="cf-org" className={labelCls}>
            {f.organization} {optional}
          </label>
          <input
            id="cf-org"
            name="organization"
            type="text"
            autoComplete="organization"
            value={values.organization}
            onChange={setField}
            className={inputCls(false)}
          />
        </div>

        <div>
          <label htmlFor="cf-type" className={labelCls}>
            {f.collabType} <span aria-hidden className="text-red">*</span>
          </label>
          <select
            id="cf-type"
            name="collabType"
            value={values.collabType}
            onChange={setField}
            aria-invalid={Boolean(errors.collabType)}
            aria-describedby={errors.collabType ? "error-collabType" : undefined}
            className={inputCls(Boolean(errors.collabType))}
          >
            <option value="">{f.selectPlaceholder}</option>
            {f.collabOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errorFor("collabType")}
        </div>

        <div>
          <label htmlFor="cf-project" className={labelCls}>
            {f.project} <span aria-hidden className="text-red">*</span>
          </label>
          <select
            id="cf-project"
            name="project"
            value={values.project}
            onChange={setField}
            aria-invalid={Boolean(errors.project)}
            aria-describedby={errors.project ? "error-project" : undefined}
            className={inputCls(Boolean(errors.project))}
          >
            <option value="">{f.selectPlaceholder}</option>
            {f.projectOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errorFor("project")}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="cf-message" className={labelCls}>
            {f.message} {optional}
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={setField}
            placeholder={f.messagePlaceholder}
            className={inputCls(false)}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="cf-privacy" className="flex items-start gap-3 text-sm leading-relaxed text-ink">
            <input
              id="cf-privacy"
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

      {/* Aviso de confirmación con canales directos */}
      {demoNotice && (
        <div
          role="status"
          className="mt-6 border border-gold/60 bg-gold-soft/70 p-5"
        >
          <p className="font-serif text-lg font-bold text-blue-deep">{f.demoTitle}</p>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">{f.demoText}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href={WHATSAPP_URL} external variant="primary">
              {t.collaborate.national.whatsapp}
            </Button>
            <Button href={`mailto:${CONTACT.email}`} variant="secondary">
              {t.collaborate.national.email}
            </Button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <Button type="submit" variant="primary" size="lg">
          {f.submit}
        </Button>
      </div>
    </form>
  );
}
