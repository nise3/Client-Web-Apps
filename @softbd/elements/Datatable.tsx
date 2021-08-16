import {Table} from 'antd';
import React, {useState} from 'react';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import {ColumnsType} from 'antd/lib/table';

type TDatatableProps = {
  bordered?: boolean;
  pagination?: boolean;
  size?: SizeType;
  header?: string;
  footer?: string;
  data: any;
  columns: ColumnsType<[]>;
};

const Datatable: React.FunctionComponent<TDatatableProps> = ({
  columns,
  data,
  bordered = false,
  pagination = true,
  size = 'small',
  header,
  footer,
}) => {
  const [rowSelection, setRowSelection] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      <Table
        bordered={bordered}
        rowSelection={rowSelection}
        size={size}
        pagination={{position: ['bottomRight', 'bottomRight']}}
        columns={columns}
        dataSource={data || null}
      />
    </>
  );
};
export default Datatable;