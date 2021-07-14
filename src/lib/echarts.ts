import * as echarts from 'echarts/core';
import {
    BarChart,
    LineChart,
    PieChart,
    RadarChart
} from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    ToolboxComponent,
    DataZoomComponent
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';

// 注册必须的组件
echarts.use(
    [TitleComponent,GridComponent,TooltipComponent,ToolboxComponent,LegendComponent,DataZoomComponent,LineChart,BarChart,PieChart,RadarChart,CanvasRenderer]
);

export default echarts
