import { Box } from '@chakra-ui/react';
import {
  LineChart,
  ResponsiveContainer,
  Label,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

const LikesChart = ({ data }) => {
  return (
    <>
      {data.calendar && (
        <Box
          backgroundColor="#FFF"
          margin="0 auto"
          width="95%"
          flexGrow="2"
          boxShadow="md"
          p="1rem"
          borderRadius={8}
        >
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              width="100%"
              data={data.calendar}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day">
                <Label value="Total Monthly Likes" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis label={{ value: 'likes per day', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line type="monotoneX" dataKey="likes" stroke="#2583c2" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </>
  );
};

export default LikesChart;
