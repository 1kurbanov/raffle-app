import { MAX_PEOPLE } from './utils/constants';

export default Array.from(Array(MAX_PEOPLE)).map((_, index) => {
  return { id: index + 1, name: `Призер ${index + 1}` };
});
