import { Component, type ErrorInfo, type ReactNode } from "react";
import Image from "next/image";
import styled from "styled-components";
import DarkXCircle from "@/shared/assets/icons/DarkXCircle.svg";

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px 16px;
  border: 3px dashed var(--INK);
  border-radius: 28px;
  text-align: center;
  margin-top: 24px;

  h3 {
    color: var(--CHAOS-PINK);
  }

  p {
    color: var(--FONT-MUTED);
    max-width: 420px;
  }

  button {
    margin-top: 8px;
    padding: 8px 16px;
    border: 3px solid var(--INK);
    border-radius: 999px;
    background: var(--PORTAL-LIME-FILL);
    color: #06101c;
    font-family: var(--FONT-DISPLAY);
    font-weight: 700;
    box-shadow: 3px 3px 0 var(--INK);
  }
`;

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  retryLabel: string;
};

type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <Box role="alert">
        <Image src={DarkXCircle} width={36} height={36} alt="" />
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <button type="button" onClick={() => this.setState({ hasError: false })}>
          {this.props.retryLabel}
        </button>
      </Box>
    );
  }
}
