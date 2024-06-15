<template>
    <div @mouseover="showScrollbar" @mouseout="hideScrollbar" @click="toggleScrollbar"
        :class="{ warrap: true, activeScroll: isScrollbarVisible }">
        <aside>
            <ul class="catalog-content">
                <li v-for="(item, index) in catalog" :key="index">
                    <a :href="`#${item.id}`" @click.prevent="scrollToElement(item.id, index)"
                        :class="`item item-level-${item.level} ${index === activeIndex ? 'active-toc-link' : ''}`">
                        {{ item.text }}
                    </a>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
import { parseMarkdownForToc } from '../utils/markdownParser'
export default {
    name: '',
    data() {
        return {
            catalog: [],
            activeIndex: 0,
            isScrollbarVisible: false
        }
    },
    methods: {
        scrollToElement(id, index) {
            const element = document.getElementById(id)
            if (element) {
                const rect = element.getBoundingClientRect()
                const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
                const elementOffsetTop = rect.top + offset
                const centerOffset = window.innerHeight / 2 - rect.height / 2
                const scrollTarget = elementOffsetTop - centerOffset
                window.scrollTo({
                    top: scrollTarget,
                    behavior: 'smooth'
                })
                this.activeIndex = index

            }
        },
        showScrollbar() {
            this.isScrollbarVisible = true;
        },
        hideScrollbar() {
            this.isScrollbarVisible = false;
        },
        toggleScrollbar() {
            this.isScrollbarVisible = !this.isScrollbarVisible;
        }
    },
    props: ['content'],
    watch: {
        content(newVal) {
            this.content = newVal
            this.catalog = parseMarkdownForToc(newVal)
        }
    }
}
</script>

<style lang="less" scoped>
.warrap {
    position: fixed;
    top: 20%;
    right: 3%;
    width: 200px;
    height: 300px;
    overflow: hidden;
    transition: overflow 0.3s ease;
    margin: 3px 0px;
    background-color: white;

    .catalog-content {
        padding: 0;
        margin: 0;
        list-style: none;

        .item {
            padding: 7px 5px;
            cursor: pointer;
            display: block;
            color: black;
            font-size: 13px;
            text-decoration: none;
            border-left: 2px solid #edeff2;
            box-sizing: border-box;

            &:hover {
                color: #53a8ff;
            }
        }
    }
}

.activeScroll {
    overflow: scroll;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }
}

.active-toc-link {
    font-weight: 600;
    background-color: #d9ecff !important;
    color: black !important;
    border-left: 2px solid #79bbff !important;
}

.generate-level(@index) when (@index > 0){
    .item-level-@{index} {
        padding-left: (@index * 10px) !important;
    }
    .generate-level(@index - 1)
}
.generate-level(6);
</style>
