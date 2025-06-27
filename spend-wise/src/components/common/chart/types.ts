export interface ChartData {
  month?: string;
  year?: number;
  expenses?: number;
  incomes?: number;
  title?: string;
  totalAmount?: number;
  icon?: string;
  color?: string;
  date?: string;
  amount?: number;
  transactions?: TransactionData[];
  accountTitle?: string;
  totalBalance?: number;
}

export interface TransactionData {
  title?: string;
  amount?: number;
  date?: string;
  accountTitle?: string;
  totalBalance?: number;
  isIncome?: boolean;
}

export interface ChartOptions {
  tooltip?: any;
  width?: string;
  grid?: any;
  type?: string;
  barWidth?: string;
  margin?: number;
  title?: any;
  color?: string[];
  xAxis?: any;
  yAxis?: any;
  plotOptions?: any;
  itemStyle?: any;
  toolbox?: any;
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  legend?: any;
  series?: any[];
  voidLabelOverlap?: boolean;
}

export interface AccumulatedData {
  year: number;
  month: string;
  value: number;
}

export type ChartType = 'changes' | 'categories' | 'overview-item' | 'line'; 