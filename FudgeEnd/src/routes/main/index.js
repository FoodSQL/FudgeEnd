import React from 'react';
import Layout from '../../components/Layout';
import Main from './Main';

const title = 'Log In';

const data = [
  { one: 'one', two: 'two', three: 'three' },
  { one: 'uno', two: 'dos', three: 'tres' },
  { one: 'ichi', two: 'ni', three: 'san' }
];

function action() {
  return {
    chunks: ['login'],
    title,
    component: (
      <Layout>
        <Main title={title} ingredients={data}/>
      </Layout>
    ),
  };
}

export default action;
