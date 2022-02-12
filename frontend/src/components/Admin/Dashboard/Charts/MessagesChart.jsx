import { Box } from '@chakra-ui/react';
import {
  ResponsiveContainer,
  XAxis,
  Legend,
  YAxis,
  Area,
  AreaChart,
  Label,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const MessagesChart = ({ data }) => {
  return (
    <Box
      minWidth="360px"
      backgroundColor="#FFF"
      margin="0 auto 1.5rem auto"
      width="95%"
      boxShadow="md"
      p="1rem"
      borderRadius={8}
      flexGrow="1"
      border="1px solid #FFF"
    >
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          width={730}
          height={250}
          data={data.messages}
          margin={{ top: 10, right: 2, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2583c2" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2583c2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month">
            <Label value={`Messages recieved (${data.year})`} offset={-5} position="bottom" />
          </XAxis>
          <Legend verticalAlign="top" />

          <YAxis
            label={{
              value: `number of messages`,
              angle: -90,
              position: 'center',
            }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="messages"
            stroke="#2583c2"
            fillOpacity={1}
            fill="url(#colorMessages)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MessagesChart;
