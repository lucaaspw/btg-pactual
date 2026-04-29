import { ClosingCta } from "@/components/shared/ClosingCta";
import { CONCIERGE_WHATSAPP } from "@/constants/concierge";

export function UltrablueClosingCta() {
  return (
    <ClosingCta
      href={CONCIERGE_WHATSAPP.ultrablue}
      sectionClassName="scroll-mt-24 bg-[#10408D] px-5 py-20 text-center lg:px-8"
      titleClassName="text-2xl font-bold text-white md:text-3xl"
      descriptionClassName="mt-4 text-lg text-[#E7EEFF]"
      buttonClassName="mt-8 inline-flex items-center gap-2 bg-[#2E73D4] px-8 py-4 text-white shadow-lg transition hover:bg-[#3A80E4]"
    />
  );
}
