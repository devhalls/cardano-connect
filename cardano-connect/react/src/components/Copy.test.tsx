import React from 'react';
import { render } from '@testing-library/react';
import { Copy } from "./Copy";

test('renders Copy', () => {
  render(<Copy text={'Copy me!'} copyText={'Copy me thanks!'} />);
});
