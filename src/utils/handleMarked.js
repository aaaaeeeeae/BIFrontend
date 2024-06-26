const MarkdownIt = require('markdown-it');
const markdownItPlainText = require('markdown-it-plain-text');

const md = new MarkdownIt().use(markdownItPlainText);

// 消除markdown
function convertTotext(markdown) {
    return md.render(markdown).replace(/<[^>]*>/gm, '');
}
// markdown转换为对象
function convertToObj(markdown) {
    const regex1 = /```javascript\n?([\s\S]*?)\n?```/gs;
    const regex2 = /option\s*=\s*\{/g;
    const cleanedCode = markdown.replace(regex1, '').replace(regex2, '{');
    return JSON.parse(cleanedCode);
}
export { convertTotext, convertToObj }