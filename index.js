import marked from 'marked';
import css from './index.css';
import hljs from 'highlight.js';

marked.setOptions({
  highlight: (code, lang) => {
    return hljs.highlight(lang, code).value
  }
});


const renderError = (kind, message) => `<div class="${css.error}">
  <strong>${kind}</strong>: ${message}
</div>`

const renderMarkdown = (text) => `<div class="${css.markdown}">
  ${marked(text)}
</div>`

function createStyle(href) {
  const link = document.createElement('link');
  link.href = href;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

export default ({element, params}) => {
  if (!params.url) {
    return {
      html: renderError('Integration Error', 'Markdown URL not provided')
    }
  }

  if (!params.url.startsWith('https://raw.githubusercontent.com/ragu-framework/')) {
    return {
      html: renderError('Integration Error', 'The URL must be ragu-framework markdown')
    }
  }

  return ({
    html: `loading...`,
    connectedCallback: async () => {
      if (params.env === 'dev') {
        createStyle('https://fonts.googleapis.com/css2?family=Lato:wght@100;300&family=Poppins:wght@300;500&display=swap&family=Source+Code+Pro:wght@1;300');
      }
      createStyle('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/atom-one-dark.min.css');
      const response = await fetch(params.url);
      element.innerHTML = renderMarkdown(await response.text());
    }
  });
}
