import React, { useRef } from 'react';

interface InlineEditableCommandProps {
  /**
   * Command template, e.g. 'curl "https://{{host}}:{{port}}/scripts/install.sh"'
   */
  template: string;

  /**
   * Default values for variables, e.g. variables={{ host: 'example.teleport.sh', port: '443' }}
   */
  variables: Record<string, string>;

  /** Optional language for styling (Prism class). Defaults to "bash". */
  language?: string;
}

export default function InlineEditableCommand({
  template,
  variables,
  language = 'bash',
}: InlineEditableCommandProps) {
  // One ref per variable name
  const varRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const getVarValue = (name: string) => {
    const el = varRefs.current[name];
    const raw = el?.innerText ?? '';
    const trimmed = raw.trim();
    const fallback = variables[name] ?? '';
    return trimmed || fallback;
  };

  const buildCommand = () =>
    template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (match, varName) =>
      getVarValue(varName),
    );

  const handleCopy = async () => {
    const command = buildCommand();
    try {
      await navigator.clipboard.writeText(command);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const renderTemplate = () => {
    const parts: React.ReactNode[] = [];
    const regex = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(template)) !== null) {
      const [fullMatch, varName] = match;
      const matchIndex = match.index;

      // Text before the placeholder
      if (matchIndex > lastIndex) {
        parts.push(template.slice(lastIndex, matchIndex));
      }

      const placeholder = variables[varName] ?? varName;

      parts.push(
        <span
          key={`${varName}-${matchIndex}`}
          contentEditable
          suppressContentEditableWarning
          ref={(el) => {
            varRefs.current[varName] = el;
          }}
          style={{
            color: '#60A6C4',
            background: 'var(--ifm-color-emphasis-0)',
            textDecorationThickness: '1px',
            outline: 'none',
            padding: '0 0.15rem',
            whiteSpace: 'nowrap',
            cursor: 'text',
            borderRadius: '3px',            // optional, cleaner block highlight
          }}
        >
          {placeholder}
        </span>,
      );

      lastIndex = matchIndex + fullMatch.length;
    }

    // Tail text after the last placeholder
    if (lastIndex < template.length) {
      parts.push(template.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div
      className="theme-code-block"
      style={{ position: 'relative', margin: '1.5rem 0' }}
    >
      <button
        type="button"
        onClick={handleCopy}
        className="button button--sm button--secondary"
        style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
        Copy
      </button>

      <pre className={`prism-code language-${language}`}>
        <code>{renderTemplate()}</code>
      </pre>
    </div>
  );
}
