import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Web Javascript',
    description: (
      <>
        Vanilla SDK integration.
      </>
    ),
    buttonText: "WebJs Documentation",
    redirectLink: 'websdk/docs/intro'
  },
  {
    title: 'Google Tag Manager (GTM)',
    description: (
      <>
        SDK Integration using Google Tag Manager (GTM).
      </>
    ),
    buttonText: "GTM Documentation",
     redirectLink: 'gtm/docs/intro'
    
  },
  {
    title: 'Adobe Launch',
    description: (
      <>
        SDK Integration using Adobe Launch.
      </>
    ),
    buttonText: "Adobe Launch Documentation",
     redirectLink: 'adobeLaunch/docs/intro'
    
  },
  {
    title: 'iOS SDK',
    description: (
      <>
        iOS SDK integration.
      </>
    ),
    buttonText: "iOS Documentation",
    redirectLink: 'iossdk/docs/intro'
  },
  {
    title: 'React Native SDK',
    description: (
      <>
        React Native SDK integration.
      </>
    ),
    buttonText: "React Native Documentation",
    redirectLink: 'reactnativesdk/docs/intro'
  },
];

function Feature({title, description, buttonText, redirectLink}) {
  return (
    <div className={styles.featureContainer}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to={redirectLink}>
            {buttonText}
          </Link>
        </div>
      </div>
      
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.docRows}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
