import Image from "next/image";
import { useRouter } from "next/router";
import type { FormEvent, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTheme } from "@/shared/context/ThemeContext";
import { useI18n } from "@/i18n/LocaleContext";
import { Icons } from "./icons";

export type SearchSuggestion = {
  href: string;
  label: string;
  meta?: string;
};

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  suggestions?: SearchSuggestion[];
};

const Wrap = styled.div`
  position: relative;
  width: min(420px, 100%);
`;

const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 52px;
  border-radius: 999px;
  padding: 8px 8px 8px 18px;
  border: 3px solid var(--INK);
  box-shadow: 4px 4px 0 var(--INK);
  background: var(--CARD-BACKGROUND);

  input {
    background: transparent;
    width: 100%;
    color: var(--FONT-COLOR);
    font-size: 16px;
  }

  button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--PORTAL-LIME-FILL);
    border: 2px solid var(--INK);
    display: grid;
    place-items: center;
  }
`;

const Suggestions = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 12;
  margin: 0;
  padding: 8px;
  list-style: none;
  border: 3px solid var(--INK);
  border-radius: 18px;
  background: var(--CARD-BACKGROUND);
  box-shadow: 5px 5px 0 var(--INK);

  li button {
    width: 100%;
    text-align: left;
    padding: 8px 10px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    color: var(--FONT-COLOR);
  }

  li button:hover,
  li button[data-active="true"] {
    background: color-mix(in srgb, var(--PORTAL-CYAN) 22%, var(--CARD-BACKGROUND));
  }

  strong {
    font-size: 14px;
    color: var(--FONT-COLOR);
  }

  span {
    font-size: 12px;
    color: var(--FONT-MUTED);
  }
`;

export default function Search({
  value,
  onChange,
  onSubmit,
  loading,
  suggestions = [],
}: SearchProps) {
  const { darkTheme } = useTheme();
  const { t } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(0);
    setOpen(suggestions.length > 0);
  }, [suggestions]);

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setOpen(false);
    onSubmit();
  }

  function pick(href: string) {
    setOpen(false);
    router.push(href);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && suggestions.length) {
      event.preventDefault();
      setOpen(true);
      setActive((current) => (current + 1) % suggestions.length);
      return;
    }
    if (event.key === "ArrowUp" && suggestions.length) {
      event.preventDefault();
      setActive((current) => (current - 1 + suggestions.length) % suggestions.length);
      return;
    }
    if (event.key === "Enter" && open && suggestions[active]) {
      event.preventDefault();
      pick(suggestions[active].href);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      setOpen(false);
      onSubmit();
    }
    if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <Wrap ref={wrapRef}>
      <Container onSubmit={handleSubmit}>
        <input
          id="search"
          type="search"
          placeholder={t.search.placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length && setOpen(true)}
          maxLength={40}
          disabled={loading}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="search-suggestions"
        />
        <button id="doSearch" type="submit" aria-label={t.search.aria}>
          <Image
            src={darkTheme ? Icons.WhiteMagnifyingGlass : Icons.DarkMagnifyingGlass}
            alt=""
            width={20}
            height={20}
          />
        </button>
      </Container>
      {open && suggestions.length > 0 ? (
        <Suggestions id="search-suggestions" role="listbox" aria-label={t.search.suggestions}>
          {suggestions.map((item, index) => (
            <li key={item.href} role="option" aria-selected={index === active}>
              <button
                type="button"
                data-active={index === active}
                onMouseEnter={() => setActive(index)}
                onClick={() => pick(item.href)}
              >
                <strong>{item.label}</strong>
                {item.meta ? <span>{item.meta}</span> : null}
              </button>
            </li>
          ))}
        </Suggestions>
      ) : null}
    </Wrap>
  );
}
