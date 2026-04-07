import type {ReactElement, SVGProps} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

type Pathway = {
  title: string;
  description: string;
  to: string;
  label: string;
  icon: ReactElement;
  iconTone: 'blue' | 'yellow' | 'red' | 'green';
  featured?: boolean;
};

type CardItem = {
  title: string;
  description: string;
  to: string;
};

type SectionData = {
  id: string;
  title: string;
  items: CardItem[];
};

type QuickLinkItem = {
  label: string;
  href: string;
  icon: ReactElement;
};

type SupportItem = {
  title: string;
  description: string;
  href: string;
  action: string;
  icon: ReactElement;
  tone?: 'default' | 'highlight' | 'orange';
};

export function SSVIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="145 104 210 293" fill="none" aria-hidden="true" {...props}>
      <path
        fill="#2DB1FF"
        d="m204.141 337.252 37.927-46.64c3.96-4.869 11.415-4.869 15.375 0l37.928 46.64a9.856 9.856 0 0 1 0 12.445l-37.928 46.64c-3.96 4.87-11.415 4.87-15.375 0l-37.927-46.64a9.856 9.856 0 0 1 0-12.445Z"
        opacity={0.62}
      />
      <path
        fill="#2DB1FF"
        d="m263.064 223.197 37.927-46.64c3.96-4.869 11.415-4.869 15.376 0l37.926 46.64a9.855 9.855 0 0 1 0 12.446l-37.926 46.639c-3.961 4.87-11.416 4.87-15.376 0l-37.927-46.639a9.858 9.858 0 0 1 0-12.446Zm-117.852 0 37.928-46.64c3.96-4.869 11.415-4.869 15.375 0l37.927 46.64a9.858 9.858 0 0 1 0 12.446l-37.927 46.639c-3.96 4.87-11.415 4.87-15.375 0l-37.928-46.639a9.858 9.858 0 0 1 0-12.446Zm58.929-72.899 37.927-46.646c3.96-4.87 11.415-4.87 15.375 0l37.928 46.64a9.856 9.856 0 0 1 0 12.445l-37.928 46.64c-3.96 4.87-11.415 4.87-15.375 0l-37.927-46.634a9.856 9.856 0 0 1 0-12.445Z"
      />
    </svg>
  );
}

function BookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 5.75A2.75 2.75 0 0 1 8.75 3h8.5A1.75 1.75 0 0 1 19 4.75v12.5A1.75 1.75 0 0 1 17.25 19h-8.5A2.75 2.75 0 0 0 6 21.75V5.75Zm0 0A2.75 2.75 0 0 0 3.25 8.5v10A2.25 2.25 0 0 0 5.5 20.75H18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10.33 3.06c.56-1.41 2.78-1.41 3.34 0l.28.71c.22.54.77.88 1.35.84l.76-.05c1.51-.11 2.62 1.8 1.66 2.97l-.48.58c-.37.45-.43 1.08-.16 1.59l.36.66c.72 1.33-.56 2.86-1.98 2.41l-.72-.23c-.55-.18-1.15.02-1.49.48l-.44.61c-.87 1.2-2.76 1.2-3.63 0l-.44-.61c-.34-.46-.94-.66-1.49-.48l-.72.23c-1.42.45-2.7-1.08-1.98-2.41l.36-.66c.27-.51.21-1.14-.16-1.59l-.48-.58c-.96-1.17.15-3.08 1.66-2.97l.76.05c.58.04 1.13-.3 1.35-.84l.28-.71Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.75" r="2.35" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8.5 8.5 4.5 12l4 3.5M15.5 8.5l4 3.5-4 3.5M13.5 5 10.5 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3.5 18.5 7v10L12 20.5 5.5 17V7L12 3.5Zm0 0v7.25m0 0L5.5 7m6.5 3.75L18.5 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function ExplorerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m12 3 2.78 5.63L21 9.54l-4.5 4.38 1.06 6.2L12 17.2l-5.56 2.92 1.06-6.2L3 9.54l6.22-.91L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 9.5h8M8 14.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.75 12h16.5M12 3.5c2.2 2.4 3.5 5.39 3.5 8.5S14.2 18.1 12 20.5M12 3.5c-2.2 2.4-3.5 5.39-3.5 8.5S9.8 18.1 12 20.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03Z" />
    </svg>
  );
}

function BlogIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M17 3a2.827 2.827 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ForumIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5.5 6.25h13A1.25 1.25 0 0 1 19.75 7.5v8A1.25 1.25 0 0 1 18.5 16.75h-7.47L7 20v-3.25H5.5A1.25 1.25 0 0 1 4.25 15.5v-8A1.25 1.25 0 0 1 5.5 6.25Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 10.5h7M8.5 13.25h4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const pathways: Pathway[] = [
  {
    title: 'What is SSV Network?',
    description: 'Learn the core concepts of SSV Network, tokenomics, and related topics.',
    to: '/learn/introduction',
    label: 'Getting started',
    icon: <BookIcon className={styles.pathwaySvg} />,
    iconTone: 'blue',
    featured: true,
  },
  {
    title: 'Integrate with SSV Network',
    description: 'Integrate and onboard validators with our step-by-step guides.',
    to: '/stakers/',
    label: 'Integrate',
    icon: <GearIcon className={styles.pathwaySvg} />,
    iconTone: 'yellow',
  },
  {
    title: 'Develop with SSV Network',
    description: 'Automate validator operations with SSV SDK using our guides and examples.',
    to: '/developers/',
    label: 'Develop',
    icon: <CodeIcon className={styles.pathwaySvg} />,
    iconTone: 'red',
  },
  {
    title: 'Operate SSV Node',
    description: 'Join SSV Network as a node operator and earn fees by securing validator operations.',
    to: '/operators/',
    label: 'Operate',
    icon: <NodeIcon className={styles.pathwaySvg} />,
    iconTone: 'green',
  },
];

const sections: SectionData[] = [
  {
    id: 'integrate',
    title: 'Integrate with SSV Network',
    items: [
      {
        title: 'Stakers Quickstart',
        description: 'Get started and onboard validators to SSV',
        to: '/stakers/',
      },
      {
        title: 'Calculate Costs',
        description: 'Estimate the cost of distributing a validator',
        to: '/stakers/validator-onboarding/calculate-costs',
      },
      {
        title: 'Security',
        description: 'Learn more about SSV Network security',
        to: '/learn/security',
      },
      {
        title: 'Incentivized Mainnet Program',
        description: 'Increase APR by running validators on SSV Network',
        to: '/stakers/incentivized-mainnet',
      },
    ],
  },
  {
    id: 'develop',
    title: 'Develop with SSV Network',
    items: [
      {
        title: 'Developers Quickstart',
        description: 'Start automating validator onboarding on SSV Network',
        to: '/developers/',
      },
      {
        title: 'Integration Tutorials',
        description: 'Follow tutorials and examples to integrate with SSV Network',
        to: '/developers/integration-guides/',
      },
      {
        title: 'SSV SDK',
        description: 'Explore the SSV SDK modules and how to use them',
        to: '/developers/SSV-SDK/',
      },
      {
        title: 'Smart Contracts',
        description: 'Explore our smart contracts and their functions in detail',
        to: '/developers/smart-contracts/',
      },
    ],
  },
];

const quickLinks: QuickLinkItem[] = [
  {
    label: 'ssvlabs/ssv',
    href: 'https://github.com/ssvlabs/ssv',
    icon: <GithubIcon className={styles.quickLinkIcon} />,
  },
  {
    label: 'ssvlabs/ssv-sdk',
    href: 'https://github.com/ssvlabs/ssv-sdk',
    icon: <GithubIcon className={styles.quickLinkIcon} />,
  },
  {
    label: 'ssvlabs/ssv-stack',
    href: 'https://github.com/ssvlabs/ssv-stack',
    icon: <GithubIcon className={styles.quickLinkIcon} />,
  },
  {
    label: 'SSV Explorer',
    href: 'https://explorer.ssv.network/',
    icon: <SSVIcon className={styles.quickLinkIcon} />,
  },
  {
    label: 'SSV Web App',
    href: 'https://app.ssv.network/',
    icon: <SSVIcon className={styles.quickLinkIcon} />,
  },
  {
    label: 'SSV Network',
    href: 'https://ssv.network/',
    icon: <SSVIcon className={styles.quickLinkIcon} />,
  },
];

const supportItems: SupportItem[] = [
  {
    title: 'Join Discord to get support',
    description: 'Chat with the community and get real-time help from the SSV team and fellow builders.',
    href: 'https://discord.gg/5vT22pRBrf',
    action: 'Join Discord',
    icon: <DiscordIcon className={styles.supportActionIcon} />,
    tone: 'highlight',
  },
  {
    title: 'Insights and news from the SSV team',
    description: 'Stay current with the latest updates, announcements, and technical deep-dives from the SSV team.',
    href: 'https://ssv.network/blog/',
    action: 'Read Blog',
    icon: <BlogIcon className={styles.supportActionIcon} />,
  },
  {
    title: 'Participate in discussions on the SSV DAO forum',
    description: 'Join the governance conversation, vote on proposals, and shape the future of SSV Network.',
    href: 'https://forum.ssv.network/',
    action: 'Visit Forum',
    icon: <ForumIcon className={styles.supportActionIcon} />,
    tone: 'orange',
  },
];

function PathwayCard({title, description, to, label, icon, iconTone, featured}: Pathway) {
  return (
    <Link className={`${styles.pathwayCard} ${featured ? styles.pathwayCardFeatured : ''}`} to={to}>
      <div className={`${styles.pathwayIcon} ${styles[`pathwayIcon${iconTone[0].toUpperCase()}${iconTone.slice(1)}`]}`} aria-hidden="true">
        {icon}
      </div>
      <div className={`${styles.cardLabel} ${styles[`cardLabel${iconTone[0].toUpperCase()}${iconTone.slice(1)}`]}`}>{label}</div>
      <Heading as="h2" className={styles.pathwayTitle}>
        {title}
      </Heading>
      <p className={`${styles.cardDescription} ${styles.pathwayDescription}`}>{description}</p>
    </Link>
  );
}

function SectionCard({title, description, to}: CardItem) {
  return (
    <Link className={styles.sectionCard} to={to}>
      <Heading as="h3" className={styles.sectionCardTitle}>
        {title}
      </Heading>
      <p className={`${styles.cardDescription} ${styles.sectionCardDescription}`}>{description}</p>
    </Link>
  );
}

function ContentSection({id, title, items}: SectionData) {
  return (
    <section className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <Heading as="h2" id={id} className={styles.sectionTitle}>
          {title}
        </Heading>
        <div className={styles.sectionDivider} aria-hidden="true" />
      </div>
      <div className={styles.sectionGrid}>
        {items.map((item) => (
          <SectionCard key={item.to} {...item} />
        ))}
      </div>
    </section>
  );
}

export default function HomepageLanding(): ReactElement {
  return (
    <main className={styles.homepage}>
      <div className="container">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <Heading as="h1" className={styles.heroTitle}>
              Build with <span>SSV Network</span>
            </Heading>
            <p className={styles.heroDescription}>
              Use Distributed Validator Technology for secure, decentralized, and scalable staking infrastructure.
            </p>
          </div>
        </section>

        <section className={styles.pathways} aria-label="Primary documentation pathways">
          {pathways.map((pathway) => (
            <PathwayCard key={pathway.title} {...pathway} />
          ))}
        </section>

        {sections.map((section) => (
          <ContentSection key={section.id} {...section} />
        ))}

        <section className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <Heading as="h2" className={styles.sectionTitle}>
              Quick Links
            </Heading>
            <div className={styles.sectionDivider} aria-hidden="true" />
          </div>
          <div className={styles.quickLinks}>
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                className={styles.quickLink}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer">
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <Heading as="h2" className={styles.sectionTitle}>
              Connect with us
            </Heading>
            <div className={styles.sectionDivider} aria-hidden="true" />
          </div>
          <div className={styles.supportGrid}>
            {supportItems.map((item) => (
              <article
                key={item.href}
                className={`${styles.supportCard} ${item.tone ? styles[`supportCard${item.tone[0].toUpperCase()}${item.tone.slice(1)}`] : ''}`}>
                <Heading as="h3" className={`${styles.sectionCardTitle} ${styles.supportTitle}`}>
                  {item.title}
                </Heading>
                <p className={`${styles.cardDescription} ${styles.supportDescription}`}>{item.description}</p>
                <div className={styles.supportFooter}>
                  <Link
                    className={`${styles.supportLink} ${item.tone === 'orange' ? styles.supportLinkOrange : item.tone === 'highlight' ? styles.supportLinkHighlight : styles.supportLinkOutline}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer">
                    {item.icon}
                    <span>{item.action}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
