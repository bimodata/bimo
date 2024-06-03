import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: translate({ message: 'Modulaire', id: 'homepage.feature.1.title' }),
    description: (
      <Translate id="homepage.feature.1.desc">
        Bimo est un assemblage de modules pouvant être utilisés ensemble
        ou séparément selon vos besoins.
      </Translate>
    ),
  },
  {
    title: translate({ message: 'Extensible', id: 'homepage.feature.2.title' }),
    description: (
      <Translate id="homepage.feature.2.desc">
        Grâce à une architecture basée sur l&apos;inversion de contrôle, écrivez des fonctions
        personnalisées et intégrez les facilement dans des traitements de données pré-existants.
      </Translate>
    ),
  },
  {
    title: translate({ message: 'Isomorphe', id: 'homepage.feature.3.title' }),
    description: (
      <Translate id="homepage.feature.3.desc">
        Tous les modules métiers sont isomorphes: vous pouvez les intégrer
        côté client sur une page web, dans un traitement complexe
        sur un serveur en Node.js® ou dans une appli Electron.
      </Translate>
    ),
  },
  // {
  //   title: 'Testé',
  //   description: (
  //     <>
  //       Chaque module est doté de tests automatisés
  //     </>
  //   ),
  // },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      {/* <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div> */}
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
