export const postsByUserPage: Page = (props = {}) => `
<x-navigation data-search-type="post" data-search="${props.query || ''}"></x-navigation>
<x-posts-by-user data-user-id="${props.userid || ''}"></x-posts-by-user>`;
