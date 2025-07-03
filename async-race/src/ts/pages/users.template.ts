export const usersPage: Page = (props = {}) => `
<x-navigation data-search-type="user"></x-navigation>
<x-users data-search-value="${props.query || ''}"></x-users>`;
