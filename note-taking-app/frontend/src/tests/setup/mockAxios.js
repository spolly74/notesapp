import axios from 'axios';

jest.mock('axios');

// Default mock implementations
axios.get.mockResolvedValue({ data: {} });
axios.post.mockResolvedValue({ data: {} });
axios.put.mockResolvedValue({ data: {} });
axios.delete.mockResolvedValue({ data: {} });

export default axios;
