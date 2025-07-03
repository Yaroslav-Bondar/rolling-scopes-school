export const postsPage: Page = (props = {}) => `
<x-navigation data-search-type="post" data-search="${props.query || ''}"></x-navigation>
<x-posts data-search-value="${props.query || ''}"></x-posts>`;
