import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroPattern} />
      <div className={styles.heroGlow} />
      <div className={styles.heroContent}>
        <div className="container">
          <div className={styles.logoContainer}>
            <img 
              src="/img/ssv-logo.png" 
              alt="SSV Network" 
              className={styles.logo}
            />
          </div>
          <Heading as="h1" className={styles.heroTitle}>
            Build the Future of Ethereum Staking
          </Heading>
          <p className={styles.heroSubtitle}>
            Distributed Validator Technology for secure, decentralized, and scalable staking infrastructure
          </p>
          <div className={styles.buttonContainer}>
            <Link
              className={clsx('button', styles.heroButton, styles.primary)}
              to="/learn/introduction">
              Start Building
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`SSV Network Documentation`}
      description="Documentation on how to learn about SSV/DVT, build with the SSV SDK, and learn how to become a validator or operator on the network.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
