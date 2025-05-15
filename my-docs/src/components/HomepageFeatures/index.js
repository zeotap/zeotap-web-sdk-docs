import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Identity Resolution',
    description: (
      <>
        Resolve user identities across multiple devices and channels, creating a
        unified view of your customers.
      </>
    ),
  },
  {
    title: 'Privacy-First Approach',
    //Svg: require('@site/static/img/privacy.svg').default, // Replace with your custom SVG
    description: (
      <>
        Built with privacy at its core, the Zeotap SDK ensures compliance with
        global data protection regulations.
      </>
    ),
  },
  {
    title: 'Developer-Friendly',
    //Svg: require('@site/static/img/developer.svg').default, // Replace with your custom SVG
    description: (
      <>
        The SDK is designed for easy integration with clear documentation and examples.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
      </div>
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
