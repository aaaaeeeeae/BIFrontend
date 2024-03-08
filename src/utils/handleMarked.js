const MarkdownIt = require('markdown-it');
const markdownItPlainText = require('markdown-it-plain-text');

const md = new MarkdownIt().use(markdownItPlainText);

function convertTotext(markdown) {
    return md.render(markdown).replace(/<[^>]*>/gm, '');
}
function convertToObj(markdown) {
    const regex = /```javascript\n?([\s\S]*?)\n?```/gs;
    const cleanedCode = markdown.replace(regex, (match, p1) => {
        const cleanedContent = p1.replace(/option\s*=\s*\{/g, '{');
        return cleanedContent;
    });
    return JSON.parse(cleanedCode);
}
export { convertTotext, convertToObj }