import React from 'react';
import {Table} from 'antd';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import {ColumnsType} from 'antd/lib/table';

type TDatatableProps = {
  loading?: boolean;
  bordered?: boolean;
  pagination?: boolean;
  size?: SizeType;
  header?: string;
  footer?: string;
  data: any;
  rowKey?: string;
  columns: ColumnsType<[]>;
  rowSelection?: any;
};

const Datatable: React.FunctionComponent<TDatatableProps> = ({
  data,
  pagination = true,
  header,
  footer,
  ...props
}) => {
  return (
    <>
      <Table
        {...props}
        pagination={{position: ['bottomRight', 'bottomRight']}}
        dataSource={data || null}
      />
    </>
  );
};
export default Datatable;
