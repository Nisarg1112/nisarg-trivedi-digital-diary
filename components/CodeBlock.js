import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-python';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserHtml from 'prettier/parser-html';
import parserCss from 'prettier/parser-postcss';
import styles from '../styles/blog.module.css';

export default function CodeBlock({ value }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  let formattedCode = value.code;
  const supportedLanguages = ['javascript', 'html', 'css', 'jsx', 'tsx'];
  
  if (supportedLanguages.includes(value.language)) {
    formattedCode = prettier.format(value.code, {
      parser: value.language || 'babel',
      plugins: [parserBabel, parserHtml, parserCss],
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      printWidth: 80
    });
  }

  return (
    <pre className={`${styles.codeBlock} language-${value.language || 'javascript'}`}>
      <code>{formattedCode}</code>
    </pre>
  );
}
