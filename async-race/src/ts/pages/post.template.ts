export const postPage: Page = (props = {}) => `
<x-navigation data-search-type="post"></x-navigation>
<post-component ${PostDataAttributes.Id}="${props.post || ''}"></post-component>`;
