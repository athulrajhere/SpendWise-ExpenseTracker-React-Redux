import React, { useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setDateRange } from "../../features/dashboard/dashboardSlice";
import { getTransactions } from "../../features/transaction/transactionSlice";
import { AppDispatch } from "../../app/store";

interface FilterConfig {
  customHandlers?: Record<string, any>;
  FilterComponent?: React.ComponentType<any>;
  filterComponentProps?: Record<string, any>;
  search?: { key: string };
  category?: { key: string };
  date?: { key: string };
  range?: { key: string };
}

interface WithTableFiltersProps {
  data: any[];
  columns: any[];
  filterConfig?: FilterConfig;
  onRowSelect?: (ids: string[]) => void;
  [key: string]: any;
}

const withTableFilters = (WrappedComponent: React.ComponentType<any>) => {
  return function WithTableFiltersComponent({
    data,
    columns,
    filterConfig = {},
    onRowSelect,
    ...props
  }: WithTableFiltersProps) {
    const [filteredData, setFilteredData] = useState(data);
    const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
    const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

    const dispatch = useDispatch<AppDispatch>();

    const defaultFilterHandlers = useMemo(
      () => ({
        searchFilter: (data: any[], searchValue: string, searchKey = "title") => {
          if (!searchValue) return data;
          return data.filter((item) =>
            item[searchKey].toLowerCase().includes(searchValue.toLowerCase())
          );
        },
        categoryFilter: (
          data: any[],
          selectedCategories: Record<string, boolean>,
          categoryKey = "category"
        ) => {
          if (
            !selectedCategories ||
            Object.keys(selectedCategories).length === 0
          ) {
            return data;
          }

          const activeCategories = Object.entries(selectedCategories)
            .filter(([_, isSelected]) => isSelected)
            .map(([category]) => category);

          if (activeCategories.length === 0) {
            return data;
          }

          return data.filter((item) => {
            const categoryValue = categoryKey
              .split(".")
              .reduce((obj: any, key: string) => obj && obj[key], item);
            return activeCategories.includes(categoryValue);
          });
        },

        dateFilter: (data: any[], { startDate, endDate }: { startDate: Date; endDate: Date }, dateKey = "date") => {
          dispatch(setDateRange({ startDate, endDate }));
          dispatch(getTransactions({ 
            startDate: startDate.toISOString(), 
            endDate: endDate.toISOString() 
          }));

          return data.filter((item) => {
            const itemDate = new Date(item[dateKey]);
            return itemDate >= startDate && itemDate <= endDate;
          });
        },

        rangeFilter: (data: any[], { min, max }: { min: number; max: number }, key = "amount") => {
          if (min === undefined || max === undefined) return data;

          return data.filter((item) => item[key] >= min && item[key] <= max);
        },
      }),
      []
    );

    const filterHandlers = useMemo(
      () => ({
        ...defaultFilterHandlers,
        ...filterConfig.customHandlers,
      }),
      [defaultFilterHandlers, filterConfig.customHandlers]
    );

    const applyFilters = useMemo(
      () => (originalData: any[], filters: Record<string, any>) => {
        let result = originalData;

        Object.entries(filters).forEach(([filterType, filterValue]) => {
          const filterHandler = filterHandlers[`${filterType}Filter`];
          if (filterHandler && filterValue !== undefined) {
            const configKey = filterConfig[filterType as keyof FilterConfig] as { key: string } | undefined;
            result = filterHandler(
              result,
              filterValue,
              configKey?.key
            );
          }
        });

        return result;
      },
      [filterHandlers, filterConfig]
    );

    const updateFilter = useCallback(
      (filterType: string, value: any) => {
        setActiveFilters((prevFilters) => {
          const newFilters =
            value === undefined
              ? { ...prevFilters, [filterType]: undefined }
              : { ...prevFilters, [filterType]: value };

          const cleanedFilters = Object.fromEntries(
            Object.entries(newFilters).filter(([, v]) => v !== undefined)
          );

          const filtered = applyFilters(data, cleanedFilters);
          setFilteredData(filtered);

          return cleanedFilters;
        });
      },
      [data, applyFilters]
    );

    const handleRowSelect = useCallback(
      (ids: string[]) => {
        setSelectedRowIds(ids);
        onRowSelect?.(ids);
      },
      [onRowSelect]
    );

    React.useEffect(() => {
      const filtered = applyFilters(data, activeFilters);
      setFilteredData(filtered);
    }, [data, applyFilters, activeFilters]);

    const filterProps = {
      updateFilter,
      activeFilters,
      data,
    };

    return (
      <div className="filtered-table-container">
        {filterConfig.FilterComponent && (
          <filterConfig.FilterComponent
            {...filterProps}
            {...(filterConfig.filterComponentProps || {})}
          />
        )}

        <WrappedComponent
          data={filteredData}
          columns={columns}
          onRowSelect={handleRowSelect}
          {...props}
        />
      </div>
    );
  };
};

export default withTableFilters;
