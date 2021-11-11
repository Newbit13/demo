import React, { useCallback } from 'react';
import IndexPage from './IndexPage';
import IndexPage2 from './IndexPage2';

export default function Home(){
    return (
        <div>
          <IndexPage />
          <IndexPage2 />
        </div>
    );
}