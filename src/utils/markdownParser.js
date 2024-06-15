import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
}).use(MarkdownItAnchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: ''
})
// 将markdown转换为数组层级（表格用）
export function parseMarkdownForToc(markdownText) {
    const html = md.render(markdownText)
    const dom = new DOMParser().parseFromString(html, 'text/html')
    const headers = dom.querySelectorAll('h1, h2, h3, h4, h5, h6')

    return Array.from(headers).map(header => {  
        const level = parseInt(header.tagName.slice(1), 10)  
        const text = header.textContent.trim()  
        const id = header.getAttribute('id') // markdown-it-anchor adds this ID  
        return { level, text, id }
      })
}

// 将markdown转换为html
export function parseMarkdownForHtml(markdownText) {
    const html = md.render(markdownText)
    return html
}