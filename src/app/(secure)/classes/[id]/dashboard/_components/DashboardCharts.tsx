import React, { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, PieChart } from 'lucide-react';
import { useI18n } from '@/i18n';
import { LecturerDashboardResponse } from '@/utils/types/classes.type';

export function DashboardCharts({ dashboard }: { dashboard: LecturerDashboardResponse | undefined }) {
  const { t } = useI18n();
  const importExportChartRef = useRef<ReactECharts>(null);
  const completionRateChartRef = useRef<ReactECharts>(null);
  const scoreDistributionChartRef = useRef<ReactECharts>(null);

  // Dùng ref thay vì state để tránh re-render không cần thiết
  const chartsReadyRef = useRef({
    importExport: false,
    completionRate: false,
    scoreDistribution: false,
  });

  // Ref để ngăn chặn việc gọi resize liên tục
  const isResizingRef = useRef(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const chartTheme = {
    color: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'Inter, sans-serif' },
  };

  // Hàm resize an toàn với cơ chế chống trùng lặp
  const safeResizeCharts = () => {
    // Nếu đang trong quá trình resize, bỏ qua
    if (isResizingRef.current) return;

    // Đặt flag đang resize
    isResizingRef.current = true;

    // Xóa timeout cũ nếu có
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    // Đặt timeout mới
    resizeTimeoutRef.current = setTimeout(() => {
      window.requestAnimationFrame(() => {
        try {
          if (importExportChartRef.current?.getEchartsInstance() && chartsReadyRef.current.importExport) {
            importExportChartRef.current.getEchartsInstance().resize();
          }
          if (completionRateChartRef.current?.getEchartsInstance() && chartsReadyRef.current.completionRate) {
            completionRateChartRef.current.getEchartsInstance().resize();
          }
          if (scoreDistributionChartRef.current?.getEchartsInstance() && chartsReadyRef.current.scoreDistribution) {
            scoreDistributionChartRef.current.getEchartsInstance().resize();
          }
        } catch (error) {
          console.error('Error resizing charts:', error);
        } finally {
          // Bỏ flag đang resize
          isResizingRef.current = false;
        }
      });
    }, 250); // Delay dài hơn để tránh resize quá thường xuyên
  };

  // Theo dõi thay đổi kích thước cửa sổ
  useEffect(() => {
    const handleResize = () => {
      // Chỉ resize khi cửa sổ thực sự thay đổi kích thước
      if (!isResizingRef.current) {
        safeResizeCharts();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Xử lý sự kiện sidebar toggle của shadcn
  useEffect(() => {
    // Các element của sidebar để theo dõi
    const possibleSidebarSelectors = [
      '.sidebar',
      '[role="complementary"]',
      '[data-state="open"]',
      '[data-state="closed"]',
      '.fixed',
      '.drawer',
    ];

    let sidebarEls: HTMLElement[] = [];

    // Tìm các element sidebar
    possibleSidebarSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        sidebarEls.push(el as HTMLElement);
      });
    });

    // Resize timeout làm trễ
    let sidebarToggleTimeout: NodeJS.Timeout | null = null;

    // Mutation Observer để theo dõi thay đổi
    const mutationCallback = (mutations: MutationRecord[]) => {
      // Kiểm tra xem có phải class hoặc style đã thay đổi
      const hasRelevantChanges = mutations.some(
        (mutation) =>
          mutation.type === 'attributes' &&
          (mutation.attributeName === 'class' ||
            mutation.attributeName === 'style' ||
            mutation.attributeName === 'data-state'),
      );

      if (hasRelevantChanges && !isResizingRef.current) {
        // Xóa timeout cũ nếu có
        if (sidebarToggleTimeout) {
          clearTimeout(sidebarToggleTimeout);
        }

        // Đặt timeout mới với trễ lâu hơn để đảm bảo animation đã hoàn thành
        sidebarToggleTimeout = setTimeout(() => {
          safeResizeCharts();
        }, 400);
      }
    };

    const mutationObserver = new MutationObserver(mutationCallback);

    // Theo dõi mỗi sidebar element
    sidebarEls.forEach((el) => {
      mutationObserver.observe(el, {
        attributes: true,
        attributeFilter: ['class', 'style', 'data-state'],
      });
    });

    return () => {
      mutationObserver.disconnect();
      if (sidebarToggleTimeout) {
        clearTimeout(sidebarToggleTimeout);
      }
    };
  }, []);

  // Xử lý khi dashboard data thay đổi
  useEffect(() => {
    if (dashboard) {
      // Đặt timeout để đảm bảo component đã cập nhật với dữ liệu mới
      const timeoutId = setTimeout(() => {
        if (!isResizingRef.current) {
          safeResizeCharts();
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [dashboard]);

  // Các chart options không đổi
  const importExportChartOptions = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 1,
      borderColor: '#f3f4f6',
      textStyle: { color: '#1f2937' },
      formatter: '{b}: <br/>{a0}: {c0}<br/>{a1}: {c1}',
    },
    legend: {
      data: ['Import', 'Export'],
      icon: 'circle',
      textStyle: { color: '#4b5563' },
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: (dashboard?.formImportExportStats || []).map((item) => item.formType),
      axisLine: { lineStyle: { color: '#d1d5db' } },
      axisLabel: { color: '#4b5563', fontSize: 12, interval: 0, rotate: 0 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: '#4b5563', fontSize: 12 },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
    },
    series: [
      {
        name: 'Import',
        type: 'bar',
        barWidth: '30%',
        data: (dashboard?.formImportExportStats || []).map((item) => item.importedCount),
        itemStyle: {
          color: '#6366f1',
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: { color: '#4f46e5' },
        },
      },
      {
        name: 'Export',
        type: 'bar',
        barWidth: '30%',
        data: (dashboard?.formImportExportStats || []).map((item) => item.exportedCount),
        itemStyle: {
          color: '#10b981',
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: { color: '#059669' },
        },
      },
    ],
  };

  const completionRateChartOptions = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 1,
      borderColor: '#f3f4f6',
      textStyle: { color: '#1f2937' },
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      icon: 'circle',
      itemWidth: 16,
      itemHeight: 16,
      textStyle: { color: '#4b5563' },
    },
    series: [
      {
        name: 'Hoàn thành phiếu',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: (dashboard?.formCompletionRates || []).map((item) => ({
          value: item.completed,
          name: item.formType,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const scoreDistributionChartOptions = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 1,
      borderColor: '#f3f4f6',
      textStyle: { color: '#1f2937' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: (dashboard?.scoreDistribution || []).map((item) => item.range),
      axisLine: { lineStyle: { color: '#d1d5db' } },
      axisLabel: { color: '#4b5563', fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: '#4b5563', fontSize: 12 },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
    },
    series: [
      {
        data: (dashboard?.scoreDistribution || []).map((item) => item.count),
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
          color: (params: any) => {
            const colors = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];
            return colors[params.dataIndex % colors.length];
          },
          borderRadius: [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: (params: any) => {
              const colors = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];
              return colors[params.dataIndex % colors.length];
            },
          },
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 12,
          color: '#4b5563',
        },
      },
    ],
  };

  // Xử lý sự kiện chart được render
  const handleChartRendered = (chartName: 'importExport' | 'completionRate' | 'scoreDistribution') => {
    // Đánh dấu chart đã sẵn sàng bằng ref thay vì state
    chartsReadyRef.current[chartName] = true;

    // Resize chart với một delay nhỏ nhưng chỉ nếu chưa có resize nào đang diễn ra
    if (!isResizingRef.current) {
      const timeoutId = setTimeout(() => {
        safeResizeCharts();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  };

  return (
    <div className="flex w-full max-w-full flex-col gap-6">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart: Thống kê import/export phiếu */}
        <Card className="shadow-sm transition-shadow hover:shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart className="h-5 w-5 text-indigo-500" />
              {t('THESIS_PAGE.DASHBOARD.CHARTS.IMPORT_EXPORT.TITLE')}
            </CardTitle>
            <CardDescription>{t('THESIS_PAGE.DASHBOARD.CHARTS.IMPORT_EXPORT.DESCRIPTION')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts
              ref={importExportChartRef}
              option={importExportChartOptions}
              style={{ height: 360, width: '100%' }}
              theme={chartTheme}
              opts={{ renderer: 'canvas' }}
              className="echarts-for-react"
              notMerge={true}
              lazyUpdate={true}
              onEvents={{
                rendered: () => handleChartRendered('importExport'),
              }}
            />
          </CardContent>
        </Card>
        {/* Chart: Tỷ lệ hoàn thành phiếu */}
        <Card className="shadow-sm transition-shadow hover:shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <PieChart className="h-5 w-5 text-green-500" />
              {t('THESIS_PAGE.DASHBOARD.CHARTS.COMPLETION_RATE.TITLE')}
            </CardTitle>
            <CardDescription>{t('THESIS_PAGE.DASHBOARD.CHARTS.COMPLETION_RATE.DESCRIPTION')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts
              ref={completionRateChartRef}
              option={completionRateChartOptions}
              style={{ height: 360, width: '100%' }}
              theme={chartTheme}
              opts={{ renderer: 'canvas' }}
              className="echarts-for-react"
              notMerge={true}
              lazyUpdate={true}
              onEvents={{
                rendered: () => handleChartRendered('completionRate'),
              }}
            />
          </CardContent>
        </Card>
      </div>
      {/* Chart: Phân phối điểm */}
      <Card className="shadow-sm transition-shadow hover:shadow">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart className="h-5 w-5 text-green-500" />
            {t('THESIS_PAGE.DASHBOARD.CHARTS.SCORE_DISTRIBUTION.TITLE')}
          </CardTitle>
          <CardDescription>{t('THESIS_PAGE.DASHBOARD.CHARTS.SCORE_DISTRIBUTION.DESCRIPTION')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactECharts
            ref={scoreDistributionChartRef}
            option={scoreDistributionChartOptions}
            style={{ height: 300, width: '100%' }}
            theme={chartTheme}
            opts={{ renderer: 'canvas' }}
            className="echarts-for-react"
            notMerge={true}
            lazyUpdate={true}
            onEvents={{
              rendered: () => handleChartRendered('scoreDistribution'),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
