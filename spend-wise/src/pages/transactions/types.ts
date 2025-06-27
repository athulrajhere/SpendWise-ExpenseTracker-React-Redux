export interface Transaction {
    _id: string;
    title: string;
    description: string;
    category: { title: string; icon: string; color: string };
    date: string;
    account: { title: string };
    amount: number;
    isIncome: boolean;
  }
  
  export interface TableColumn {
    header: string;
    accessorKey: string;
    accessorFn?: (row: Transaction) => any;
    cell?: (props: any) => JSX.Element;
    filterFn?: string;
  }
  