import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import { useBlogPost } from '@docusaurus/theme-common/internal';
import GiscusComponent from '@site/src/components/GiscusComponent';

export default function BlogPostItemWrapper(props) {
  const { isBlogPostPage } = useBlogPost();
  return (
    <>
      <BlogPostItem {...props} />
      {isBlogPostPage && (
        <div >
          <hr />
          <GiscusComponent />
        </div>
      )}
    </>
  );
}
