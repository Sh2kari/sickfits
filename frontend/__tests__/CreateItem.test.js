import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem';
import { fakeItem } from '../lib/testUtils';

const dogImage = 'https://dog.com/dog.jpg';

global.fetch = jest.fn().mockResolvedValue({
  json: () => ({ secure_url: dogImage, eager: [{ secure_url: dogImage }] })
});

describe('<CreateItem />', () => {
  it('renders and matchas snapshot', () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );

    const form = wrapper.find('form[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it('uploads file when change', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );

    const input = wrapper.find('input[type="file"]');
    input.simulate('change', { target: { files: ['fakedog.jpg'] } });

    await wait();
    const component = wrapper.find('CreateItem').instance();
    expect(component.state.image).toEqual(dogImage);
    expect(component.state.largeImage).toEqual(dogImage);
    expect(global.fetch).toHaveBeenCalled();
    global.fetch.mockReset();
  });

  it('handles state updating', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );

    wrapper.find('#title').simulate('change', {
      target: {
        name: 'title',
        value: 'Testing'
      }
    });
    wrapper.find('#price').simulate('change', {
      target: {
        name: 'price',
        type: 'number',
        value: 5000
      }
    });
    wrapper.find('#description').simulate('change', {
      target: {
        name: 'description',
        value: 'Nice item'
      }
    });

    await wait();
    const component = wrapper.find('CreateItem').instance();
    expect(component.state).toMatchObject({
      title: 'Testing',
      price: 5000,
      description: 'Nice item'
    });
  });

  it('creates an item when the form is submitted', async () => {
    const item = fakeItem();
    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            image: '',
            largeImage: '',
            price: item.price
          }
        },
        result: {
          data: {
            createItem: { ...item },
            id: 'abc123',
            __typename: 'Item'
          }
        }
      }
    ];

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <CreateItem />
      </MockedProvider>
    );

    wrapper.find('#title').simulate('change', {
      target: {
        name: 'title',
        value: item.title
      }
    });
    wrapper.find('#price').simulate('change', {
      target: {
        name: 'price',
        type: 'number',
        value: item.price
      }
    });
    wrapper.find('#description').simulate('change', {
      target: {
        name: 'description',
        value: item.description
      }
    });

    Router.router = { push: jest.fn() };
    wrapper.find('form').simulate('submit');

    await wait(50);
    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: '/item',
      query: {
        id: 'abc123'
      }
    });
  });
});
