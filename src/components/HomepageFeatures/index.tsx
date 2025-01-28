import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Decentralized Staking',
    description: (
      <>
        <strong>Secure & Distributed</strong> validator operations through DVT technology. 
        Split your validator key across multiple operators for enhanced security 
        and true decentralization.
      </>
    ),
  },
  {
    title: 'Developer Tools',
    description: (
      <>
        <strong>Comprehensive SDK</strong> and tooling to build the next generation 
        of staking applications. Integrate SSV seamlessly with our developer-first 
        approach.
      </>
    ),
  },
  {
    title: 'Enterprise Ready',
    description: (
      <>
        <strong>Production Grade Infrastructure</strong> for institutional staking needs. 
        Leverage our battle-tested network of operators with built-in redundancy 
        and monitoring.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={styles.featuresGlow} />
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
