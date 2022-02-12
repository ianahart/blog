import { Box } from '@chakra-ui/react';
import {
  BarChart,
  ResponsiveContainer,
  Label,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

const TagsChart = ({ data }) => {
  return (
    <Box
      backgroundColor="#FFF"
      margin="0 auto 1.5rem auto"
      width="95%"
      minWidth="360px"
      boxShadow="md"
      p="1rem"
      borderRadius={8}
      flexGrow="1"
      border="1px solid #FFF"
    >
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
          width={400}
          height={250}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="Most Popular Tags" offset={-4} position="insideBottom" />
          </XAxis>
          <YAxis
            label={{
              value: `times used`,
              angle: -90,
              position: 'center',
            }}
          />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar dataKey="used" fill="#16DB93" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TagsChart;
