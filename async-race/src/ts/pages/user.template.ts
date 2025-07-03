export const userPage: Page = (props = {}) => `
<x-navigation data-search-type="user"></x-navigation>
<x-user ${UserDataAttributes.Id}="${props.userid || ''}"></x-user>`;
