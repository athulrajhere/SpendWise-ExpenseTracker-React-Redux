import React, { useState, useEffect, useMemo, useCallback } from "react";
import SelectDropdown from "../../components/common/selectDropdown/SelectDropdown";
import DateRangePicker from "../../components/common/datePicker/DateRangePicker";
import MultiRangeSlider from "../../components/common/multiRangeSlider/MultiRangeSlider";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useMediaQuery } from "react-responsive";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectValue {
  [key: string]: boolean;
}

interface TableFiltersProps {
  updateFilter: (filterType: string, value: any) => void;
  activeFilters: any;
  data: any[];
}

const TableFilters: React.FC<TableFiltersProps> = ({
  updateFilter,
  activeFilters,
  data,
}) => {
  const { startDate: globalStartDate, endDate: globalEndDate } = useSelector(
    (state: RootState) => state.dashboard
  );

  const isMobile = useMediaQuery({ maxWidth: 576 });

  const [searchValue, setSearchValue] = useState<string>("");
  const [category, setCategory] = useState<MultiSelectValue | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: globalStartDate,
    endDate: globalEndDate,
  });
  const [minAmount, setMinVal] = useState<number>(0);
  const [maxAmount, setMaxVal] = useState<number>(1000);

  const options = useMemo((): Option[] => {
    const uniqueCategories = new Set<string>();
    data.forEach((item) => {
      if (item.category?.title) {
        uniqueCategories.add(item.category.title);
      }
    });
    return Array.from(uniqueCategories).map((cat) => ({
      value: cat,
      label: cat,
    }));
  }, [data]);

  const amountBounds = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    data.forEach((item) => {
      if (item.amount) {
        min = Math.min(min, item.amount);
        max = Math.max(max, item.amount);
      }
    });
    return { min: Math.floor(min), max: Math.ceil(max) };
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateFilter("search", searchValue || undefined);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchValue, updateFilter]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const handleMultiSelectChange = useCallback(
    (selectedOptions: any) => {
      if (!selectedOptions) {
        setCategory(null);
        updateFilter("category", undefined);
        return;
      }

      const optionsArray = Array.isArray(selectedOptions)
        ? selectedOptions
        : [selectedOptions];
      setCategory(optionsArray[0]);

      if (optionsArray.length > 0) {
        const categoryFilter = optionsArray[0];

        const hasSelectedCategories = Object.values(categoryFilter).some(
          (value) => value === true
        );
        if (hasSelectedCategories) {
          updateFilter("category", categoryFilter);
        } else {
          updateFilter("category", undefined);
        }
      } else {
        updateFilter("category", undefined);
      }
    },
    [updateFilter]
  );

  const handleDateChange = useCallback(
    (start: Date | null, end: Date | null) => {
      if (start && end) {
        setDateRange({ startDate: start, endDate: end });
      }
    },
    []
  );

  const handleDateSubmit = useCallback(() => {
    updateFilter("date", dateRange);
  }, [dateRange, updateFilter]);

  const handleAmountChange = useCallback(
    ({ min, max }: { min: number; max: number }) => {
      setMinVal(min);
      setMaxVal(max);
    },
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (minAmount !== amountBounds.min || maxAmount !== amountBounds.max) {
        updateFilter("range", { min: minAmount, max: maxAmount });
      } else {
        updateFilter("range", undefined);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [minAmount, maxAmount, amountBounds.min, amountBounds.max, updateFilter]);

  useEffect(() => {
    if (amountBounds.min !== Infinity && amountBounds.max !== -Infinity) {
      setMinVal(amountBounds.min);
      setMaxVal(amountBounds.max);
    }
  }, [amountBounds.min, amountBounds.max]);

  return (
    <div className="table-filters">
      <div className="table-select-container">
        <SelectDropdown
          value={category}
          onChange={handleMultiSelectChange}
          placeholder="Select Item"
          options={options}
          label="Category"
          isMulti
          size="fw"
        />
      </div>

      <div className="table-input-container">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="input-primary"
          name="title"
          value={searchValue}
          onChange={handleInputChange}
          placeholder={isMobile ? "Search" : "Search title"}
        />
      </div>

      <div className="table-date-container">
        <label htmlFor="date">Date</label>
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onDateChange={handleDateChange}
          onDateSubmit={handleDateSubmit}
        />
      </div>

      <div className="amount-range-container">
        <MultiRangeSlider
          min={amountBounds.min}
          max={amountBounds.max}
          onChange={handleAmountChange}
          label="Amount"
        />
      </div>
    </div>
  );
};

export default TableFilters;
