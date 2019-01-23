function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFoods = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.foods);
    }, 2000);
  });
};

describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('snickers');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('snickers');

    fetchDogs('hugo');
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });

  it('can create a person', () => {
    const me = new Person('Valera', ['pizza', 'burgs']);
    expect(me.name).toBe('Valera');
  });

  it('can fetch foods', async () => {
    const me = new Person('Valera', ['pizza', 'burgs']);
    me.fetchFoods = jest.fn().mockResolvedValue(['sushi', 'ramen']);
    const foods = await me.fetchFoods();
    expect(foods).toContain('sushi');
  });
});
