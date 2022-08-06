import type { ProTableInstance, HttpResult, EventInstance } from '@ccs-design/rc-pro';
import { CcsModalForm } from '@ccs-design/rc-pro';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import type { FC, RefObject } from 'react';
import React, { useState } from 'react';
import ItemsButton from './ButtonModel';
import ItemsMenu from './MenuModel';
import type { SysMenuTypePartial, UrlAttrType } from './type';
import { saveMenu } from './service';

interface PropsType {
  proRef: RefObject<ProTableInstance>;
  $event: EventInstance<SysMenuTypePartial>;
}

const MenuForm: FC<PropsType> = ({ proRef, $event }) => {
  const [visible, setVisible] = useState(false);

  const record = $event.useSubscription((res) => {
    if (res.menuType === 2) {
      res.buttonUrlId = { urlId: res.buttonUrlId as number, urlName: res.urlName };
    }
    setVisible(!visible);
  });

  const { run, loading } = useRequest<HttpResult>(saveMenu, { manual: true });

  // menu save
  const onSubmit = async (values: SysMenuTypePartial) => {
    let m = values;
    // 从url对象中获取buttonUrlId
    if (values.menuType === 2) {
      m = { ...values, buttonUrlId: (values.buttonUrlId as UrlAttrType).urlId };
    }

    const result = await run(m);
    if (result.success) {
      setVisible(false);
      proRef.current?.onPartialReload(record.parentMenuCode || 0);
      message.success('操作成功');
    }
  };

  return (
    <CcsModalForm
      title={`${record.menuType === 2 ? '按钮' : '菜单'} - ${record.menuCode ? '修改' : '新增'}`}
      onSubmit={onSubmit}
      onCancel={() => setVisible(false)}
      loading={loading}
      renderForm={record.menuType === 2 ? <ItemsButton /> : <ItemsMenu />}
      visible={visible}
      values={record}
      width={600}
    />
  );
};

export default MenuForm;
