import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Ensure you have moved your 'containers' folder to 'src/containers'
// or update this path to where your components are located.
import {
    Section6,
    Section5,
    Section2,
    CTA,
    HomeHeader,
    Section4,
    ClientsBanner,
    Section3, SectionCTA
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
        <Section2/>
        <Section3 />
        <Section4/>
        <Section5/>
        <Section6/>
        <SectionCTA />
        {/* Footer is handled by Docusaurus Layout */}
      </main>
    </Layout>
  );
}