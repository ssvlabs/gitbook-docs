import type {ReactElement, SVGProps} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

type InternalLink = {
  to: string;
  href?: never;
};

type ExternalLink = {
  href: string;
  to?: never;
};

type LinkTarget = InternalLink | ExternalLink;

type Pathway = InternalLink & {
  title: string;
  description: string;
  label: string;
  icon: ReactElement;
  iconTone: 'blue' | 'yellow' | 'red' | 'green';
  titleHoverTone?: 'default' | 'green' | 'yellow' | 'red';
};

type ToolItem = InternalLink & {
  title: string;
  description: string;
  icon: ReactElement;
};

type OperationItem = InternalLink & {
  title: string;
  icon: ReactElement;
};

type SecurityLinkItem = LinkTarget & {
  title: string;
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

function getLinkProps(target: LinkTarget) {
  if ('href' in target) {
    return {
      href: target.href,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  return {to: target.to};
}

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

function ApiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function DiamondIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 4 20 12 12 20 4 12 12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function ContractIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M8 4.75h8.5A1.75 1.75 0 0 1 18.25 6.5v11A1.75 1.75 0 0 1 16.5 19.25H7.5A1.75 1.75 0 0 1 5.75 17.5v-11A1.75 1.75 0 0 1 7.5 4.75H8Zm1 4h6M9 12h6M9 15.5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function OperationKeyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="8.5" cy="11.5" r="3.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11.75 11.5H20m-3 0v2.5m-3-2.5v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OperationKeySharesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="5" y="5" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m9.25 9.25 5.5 5.5m0-5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function OperationPlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function OperationArrowDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 4.5v11m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 19.5h12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function OperationBalanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 4.5v15" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M7 7.5h10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="m7 7.5-3 5.25h6L7 7.5Zm10 0-3 5.25h6L17 7.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 19.5h7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function OperationExitIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M10 5.5H6.75A1.75 1.75 0 0 0 5 7.25v9.5c0 .97.78 1.75 1.75 1.75H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 8.5 17 12m0 0-4 3.5M17 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 5.5h2.25c.97 0 1.75.78 1.75 1.75v9.5A1.75 1.75 0 0 1 17.25 18.5H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OperationRemoveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5.5 7.5h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 4.75h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 7.5v9.25c0 .97.78 1.75 1.75 1.75h4.5A1.75 1.75 0 0 0 16 16.75V7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const pathways: Pathway[] = [
  {
    title: 'Onboarding Guides',
    description: 'Migrate and register validators with our step-by-step guides.',
    to: '/stakers/',
    label: 'Integrate',
    icon: <BookIcon className={styles.pathwaySvg} />,
    iconTone: 'blue',
  },
  {
    title: 'Calculate Costs',
    description: 'Estimate the cost of running a distributed validator.',
    to: '/stakers/validator-onboarding/calculate-costs',
    label: 'Plan',
    icon: <GearIcon className={styles.pathwaySvg} />,
    iconTone: 'yellow',
    titleHoverTone: 'yellow',
  },
  {
    title: 'Incentivized Mainnet Program',
    description: 'Increase APR by running validators on SSV Network.',
    to: '/developers/',
    label: 'Earn',
    icon: <CodeIcon className={styles.pathwaySvg} />,
    iconTone: 'red',
    titleHoverTone: 'red',
  },
  {
    title: 'Operate SSV Node',
    description: 'Join SSV Network as a node operator and earn fees by securing validator operations.',
    to: '/operators/',
    label: 'Operate',
    icon: <NodeIcon className={styles.pathwaySvg} />,
    iconTone: 'green',
    titleHoverTone: 'green',
  },
];

const developerTools: ToolItem[] = [
  {
    title: 'SDK',
    description: 'TypeScript SDK to automate validator and cluster operations.',
    to: '/developers/SSV-SDK/',
    icon: <GearIcon className={styles.toolSvg} />,
  },
  {
    title: 'Subgraph',
    description: 'GraphQL queries of indexed SSV Network — clusters, operators, validators.',
    to: '/developers/api/ssv-subgraph',
    icon: <DiamondIcon className={styles.toolSvg} />,
  },
  {
    title: 'Smart Contracts',
    description: 'SSV Network contracts — addresses, ABIs, function references, source code.',
    to: '/developers/smart-contracts/',
    icon: <ContractIcon className={styles.toolSvg} />,
  },
  {
    title: 'Testnet',
    description: 'Resources for testing validator flows and integrations safely on Hoodi.',
    to: '/developers/testnet',
    icon: <ApiIcon className={styles.toolSvg} />,
  },
];

const commonOperations: OperationItem[] = [
  {
    title: 'Create validator keys',
    to: '/developers/examples/create-validator-keys',
    icon: <OperationKeyIcon className={styles.operationIconSvg} />,
  },
  {
    title: 'Generate key shares',
    to: '/developers/examples/generate-and-validate-keyshares',
    icon: <OperationKeySharesIcon className={styles.operationIconSvg} />,
  },
  {
    title: 'Register validator',
    to: '/developers/examples/register-validator',
    icon: <OperationPlusIcon className={styles.operationIconSvg} />,
  },
  {
    title: 'Deposit ETH',
    to: '/developers/examples/deposit-eth',
    icon: <OperationArrowDownIcon className={styles.operationIconSvg} />,
  },
  {
    title: 'Cluster Balance',
    to: '/developers/examples/cluster-balance-script',
    icon: <OperationBalanceIcon className={styles.operationIconSvg} />,
  },
  {
    title: 'Exit validator',
    to: '/developers/examples/exit-validator',
    icon: <OperationExitIcon className={styles.operationIconSvg} />,
  },
  {
    title: 'Remove validator',
    to: '/developers/examples/remove-validator',
    icon: <OperationRemoveIcon className={styles.operationIconSvg} />,
  },
];

const securityLinks: SecurityLinkItem[] = [
  {
    title: 'All audit reports',
    to: '/developers/security/audits',
    icon: <FileIcon className={styles.securityLinkIcon} />,
  },
  {
    title: 'Smart contracts',
    href: 'https://github.com/ssvlabs/ssv-network',
    icon: <ContractIcon className={styles.securityLinkIcon} />,
  },
  {
    title: 'SSV node',
    href: 'https://github.com/ssvlabs/ssv',
    icon: <NodeIcon className={styles.securityLinkIcon} />,
  },
];

const supportItems: SupportItem[] = [
  {
    title: 'Join the community on Discord',
    description: 'Chat with the community and get in contact with the fellow builders and the SSV team.',
    href: 'https://discord.gg/5vT22pRBrf',
    action: 'Join Discord',
    icon: <DiscordIcon className={styles.supportActionIcon} />,
    tone: 'highlight',
  },
  {
    title: 'Get insights from the SSV team',
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

function PathwayCard({title, description, to, label, icon, iconTone, titleHoverTone}: Pathway) {
  return (
    <Link className={styles.pathwayCard} to={to}>
      <div className={`${styles.pathwayIcon} ${styles[`pathwayIcon${iconTone[0].toUpperCase()}${iconTone.slice(1)}`]}`} aria-hidden="true">
        {icon}
      </div>
      <div className={`${styles.cardLabel} ${styles[`cardLabel${iconTone[0].toUpperCase()}${iconTone.slice(1)}`]}`}>{label}</div>
      <Heading
        as="h2"
        className={`${styles.pathwayTitle} ${titleHoverTone === 'green' ? styles.pathwayTitleHoverGreen : ''} ${titleHoverTone === 'yellow' ? styles.pathwayTitleHoverYellow : ''} ${titleHoverTone === 'red' ? styles.pathwayTitleHoverRed : ''}`}>
        {title}
      </Heading>
      <p className={`${styles.cardDescription} ${styles.pathwayDescription}`}>{description}</p>
    </Link>
  );
}

function DeveloperToolCard({title, description, to, icon}: ToolItem) {
  return (
    <Link className={styles.sectionCard} to={to}>
      <div className={styles.toolIcon} aria-hidden="true">
        {icon}
      </div>
      <Heading as="h3" className={styles.sectionCardTitle}>
        {title}
      </Heading>
      <p className={`${styles.cardDescription} ${styles.sectionCardDescription}`}>{description}</p>
    </Link>
  );
}

function SectionHeader({title, note}: {title: string; note?: string}) {
  return (
    <div className={styles.sectionHeader}>
      <Heading as="h2" className={styles.sectionTitle}>
        {title}
      </Heading>
      {note ? <p className={styles.sectionNote}>{note}</p> : <div className={styles.sectionDivider} aria-hidden="true" />}
    </div>
  );
}

export default function HomepageLanding(): ReactElement {
  return (
    <main className={styles.homepage}>
      <div className="container">
        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <Heading as="h1" className={styles.heroTitle}>
                Build with <span>SSV Network</span>
              </Heading>
              <p className={styles.heroDescription}>
                Onboard validators across distributed operators using the SSV SDK, API, subgraph, and smart contracts.
              </p>
              <div className={styles.heroActions}>
                <Link className={`${styles.heroButton} ${styles.heroButtonPrimary}`} to="/developers/">
                  Quickstart →
                </Link>
                <Link className={`${styles.heroButton} ${styles.heroButtonSecondary}`} to="/learn/introduction">
                  Introduction →
                </Link>
              </div>
            </div>
            <pre className={styles.heroCodeBlock}>
              <span className={styles.heroCodeComment}>// Onboard a validator across 4 SSV operators</span>
              {'\n'}
              <span className={styles.heroCodeKeyword}>import</span> {'{'} SSVSDK {'}'} <span className={styles.heroCodeKeyword}>from</span>{' '}
              <span className={styles.heroCodeString}>'@ssv-labs/ssv-sdk'</span>
              {'\n\n'}
              <span className={styles.heroCodeKeyword}>const</span> <span className={styles.heroCodeVariable}>ssv</span> = <span className={styles.heroCodeKeyword}>new</span> SSVSDK({'{'} publicClient, walletClient{' '}
              <span className={styles.heroCodeString}></span>{'}'})
              {'\n'}
              <span className={styles.heroCodeKeyword}>await</span> <span className={styles.heroCodeVariable}>ssv</span>.cluster.register({'{'} owner, operators, keyShares {'}'})
            </pre>
          </div>
        </section>

        <section className={styles.contentSection}>
          <SectionHeader title="Developer tools" />
          <div className={styles.sectionGrid}>
            {developerTools.map((item) => (
              <DeveloperToolCard key={item.to} {...item} />
            ))}
          </div>
        </section>

        <section className={styles.contentSection}>
          <SectionHeader title="Common operations" />
          <div className={styles.operationsList}>
            {commonOperations.map((item) => (
              <Link key={item.to} className={styles.operationPill} to={item.to}>
                <span className={styles.operationIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.contentSection} aria-label="Primary documentation pathways">
          <SectionHeader title="Integrate with SSV Network" />
          <div className={styles.pathways}>
            {pathways.map((pathway) => (
              <PathwayCard key={pathway.title} {...pathway} />
            ))}
          </div>
        </section>

        <section className={styles.contentSection}>
          <SectionHeader title="Security" />
          <div className={styles.securityGrid}>
            <Link className={styles.securityPrimaryCard} to="https://immunefi.com/bounty/ssvnetwork/">
              <span className={styles.securityBadge}>
                <ShieldCheckIcon className={styles.securityBadgeIcon} />
                Immunefi · Bug bounty
              </span>
              <Heading as="h3" className={styles.securityPrimaryTitle}>
                Found a vulnerability?
              </Heading>
              <p className={styles.securityPrimaryText}>
                SSV Network runs an active bug bounty program on Immunefi. Critical issues earn substantial rewards — responsible disclosure only.
              </p>
              <div className={styles.securityRewardWrap}>
                <div className={styles.securityReward}>Up to $250K</div>
                <div className={styles.securityRewardMeta}>per critical finding</div>
              </div>
              <div className={styles.securityPrimaryCta}>View program →</div>
            </Link>

            <article className={styles.securitySideCard}>
              <Heading as="h3" className={styles.securitySideTitle}>
                Audits &amp; source
              </Heading>
              <p className={styles.securitySideText}>
                SSV Network has been audited multiple times across the protocol, contracts, DKG, and node implementations.
              </p>
              <div className={styles.securityLinks}>
                {securityLinks.map((item) => (
                  <Link key={item.title} className={styles.securityLink} {...getLinkProps(item)}>
                    {item.icon}
                    <span className={styles.securityLinkTitle}>{item.title}</span>
                    <span className={styles.securityLinkArrow}>→</span>
                  </Link>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className={styles.contentSection}>
          <SectionHeader title="Connect" />
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
