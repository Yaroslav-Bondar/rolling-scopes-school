export const usersPage: Page = (props = {}) => `
<main-navigation class="main-navigation" data-search-type="user" data-search="${props.query || ''}"></main-navigation>
<list-component data-list-type="user" data-search="${props.query || ''}"></list-component>`;
