import { Card, Anchor } from 'antd';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';

const { Link } = Anchor;

export interface AnchorProps {}

const DemoAnchor: React.FC<AnchorProps> = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const h = ref.current?.getBoundingClientRect();
      ref.current.style.minHeight = `calc(100vh - ${h.top}px - 10px)`;
    }
  }, []);
  return (
    <>
      <Card title="锚点示例" bordered={false} hoverable bodyStyle={{ padding: 0 }} />
      <div style={{ padding: 10 }}>
        <div style={{ position: 'fixed', right: 0, zIndex: 99 }}>
          <Anchor getContainer={() => document.querySelector('#anchor-content') as any}>
            <Link href="#1" title="Basic demo" />
            <Link href="#2" title="Static demo" />
            <Link href="#3" title="Basic demo with Target" />
            <Link href="#4" title="API">
              <Link href="#4-1" title="Anchor Props" />
              <Link href="#4-2" title="Link Props" />
            </Link>
          </Anchor>
        </div>
        <div id="anchor-content" className={styles.anchor} ref={ref}>
          <Card bodyStyle={{ padding: '120px 20px' }} id="1">
            Basic demo
          </Card>
          <Card bodyStyle={{ padding: '120px 20px' }} id="2">
            Static demo
          </Card>
          <Card bodyStyle={{ padding: '120px 20px' }} id="3">
            Basic demo with Target
          </Card>
          <Card bodyStyle={{ padding: '120px 20px' }} id="4">
            API
          </Card>
          <Card bodyStyle={{ padding: '120px 20px' }} id="4-1">
            Anchor Props
          </Card>
          <Card bodyStyle={{ padding: '120px 20px' }} id="4-2">
            Link Props
          </Card>
        </div>
      </div>
    </>
  );
};

export default DemoAnchor;
