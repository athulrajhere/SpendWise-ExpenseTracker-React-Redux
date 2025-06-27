import { DashboardData } from "../../../features/dashboard/types";

interface AccountSpendingProps {
  dashboard: DashboardData | null;
  currentSlide: number;
  handleSlideChange: (swiper: { activeIndex: number }) => void;
  navigate: (path: string) => void;
  isLoading: boolean;
}

export default AccountSpendingProps; 