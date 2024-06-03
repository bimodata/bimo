import React from 'react';
import Content from '@theme-original/BlogPostItem/Content';
import { useBlogPost } from '@docusaurus/theme-common/internal';

export default function ContentWrapper(props) {
  const { isBlogPostPage } = useBlogPost();
  let children = props.children;
  if (!isBlogPostPage) {
    children = props.children.type.frontMatter.lead ?? props.children;
  }

  return (
    <>
      <Content {...{ ...props, children }} />
    </>
  );
}
