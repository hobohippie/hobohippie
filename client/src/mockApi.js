import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('/api/userAdmin').reply(200, {
  users: [{ id: 1, name: 'John Doe' }]
});

// Add other mock routes here as needed
mock.onGet('/api/other-endpoint').reply(200, { data: 'mocked data' });
