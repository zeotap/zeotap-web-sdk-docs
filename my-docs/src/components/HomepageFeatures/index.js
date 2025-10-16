import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// SDK/Integration card data
const FeatureList = [
  {
    title: 'Web Javascript',
    description: 'Vanilla SDK integration.',
    buttonText: 'WebJs Documentation',
    icon: '🌐',
    redirectLink: 'websdk/docs/intro',
  },
  {
    title: 'Google Tag Manager',
    description: 'SDK Integration using Google Tag Manager (GTM).',
    buttonText: 'GTM Documentation',
    icon: '🏷️',
    redirectLink: 'gtm/docs/intro',
  },
  {
    title: 'Adobe Launch',
    description: 'SDK Integration using Adobe Launch.',
    buttonText: 'Adobe Launch Documentation',
    icon: '🅰️',
    redirectLink: 'adobeLaunch/docs/intro',
  },
  {
    title: 'iOS SDK',
    description: 'iOS SDK integration.',
    buttonText: 'iOS Documentation',
    icon: '📱',
    redirectLink: 'iossdk/docs/intro',
  },
  {
    title: 'Android SDK',
    description: 'SDK Integration for Android.',
    buttonText: 'Android SDK Documentation',
    icon: '🤖',
    redirectLink: 'androidsdk/docs/intro',
  },
  {
    title: 'React Native SDK',
    description: 'React Native SDK integration.',
    buttonText: 'React Native Documentation',
    icon: '⚛️',
    redirectLink: 'reactnativesdk/docs/intro',
  },
];

// SDK card component
function FeatureCard({ title, description, buttonText, icon, redirectLink }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
      <Link className="button button--secondary button--md" to={redirectLink}>
        {buttonText}
      </Link>
    </div>
  );
}

// Main homepage features component
export default function HomepageFeatures() {
  return (
    <main>
      <section className={styles.featuresGrid}>
        {FeatureList.map((props, idx) => (
          <FeatureCard key={idx} {...props} />
        ))}
      </section>
    </main>
  );
}
