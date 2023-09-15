import axios from 'axios';
import { getToken } from '@yousico/feishu';

const axiosInstance = axios.create({
  baseURL: 'https://open.feishu.cn/open-apis',
});

const feishuTokenAttach = async () => {
  const authToken = await getToken();
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${authToken}`;
};

export { axiosInstance as feishu, feishuTokenAttach };
