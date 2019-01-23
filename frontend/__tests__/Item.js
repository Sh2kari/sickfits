import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ItemComponent from '../components/Item';

const fakeItem = {
  id: '1',
  title: 'cool item',
  price: 5000,
  description: 'this item is really cool',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg'
};

describe('<Item />', () => {
  it('renders', () => {
    shallow(<ItemComponent item={fakeItem} />);
  });

  it('matches the snapshot', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  // it('renders the image properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const image = wrapper.find('img');

  //   expect(image.props().src).toBe(fakeItem.image);
  //   expect(image.props().alt).toBe(fakeItem.title);
  // });

  // it('renders the price tag and title properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);

  //   expect(
  //     wrapper
  //       .find('PriceTag')
  //       .children()
  //       .text()
  //   ).toBe('$50');
  //   expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  // });

  // it('renders out buttons properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const buttonList = wrapper.find('.buttonList');

  //   expect(buttonList.children()).toHaveLength(3);
  //   expect(buttonList.find('Link').exists()).toBe(true);
  //   expect(buttonList.find('AddToCart').exists()).toBe(true);
  //   expect(buttonList.find('DeleteItem').exists()).toBe(true);
  // });
});
