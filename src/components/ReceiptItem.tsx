import ReceiptField from './ReceiptField';
import { Button } from './ui/button';

export const ReceiptItem = ({
    id,
    barcode,
    name,
    price,
    disc,
    qty,
    t_price,
    onDeleteItem,
    onEdtiItem,
} : any ) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <tr>
      <td className="min-w-[100px] md:min-w-[150px]">
        <ReceiptField
          onEditItem={(event: any) => onEdtiItem(event)}
          cellData={{
            placeholder: '',
            type: 'text',
            name: 'barcode',
            id: id,
            value: barcode,
          }}
          readonly={false}
        />
      </td>
      <td className="relative w-full">
        <ReceiptField
          onEditItem={(event: any) => onEdtiItem(event)}
          cellData={{
            placeholder: '',
            type: 'text',
            name: 'name',
            id: id,
            value: name,
          }}
          readonly={true}
        />
      </td>
      <td className="min-w-[65px] md:min-w-[70px]">
        <ReceiptField
          onEditItem={(event: any) => onEdtiItem(event)}
          cellData={{
            className: 'text-right',
            type: 'number',
            min: '0.01',
            step: '0.01',
            name: 'price',
            id: id,
            value: price,
          }}
          readonly={true}
        />
      </td>
      <td className="min-w-[85px] md:min-w-[90px] flex">
        <ReceiptField
          onEditItem={(event: any) => onEdtiItem(event)}
          cellData={{
            className: 'text-right',
            type: 'number',
            min: '0.00',
            max: '100.00',
            step: '0.01',
            name: 'disc',
            id: id,
            value: disc,
          }}
          readonly={false}
        />
        <h1>%</h1>
      </td>
      <td className="min-w-[65px] md:min-w-[70px]">
        <ReceiptField
          onEditItem={(event: any) => onEdtiItem(event)}
          cellData={{
            type: 'number',
            min: '1',
            name: 'qty',
            id: id,
            value: qty,
          }}
          readonly={false}
        />
      </td>
      <td className="min-w-[65px] md:min-w-[70px]">
        <ReceiptField
          onEditItem={(event: any) => onEdtiItem(event)}
          cellData={{
            className: 'text-right',
            type: 'number',
            min: '0.01',
            step: '0.01',
            name: 't_price',
            id: id,
            value: t_price,
          }}
          readonly={true}
        />
      </td>
      <td className="flex items-center justify-center">
        <Button
          variant='destructive'
          onClick={deleteItemHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </Button>
      </td>
    </tr>
  );
};
