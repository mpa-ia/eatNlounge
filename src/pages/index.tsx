import Head from 'next/head';
import React from 'react';
import { content } from '../settings';

export default function Home(): React.ReactElement {
  return (
    <div>
      <Head>
        <title>{content.general.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
