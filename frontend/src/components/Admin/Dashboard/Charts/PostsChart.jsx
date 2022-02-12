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

const PostsChart = ({ data }) => {
  return (
    <Box
      backgroundColor="#FFF"
      margin="2.5rem auto"
      width="95%"
      flexGrow="2"
      boxShadow="md"
      p="1rem"
      borderRadius={8}
    >
      <ResponsiveContainer width="100%" height={250}>
        <BarChart width={730} height={250} data={data.calendar}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month">
            <Label value={`Posts Written (${data.year})`} offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            label={{
              value: `number of posts`,
              angle: -90,
              position: 'center',
            }}
          />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar dataKey="posts" fill="#2583c2" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PostsChart;
