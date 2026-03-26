export interface LeadAttribution {
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

const STORAGE_KEY = "leadAttribution";

const emptyAttribution = (): LeadAttribution => ({
  source: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
});

const sanitizeValue = (value: string | null | undefined): string => value?.trim() ?? "";

const isBrowser = (): boolean => typeof window !== "undefined";

export const readTrackingParams = (searchParams: URLSearchParams): LeadAttribution => ({
  source: sanitizeValue(searchParams.get("source")),
  utm_source: sanitizeValue(searchParams.get("utm_source")),
  utm_medium: sanitizeValue(searchParams.get("utm_medium")),
  utm_campaign: sanitizeValue(searchParams.get("utm_campaign")),
});

export const hasTrackingParams = (searchParams: URLSearchParams): boolean => {
  return ["source", "utm_source", "utm_medium", "utm_campaign"].some((key) => searchParams.has(key));
};

export const getStoredAttribution = (): LeadAttribution => {
  if (!isBrowser()) {
    return emptyAttribution();
  }

  try {
    const rawValue = window.sessionStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return emptyAttribution();
    }

    const parsedValue = JSON.parse(rawValue) as Partial<LeadAttribution>;
    return {
      source: sanitizeValue(parsedValue.source),
      utm_source: sanitizeValue(parsedValue.utm_source),
      utm_medium: sanitizeValue(parsedValue.utm_medium),
      utm_campaign: sanitizeValue(parsedValue.utm_campaign),
    };
  } catch {
    return emptyAttribution();
  }
};

export const persistAttribution = (nextAttribution: Partial<LeadAttribution>): LeadAttribution => {
  const storedAttribution = getStoredAttribution();
  const mergedAttribution: LeadAttribution = {
    source: sanitizeValue(nextAttribution.source) || storedAttribution.source,
    utm_source: sanitizeValue(nextAttribution.utm_source) || storedAttribution.utm_source,
    utm_medium: sanitizeValue(nextAttribution.utm_medium) || storedAttribution.utm_medium,
    utm_campaign: sanitizeValue(nextAttribution.utm_campaign) || storedAttribution.utm_campaign,
  };

  if (isBrowser()) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(mergedAttribution));
  }

  return mergedAttribution;
};