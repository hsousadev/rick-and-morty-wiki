import type { Locale } from "@/i18n/messages";

export function statusLabel(status: string, gender?: string, locale: Locale = "pt") {
  const value = status.toLowerCase();
  const en = locale === "en";

  if (value === "alive") {
    if (en) return "Alive";
    if (gender === "Female") return "Viva";
    if (gender === "Male") return "Vivo";
    return "Vivo(a)";
  }

  if (value === "dead") {
    if (en) return "Dead";
    if (gender === "Female") return "Morta";
    if (gender === "Male") return "Morto";
    return "Morto(a)";
  }

  return en ? "Unknown" : "Desconhecido";
}

export function speciesLabel(species: string, locale: Locale = "pt") {
  const en = locale === "en";
  if (!species || species === "unknown") {
    return en ? "Unknown species" : "Espécie desconhecida";
  }
  if (species === "Human") return en ? "Human" : "Humano(a)";
  return species;
}

export function genderLabel(gender: string, locale: Locale = "pt") {
  const en = locale === "en";
  if (gender === "Male") return en ? "Male" : "Masculino";
  if (gender === "Female") return en ? "Female" : "Feminino";
  if (gender === "Genderless") return en ? "Genderless" : "Sem gênero";
  return en ? "Unknown gender" : "Gênero desconhecido";
}

export function originLabel(origin?: string, locale: Locale = "pt") {
  if (!origin || origin === "unknown") {
    return locale === "en" ? "Unknown" : "Desconhecido";
  }
  return origin;
}

export function statusTone(status: string): "alive" | "dead" | "unknown" {
  const value = status.toLowerCase();
  if (value === "alive") return "alive";
  if (value === "dead") return "dead";
  return "unknown";
}
