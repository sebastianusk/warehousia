import React from 'react';
import { Button } from 'antd';

import styles from './index.module.css';

interface PageProps {
  page: number;
  prevEnable: boolean;
  nextEnable: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function Page({
  page,
  prevEnable,
  nextEnable,
  onPrev,
  onNext,
}: PageProps): React.ReactElement {
  return (
    <div className={styles.page}>
      <Button disabled={!prevEnable} onClick={onPrev}>
        Prev
      </Button>
      <div className={styles.number}>{page}</div>
      <Button disabled={!nextEnable} onClick={onNext}>
        Next
      </Button>
    </div>
  );
}
