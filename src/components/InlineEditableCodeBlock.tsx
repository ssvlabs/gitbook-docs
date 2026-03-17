import React, { useRef } from 'react';
import { Highlight, type Language } from 'prism-react-renderer';
import { usePrismTheme } from '@docusaurus/theme-common';

interface InlineEditableCodeBlockProps {
  /**
   * Code template, e.g.
   * 'address: {{host}}:{{port}}\ncluster: {{cluster}}'
   */
  template: string;

  /**
   * Default values for variables, e.g.
   * { host: 'example.teleport.sh', port: '443', cluster: 'my-cluster' }
   */
  variables: Record<string, string>;

  /**
   * Prism language id, e.g. "yaml", "bash", "json".
   * Controls syntax highlighting.
   */
  language?: string;

  /** Whether to show the "Copy" button (default: true) */
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
    const normalizedTemplate = template.trim();     // Normalize template: trim leading/trailing whitespace safely
    const getVarValue = (name: string) => {
    const el = varRefs.current[name];
    const raw = el?.innerText ?? '';
    const trimmed = raw.trim();
    const fallback = variables[name] ?? '';
    return trimmed || fallback;
  };

  const buildCodeForCopy = () =>
    normalizedTemplate.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (match, varName) =>
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

  // For syntax highlighting, replace placeholders with sentinel tokens
  const codeForHighlight = normalizedTemplate.replace(
    /{{\s*([a-zA-Z0-9_]+)\s*}}/g,
    (match, varName) => `${VAR_PREFIX}${varName}${VAR_SUFFIX}`,
  );

  const renderTokenWithVariables = (tokenProps: {
    children: React.ReactNode;
    [key: string]: any;
  }) => {
    const { children, ...rest } = tokenProps;
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

      // Normal text before the placeholder
      if (matchIndex > lastIndex) {
        const before = text.slice(lastIndex, matchIndex);
        parts.push(
          <span key={`${lastIndex}-${matchIndex}`} {...rest}>
            {before}
          </span>,
        );
      }

      const placeholder = variables[varName] ?? varName;

      // Editable variable span
      parts.push(
        <span
          key={`var-${varName}-${matchIndex}`}
          contentEditable
          suppressContentEditableWarning
          ref={(el) => {
            varRefs.current[varName] = el;
          }}
          style={{
            ...(rest.style || {}),
            color: '#60A6C4',
            background: 'var(--ifm-color-emphasis-0)',
            textDecorationThickness: '1px',
            outline: 'none',
            padding: '0 0.15rem',
            whiteSpace: 'nowrap',
            cursor: 'text',
            borderRadius: '3px',
          }}
        >
          {placeholder}
        </span>,
      );

      lastIndex = matchIndex + fullMatch.length;
    }

    // Tail after the last placeholder
    if (lastIndex < text.length) {
      const after = text.slice(lastIndex);
      parts.push(
        <span key={`tail-${lastIndex}`} {...rest}>
          {after}
        </span>,
      );
    }

    // If no placeholders, render original token
    if (parts.length === 0) {
      return (
        <span {...rest}>
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
