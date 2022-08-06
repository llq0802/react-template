import { CcsProGrid } from '@ccs-design/rc-pro';
import React, { useState } from 'react';
import TreeSelect from './tree';
import UserList from './user';

export interface TreeTableProps {}

const TreeTable: React.FC<TreeTableProps> = () => {
  const [orgId, setOrgId] = useState<number | null>(null);

  const onSelectOrg = (e: number) => {
    setOrgId(e);
  };

  return (
    <>
      <CcsProGrid title="树表联动">
        <CcsProGrid.Col colSpan={200}>
          <TreeSelect onChange={onSelectOrg} />
        </CcsProGrid.Col>
        <CcsProGrid.Col>
          <UserList orgId={orgId} />
        </CcsProGrid.Col>
      </CcsProGrid>
    </>
  );
};

export default TreeTable;
