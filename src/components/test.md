---
unlisted: true
---
import InlineEditableCodeBlock from '@site/src/components/InlineEditableCodeBlock';

## Code Block Example

Code block language-aware and with multiple variables

<InlineEditableCodeBlock
  language="yaml"
  template={
  `
    global:
      LogLevel: {{host}}
      LogFileBackups: {{port}}
  `
  }
  variables={{
    host: 'example.teleport.sh',
    port: '443'
  }}
/>

## Editable Command example

Same as above, just a one-liner