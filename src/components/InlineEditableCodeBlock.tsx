import React, { useRef } from 'react';
import { Highlight, type Language } from 'prism-react-renderer';
import { usePrismTheme } from '@docusaurus/theme-common';

interface InlineEditableCodeBlockProps {
  template: string;
  variables: Record<string, string>;
  language?: string;
  showCopyButton?: boolean;
}

const VAR_PREFIX = '__VAR__';
const VAR_SUFFIX = '__';

export default function InlineEditableCodeBlock({
  template,
  variables,
  language = 'bash',
  showCopyButton = true,
}: InlineEditableCodeBlockProps) {
  const prismTheme = usePrismTheme();
  const varRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const normalizedTemplate = template.trim();

  const getVarValue = (name: string) => {
    const el = varRefs.current[name];
    const raw = el?.innerText ?? '';
    const trimmed = raw.trim();
    const fallback = variables[name] ?? '';
    return trimmed || fallback;
  };

  const buildCodeForCopy = () =>
    normalizedTemplate.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_match, varName) =>
      getVarValue(varName),
    );

  const handleCopy = async () => {
    const code = buildCodeForCopy();
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const codeForHighlight = normalizedTemplate.replace(
    /{{\s*([a-zA-Z0-9_]+)\s*}}/g,
    (_match, varName) => `${VAR_PREFIX}${varName}${VAR_SUFFIX}`,
  );

  const focusVariableToEnd = (name: string) => {
    const el = varRefs.current[name];
    if (!el) return;

    el.focus();

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const renderTokenWithVariables = (tokenProps: {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    [key: string]: any;
  }) => {
    const {
      children,
      style: tokenStyle,
      className: tokenClassName,
      ...rest
    } = tokenProps;

    const text = String(children);
    const parts: React.ReactNode[] = [];

    const varRegex = new RegExp(
      `${VAR_PREFIX}([a-zA-Z0-9_]+)${VAR_SUFFIX}`,
      'g',
    );

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = varRegex.exec(text)) !== null) {
      const [fullMatch, varName] = match;
      const matchIndex = match.index;

      if (matchIndex > lastIndex) {
        const before = text.slice(lastIndex, matchIndex);
        parts.push(
          <span
            key={`${lastIndex}-${matchIndex}`}
            {...rest}
            className={tokenClassName}
            style={tokenStyle}
          >
            {before}
          </span>,
        );
      }

      const placeholder = variables[varName] ?? varName;

      parts.push(
        <span
          key={`var-${varName}-${matchIndex}`}
          className="editable-code-var-wrapper"
          data-variable-name={varName}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('.editable-code-var')) {
              return;
            }
            focusVariableToEnd(varName);
          }}
        >
          <span
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            ref={(el) => {
              varRefs.current[varName] = el;
            }}
            className="editable-code-var"
            data-variable-name={varName}
          >
            {placeholder}
          </span>

          <span
            contentEditable={false}
            className="editable-code-var-icon"
            aria-hidden="true"
          >
            ✎
          </span>
        </span>,
      );

      lastIndex = matchIndex + fullMatch.length;
    }

    if (lastIndex < text.length) {
      const after = text.slice(lastIndex);
      parts.push(
        <span
          key={`tail-${lastIndex}`}
          {...rest}
          className={tokenClassName}
          style={tokenStyle}
        >
          {after}
        </span>,
      );
    }

    if (parts.length === 0) {
      return (
        <span {...rest} className={tokenClassName} style={tokenStyle}>
          {text}
        </span>
      );
    }

    return <>{parts}</>;
  };

  return (
    <div
      className="theme-code-block"
      style={{ position: 'relative', margin: '1.5rem 0' }}
    >
      {showCopyButton && (
        <button
          type="button"
          onClick={handleCopy}
          className="button button--sm button--secondary"
          style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        >
          Copy
        </button>
      )}

      <Highlight
        code={codeForHighlight}
        language={language as Language}
        theme={prismTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            <code>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                return (
                  <div key={i} {...lineProps}>
                    {line.map((token, j) => {
                      const tokenProps = getTokenProps({ token, key: j });
                      return (
                        <React.Fragment key={j}>
                          {renderTokenWithVariables(tokenProps)}
                        </React.Fragment>
                      );
                    })}
                  </div>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}