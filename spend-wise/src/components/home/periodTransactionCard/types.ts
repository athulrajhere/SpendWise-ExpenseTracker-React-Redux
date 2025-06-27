import { DashboardData } from "../../../features/dashboard/types";

export interface TransactionCardProps {
  dashboard: DashboardData | null;
  navigate: (path: string) => void;
  type: string;
  isLoading: boolean;
}