import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Ensure you have moved your 'containers' folder to 'src/containers'
// or update this path to where your components are located.
import {
    WingsSection,
    UnlockThePower,
    HomeHaveYouEver,
    CTA,
    HomeHeader,
    SupportedFormats,
    ClientsBanner
} from "../containers";

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Award-winning modern data processing in C++20">
      <main>
        {/* Nav is handled by Docusaurus Layout */}
        <HomeHeader/>
        <ClientsBanner />
        <HomeHaveYouEver/>
        <SupportedFormats/>
        <UnlockThePower/>
        <WingsSection/>
        {/* <CTA/> */}
        {/* Footer is handled by Docusaurus Layout */}
      </main>
    </Layout>
  );
}