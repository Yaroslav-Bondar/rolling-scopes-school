export const postsPage: Page = (props = {}) => `
<main-navigation class="main-navigation" data-search-type="post" data-search="${props.query || ''}"></main-navigation>
<list-component data-list-type="post" data-search="${props.query || ''}"></list-component>`;
