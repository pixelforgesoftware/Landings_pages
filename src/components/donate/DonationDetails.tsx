import { useState } from "react";
import { useI18n } from "@/i18n";
import { IOR_DONATION } from "@/data/institution";
import { IconCheck, IconCopy } from "@/components/ui/icons";

/**
 * Información bancaria para donaciones y transferencias internacionales (IOR).
 * Permite copiar códigos IBAN y SWIFT al portapapeles.
 */

function CopyField({ label, value, copyLabel, copiedLabel }: {
  label: string;
  value: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Portapapeles no disponible: el dato sigue visible y seleccionable */
    }
  };

  return (
    <div className="flex flex-col gap-2 border-b border-line/80 py-3.5 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <dt className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-gold">{label}</dt>
        {/* break-all: los códigos largos (IBAN/SWIFT) no rompen el layout móvil */}
        <dd className="mt-1 break-all font-semibold text-blue-deep">{value}</dd>
      </div>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex min-h-[38px] shrink-0 items-center gap-1.5 self-start rounded-sm border px-3 py-1.5 text-xs font-bold transition-colors sm:self-center ${
          copied
            ? "border-gold bg-gold-soft text-blue-deep"
            : "border-line bg-cream text-blue hover:border-gold"
        }`}
      >
        {copied ? <IconCheck size={14} aria-hidden /> : <IconCopy size={14} aria-hidden />}
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}

export default function DonationDetails() {
  const { t } = useI18n();
  const intl = t.collaborate.international;
  const d = IOR_DONATION;

  const simpleRow = (label: string, value: string) => (
    <div className="border-b border-line/80 py-3.5 last:border-0">
      <dt className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-gold">{label}</dt>
      <dd className="mt-1 font-semibold text-blue-deep">{value}</dd>
    </div>
  );

  return (
    <div className="overflow-hidden border border-gold/50 bg-warm-white">
      {/* Aviso importante antes de los datos */}
      <div className="border-b border-gold/40 bg-gold-soft/70 px-5 py-5 sm:px-7">
        <h4 className="font-serif text-lg font-bold text-blue-deep">{intl.warningTitle}</h4>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink">{intl.warningText}</p>
        <ul className="mt-3 grid gap-2">
          {d.destinations.map((dest, i) => (
            <li key={dest} className="flex items-start gap-2.5 text-[0.95rem] font-semibold text-blue-deep">
              {i > 0 && (
                <span aria-hidden className="sr-only">
                  {intl.or}
                </span>
              )}
              <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-gold" />
              <span>
                {i > 0 && <em className="mr-2 font-serif text-sm font-normal text-gold">{intl.or}</em>}
                {dest}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="px-5 py-5 sm:px-7">
        {simpleRow(intl.labels.holder, d.holder)}
        {simpleRow(intl.labels.institution, d.institution)}
        <CopyField label={intl.labels.account} value={d.account} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
        <CopyField label={intl.labels.iban} value={d.iban} copyLabel={t.common.copy} copiedLabel={t.common.copied} />
        <CopyField
          label={intl.labels.swift}
          value={`${d.swift} (${d.swiftAlt})`}
          copyLabel={t.common.copy}
          copiedLabel={t.common.copied}
        />
        {simpleRow(intl.labels.concept, d.concept)}
        <div className="border-b border-line/80 py-3.5 last:border-0">
          <dt className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-gold">
            {intl.labels.address}
          </dt>
          <dd className="mt-1 font-semibold leading-relaxed text-blue-deep">
            {d.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </div>
  );
}
