import React from 'react';
import * as Space from './Tables.style';
interface Props {
	tables: Bookings.Table[];
	onSelect: (tableId: string) => void;
}

function Tables(props: Props):React.ReactElement {
  return (
    <Space.Room>
      {props.tables.map(table =>
        <Space.Table
          key={table.id}
          occupied={!table.isFree}
          selected={table.selected}
          onClick={props.onSelect.bind(null, table.id)}
        >
          {table.id}
        </Space.Table>,
      )}
    </Space.Room>
  );
}

export default Tables;
