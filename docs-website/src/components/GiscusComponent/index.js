import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();
  const { currentLocale } = useDocusaurusContext().i18n;
  return (
    <Giscus
      repo="bimodata/bimo"
      repoId="R_kgDOJItDIQ"
      category="Announcements"
      categoryId="DIC_kwDOJItDIc4Cfxoo"
      mapping="title"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode}
      lang={currentLocale}
      loading="lazy"
      crossorigin="anonymous"
      async
    />
  );
}
