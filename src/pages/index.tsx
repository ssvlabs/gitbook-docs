import type {ReactElement} from 'react';
import Layout from '@theme/Layout';
import HomepageLanding from '@site/src/components/HomepageLanding';

export default function Home(): ReactElement {
  return (
    <Layout
      title={`SSV Network Documentation`}
      description="Documentation on how to learn about SSV/DVT, build with the SSV SDK, and learn how to become a validator or operator on the network.">
      <HomepageLanding />
    </Layout>
  );
}
